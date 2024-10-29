import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyASak1iIMm6fk5xr3uSaX-HXzcTJ2pcQQ8",
  authDomain: "beyond-lens-07.firebaseapp.com",
  projectId: "beyond-lens-07",
  storageBucket: "beyond-lens-07.appspot.com",
  messagingSenderId: "667550893484",
  appId: "1:667550893484:web:2cf057a32e897be583e609"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();