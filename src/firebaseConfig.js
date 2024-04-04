import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import dotenv from 'dotenv'
dotenv.config()
const firebaseConfig = {
  apiKey: process.env.api,
  authDomain: process.env.domain,
  projectId:process.env.project ,
  storageBucket:process.env.bucket ,
  messagingSenderId: process.env.message,
  appId: process.env.appId,
  measurementId: process.env.measure
};


const app = initializeApp(firebaseConfig);
console.log(app);

export const storage = getStorage(app);

export const auth = getAuth(app);

export const db = getFirestore(app);
