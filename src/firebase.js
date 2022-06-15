import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPruzEc5jqtPdhMl_mIBqR8f4C9UBcuAs",
  authDomain: "expense-logger-bddb0.firebaseapp.com",
  databaseURL:
    "https://expense-logger-bddb0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "expense-logger-bddb0",
  storageBucket: "expense-logger-bddb0.appspot.com",
  messagingSenderId: "490408012724",
  appId: "1:490408012724:web:34dcf9efacb8a7c02920e1",
  measurementId: "G-L0S5HVMJ65",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth();
