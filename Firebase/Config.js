// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfASez0BnqEkEMxTLqJuE_bsmagV_IH_Y",
  authDomain: "helpdesk-smit.firebaseapp.com",
  projectId: "helpdesk-smit",
  storageBucket: "helpdesk-smit.firebasestorage.app",
  messagingSenderId: "516701942489",
  appId: "1:516701942489:web:a8ae8e55eb4125571b84c8",
  measurementId: "G-JHSVEX88NW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
