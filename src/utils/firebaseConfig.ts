// firebse.ts (hoặc firebase.ts)
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "web-cham-thi.firebaseapp.com",
  projectId: "web-cham-thi",
  storageBucket: "web-cham-thi.firebasestorage.app",
  messagingSenderId: "1001554569111",
  appId: "1:1001554569111:web:d659c54bc07a958e3246d2",
  measurementId: "G-B6YVFC982D"
};

// ✅ Chỉ initialize nếu chưa có app nào
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
