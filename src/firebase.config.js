// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore}from "firebase/firestore"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe4g9BTyTFX6qrJUycDPfdeqKpe85mIFI",
  authDomain: "e-commerce-dc88b.firebaseapp.com",
  projectId: "e-commerce-dc88b",
  storageBucket: "e-commerce-dc88b.appspot.com",
  messagingSenderId: "415654877979",
  appId: "1:415654877979:web:d02ff3b4b6a3df8b7ad1be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB=getFirestore(app)
const auth=getAuth(app);

const googleProvider = new GoogleAuthProvider();

// Function to handle Google Sign-In
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // You can access user information from the result object
    const user = result.user;
    console.log("Successfully signed in with Google:", user);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

export {fireDB, auth,signInWithGoogle};