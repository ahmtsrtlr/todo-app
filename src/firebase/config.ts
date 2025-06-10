// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Debug: Check if environment variables are loaded
console.log('Environment variables loaded:', {
  apiKey: firebaseConfig.apiKey ? '✓' : '✗',
  projectId: firebaseConfig.projectId ? '✓' : '✗',
  authDomain: firebaseConfig.authDomain ? '✓' : '✗'
});

// Validate required config values
if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.authDomain) {
  console.error('Missing environment variables. Make sure .env file is in project root and contains all VITE_FIREBASE_* variables');
  throw new Error('Firebase configuration is missing required values. Check your .env file location and restart dev server.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Add connection management for Firestore
let isFirestoreConnected = true;

export const handleFirestoreConnection = async (connect: boolean) => {
  try {
    if (connect && !isFirestoreConnected) {
      await enableNetwork(db);
      isFirestoreConnected = true;
    } else if (!connect && isFirestoreConnected) {
      await disableNetwork(db);
      isFirestoreConnected = false;
    }
  } catch (error) {
    console.warn('Firestore connection management error:', error);
  }
};

// Handle page visibility changes to manage connections
if (typeof window !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      handleFirestoreConnection(false);
    } else {
      handleFirestoreConnection(true);
    }
  });
}

// Initialize Analytics only if measurementId is available and we're in browser
export const analytics = typeof window !== 'undefined' && firebaseConfig.measurementId 
  ? getAnalytics(app) 
  : null;

export default app;
