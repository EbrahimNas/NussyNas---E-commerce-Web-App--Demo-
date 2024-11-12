// src/services/OrderService.js
import { db } from '../config/firebaseConfig.js';
import { collection, addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';

// Function to save order details
export const saveOrderDetails = async (orderData) => {
    try {
        // 1. Add the order to the 'orders' collection
        const ordersRef = collection(db, "orders");
        const orderDocRef = await addDoc(ordersRef, orderData);
        const orderId = orderDocRef.id;

        // 2. Update the user's document with the order reference
        const userRef = doc(db, "users", orderData.userId);
        const orderSummary = {
            orderId: orderId,
            totalAmount: orderData.totalAmount,
            orderDate: orderData.orderDate,
            status: orderData.status,
            address: orderData.address,
        };

        await updateDoc(userRef, {
            orders: [...(orderData.orders || []), orderSummary] // Add the new order to the 'orders' array
        });

        console.log("Order successfully saved and user updated!");
    } catch (error) {
        console.error("Error saving order:", error);
    }
};

// Function to fetch orders for a specific user
export const fetchUserOrders = async (userId) => {
    try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
};

// Function to send emails
export const sendOrderEmails = async (orderData) => {
    const mailCollectionRef = collection(db, "mail");
  
    // Prepare email data for the customer
    const customerEmailData = {
       to: [orderData.email], // Customer's email
       message: {
            subject: "Thank You for Your Order!",
            text: `Hello ${orderData.fullName},\n\nThank you for your order! Here are the details:\n
               Total Amount: ${orderData.totalAmount}\n
               Transaction ID: ${orderData.transactionId}\n
               Address: ${orderData.address}\n
               Order Date: ${orderData.orderDate.toDate().toDateString()}\n
               We will notify you once your order is shipped.\n\nBest regards,\nNussyNas`,
            html: `<p>Hello ${orderData.fullName},</p>
               <p>Thank you for your order! Here are the details:</p>
               <ul>
                 <li><strong>Total Amount:</strong> ${orderData.totalAmount}</li>
                 <li><strong>Transaction ID:</strong> ${orderData.transactionId}</li>
                 <li><strong>Address:</strong> ${orderData.address}</li>
                 <li><strong>Order Date:</strong> ${orderData.orderDate.toDate().toDateString()}</li>
               </ul>
               <p>We will notify you once your order is shipped.</p>
               <p>Best regards,<br>NussyNas</p>`
        }
    };
  
    // Prepare email data for the business owner
    const businessEmailData = {
      to: ["nussyxnas@gmail.com"], // Business owner's email
      message: {
        subject: "New Order Placed",
        text: `A new order has been placed by ${orderData.fullName}. Details:\n
               Total Amount: ${orderData.totalAmount}\n
               Transaction ID: ${orderData.transactionId}\n
               Address: ${orderData.address}\n
               Order Date: ${orderData.orderDate.toDate().toDateString()}\n`,
        html: `<p>A new order has been placed by ${orderData.fullName}. Details:</p>
               <ul>
                 <li><strong>Total Amount:</strong> ${orderData.totalAmount}</li>
                 <li><strong>Transaction ID:</strong> ${orderData.transactionId}</li>
                 <li><strong>Address:</strong> ${orderData.address}</li>
                 <li><strong>Order Date:</strong> ${orderData.orderDate.toDate().toDateString()}</li>
               </ul>`
      }
    };
  
    try {
        // Send customer email
        await addDoc(mailCollectionRef, customerEmailData);
        console.log("Customer email queued for delivery!");

        // Send Business owner email
        await addDoc(mailCollectionRef, businessEmailData);
        console.log("Business owner email queued for delivery!");
    
      } catch (error) {
        console.error("Error sending order emails:", error);
      }
  };