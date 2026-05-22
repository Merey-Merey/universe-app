import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5LQpLyoi4CDm2GeU_0PCnSJoa6iBzu_c",
  authDomain: "diplomkauniverse.firebaseapp.com",
  projectId: "diplomkauniverse",
  storageBucket: "diplomkauniverse.firebasestorage.app",
  messagingSenderId: "367874596322",
  appId: "1:367874596322:web:3c24c865ea87495f892dbb",
  measurementId: "G-KTX0CD9826",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;