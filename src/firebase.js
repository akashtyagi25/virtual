// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvp_wZ4W4MuP_hZP1MdY0eAdoyDasccGc",
  authDomain: "shifra-virtual-assistant.firebaseapp.com",
  projectId: "shifra-virtual-assistant",
  storageBucket: "shifra-virtual-assistant.firebasestorage.app",
  messagingSenderId: "515703745873",
  appId: "1:515703745873:web:541a105e634071eaf37770",
  measurementId: "G-HEYXFCJ45G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;