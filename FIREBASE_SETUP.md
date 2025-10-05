# Firebase Setup Instructions

To complete the Firebase authentication setup, follow these steps:

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Give your project a name (e.g., "virtual-assistant")
4. Follow the setup steps (you can disable Google Analytics if not needed)

## 2. Enable Authentication

1. In your Firebase project console, go to "Authentication" from the left sidebar
2. Click on "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following sign-in providers:
   - **Email/Password**: Click on it and toggle "Enable"
   - **Google**: Click on it, toggle "Enable", and add your project's support email

## 3. Get Your Firebase Configuration

1. Go to Project Settings (gear icon in the left sidebar)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (</>)
4. Register your app with a nickname (e.g., "virtual-assistant-web")
5. Copy the Firebase configuration object

## 4. Update Your Firebase Configuration

1. Open `src/firebase.js` in your project
2. Replace the placeholder configuration with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

## 5. Optional: Configure Authorized Domains

If you plan to deploy your app:
1. Go to Authentication > Settings > Authorized domains
2. Add your domain(s) where the app will be hosted

## Features Added

✅ **Login Page** - Email/password and Google sign-in  
✅ **Signup Page** - Create account with email/password or Google  
✅ **User Authentication** - Secure Firebase authentication  
✅ **User Profile** - Display logged-in user info  
✅ **Personalized Greetings** - Assistant greets users by name  
✅ **Responsive Design** - Works on mobile and desktop  
✅ **Dark Mode Support** - Authentication UI adapts to theme  

## Usage

- **Login/Signup buttons** appear in the top-right corner when not logged in
- **User profile** with logout option appears when logged in
- **Personalized responses** from the virtual assistant for logged-in users
- All existing features (voice commands, music player, etc.) work as before

## Commands

Your virtual assistant now includes personalized responses:
- "Hello" - Personalized greeting with user's name
- "Who are you" - Enhanced introduction
- All other existing commands work the same

Ready to use! 🚀