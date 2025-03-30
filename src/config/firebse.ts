// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "web-cham-thi.firebaseapp.com",
  projectId: "web-cham-thi",
  storageBucket: "web-cham-thi.firebasestorage.app",
  messagingSenderId: "1001554569111",
  appId: "1:1001554569111:web:d659c54bc07a958e3246d2",
  measurementId: "G-B6YVFC982D"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);