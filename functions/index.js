// Load environment variables from the .env file
require('dotenv').config();

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const logger = require('firebase-functions/logger');


// OAuth2 credentials from .env file
// const CLIENT_ID = xxxxx
// const CLIENT_SECRET = xxxx
// const REDIRECT_URI = xxxx

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Function to redirect the business owner to Google’s OAuth2 consent screen
exports.authBusinessOwner = functions.https.onRequest((req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline', // To get a refresh token
      scope: ['https://www.googleapis.com/auth/gmail.send'],
    });
    res.redirect(authUrl);
});

// OAuth 2.0 callback to exchange code for tokens
exports.authCallback = functions.https.onRequest(async (req, res) => {
    const { code } = req.query;
  
    if (!code) {
      return res.status(400).send('No code found.');
    }
  
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
  
      // Store tokens securely in Firestore
      const businessOwnerRef = admin.firestore().collection('businessOwner').doc('emailAuthTokens');
      await businessOwnerRef.set({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresIn: tokens.expiry_date,
      });
  
      res.send('Authentication successful! You can now send emails.');
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      res.status(500).send('Error during authentication');
    }
});

// Function to fetch user profile info
exports.getUserProfile = functions.https.onRequest(async (request, response) => {
  try {
    const oauth2 = google.oauth2({
      version: 'v2',
      auth: oauth2Client,
    });
    const userInfo = await oauth2.userinfo.get();
    response.send(userInfo.data);
  } catch (error) {
    logger.error('Error fetching user profile: ', error);
    response.status(500).send('Error fetching user profile');
  }
});

// Function to refresh tokens if needed
async function refreshTokenIfNeeded() {
  const businessOwnerRef = admin.firestore().collection('businessOwner').doc('emailAuthTokens');
  const tokens = await businessOwnerRef.get().then(doc => doc.data());
  
  if (!tokens) {
    throw new Error('No tokens found. Business owner is not authenticated.');
  }

  const now = Date.now();
  const isTokenExpired = now >= tokens.expiresIn;

  if (isTokenExpired) {
    const { tokens: newTokens } = await oauth2Client.refreshAccessToken();
    await businessOwnerRef.set({
      accessToken: newTokens.access_token,
      refreshToken: newTokens.refresh_token,
      expiresIn: newTokens.expiry_date,
    });
    oauth2Client.setCredentials(newTokens);
  } else {
    oauth2Client.setCredentials(tokens);
  }
}

// Function to send email using the stored tokens
async function sendEmail(to, subject, message) {
  try {
    // Refresh token if needed before sending the email
    await refreshTokenIfNeeded();

    // Get the tokens from Firestore
    const businessOwnerRef = admin.firestore().collection('businessOwner').doc('emailAuthTokens');
    const tokens = await businessOwnerRef.get().then(doc => doc.data());

    if (!tokens) {
      throw new Error('No tokens found. Business owner is not authenticated.');
    }

    // Set credentials for the OAuth client
    oauth2Client.setCredentials({
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      expiry_date: tokens.expiresIn,
    });

    // Create Gmail API client
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Email formatting
    const email = `To: ${to}\r\nSubject: ${subject}\r\n\r\n${message}`;
    const raw = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

    // Send email
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw },
    });

    console.log('Email sent successfully', response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
}

// Firestore trigger for sending order confirmation email
//const functions = require('firebase-functions');
//const admin = require('firebase-admin');
//admin.initializeApp();

// Send Order Confirmation Function
exports.sendOrderConfirmation = functions.firestore
  .document("orders/{orderId}")
  .onCreate(async (snap, context) => {
    try {
      // Extract order data from the snapshot
      const orderData = snap.data();

      const customerEmail = orderData.email; // Customer's email
      const customerName = orderData.fullname; // Customer's full name
      const orderItems = orderData.items; // Array of items ordered
      const totalAmount = orderData.totalamount; // Total amount
      const transactionId = orderData.transactionid; // Transaction ID

      // Extract address fields from the address map
      const address = orderData.address;
      const streetAddress = address.streetAddress;
      const city = address.city;
      const country = address.country;

      // Generate a list of items for the email
      const itemList = orderItems.map((item) => `- ${item.name}: ${item.quantity}`).join("\n");

      // Customize the email content
      const subject = `Order Confirmation - Transaction #${transactionId}`;
      const message = `
        Hi ${customerName},

        Thank you for your order! Here are your order details:

        Transaction ID: ${transactionId}
        Total Amount: $${totalAmount}

        Items:
        ${itemList}

        Shipping Address:
        ${streetAddress}
        ${city}, ${country}

        If you have any questions, please reply to this email.

        Thank you for shopping with us!
      `;

      // Send the email
      await sendEmail(customerEmail, subject, message);
    } catch (error) {
      console.error('Error sending order confirmation email', error);
      throw new Error('Failed to send order confirmation email');
    }
});

