import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDx8XR_Aom18ACHo2JZAzqop1GdkElT8a4",
  authDomain: "chatapp-dedff.firebaseapp.com",
  projectId: "chatapp-dedff",
  storageBucket: "chatapp-dedff.appspot.com",
  messagingSenderId: "556155587446",
  appId: "1:556155587446:web:0155e0b354f7d32816c857"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()