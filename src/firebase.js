import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaSEddldNcs4_c8aqT30HFMk6xOvPn7wo",
  authDomain: "react-chat-b66ab.firebaseapp.com",
  projectId: "react-chat-b66ab",
  storageBucket: "react-chat-b66ab.appspot.com",
  messagingSenderId: "893401320592",
  appId: "1:893401320592:web:d6f45580aac0544a475c15"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()