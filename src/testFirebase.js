// Test Firebase Connection
import { auth } from './firebase';

export const testFirebaseConnection = () => {
  console.log('Firebase Auth:', auth);
  console.log('Firebase App:', auth.app);
  console.log('Firebase is connected successfully!');
  
  // Test auth state
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('User is signed in:', user.email);
    } else {
      console.log('User is signed out');
    }
  });
};

// Call this function to test
// testFirebaseConnection();