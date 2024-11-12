import { auth, db} from "../config/firebaseConfig";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { sendPasswordResetEmail } from "firebase/auth";

// Register function with Firestore user data save
export const registerUser = async (email, password, userData) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; // User object

    
    // Save additional user data in Firestore using the UID
    await saveUserData(user.uid, userData);
    
    return user; // Return the user object if needed elsewhere
  } catch (error) {
    throw error;
  }
};

// Save User Details in Firestore
export const saveUserData = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData); // Using setDoc with the correct syntax
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

// Login function
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // User object
  } catch (error) {
    throw error;
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};


// Create a Google provider instance
const provider = new GoogleAuthProvider();

// Function to handle Google sign-in
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result); // eslint-disable-next-line
    const token = credential.accessToken;

    // The signed-in user info
    const user = result.user;
    console.log("User signed in with Google:", user);
    const userRef = doc(db, 'users', user.uid);
    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) {
      await setDoc(userRef, { name: user.displayName, email: user.email });
    }

    return user;
  } catch (error) {
      console.error("Error signing in with Google:", error);
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      return { errorCode, errorMessage, email, credential };
    }
};

export const requestPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent!");
    return { success: true, message: "Password reset email sent!" };
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    return { success: false, message: error.message };
  }
};