import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const setupFirebase = () => {
  const firebaseApp = initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  });
  return getStorage(firebaseApp);
};

export const setupMongoDB = () => {
  try {
    mongoose.connect(`${process.env.MONGO_DEV_API_KEY}`);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.log(error);
  }
};
