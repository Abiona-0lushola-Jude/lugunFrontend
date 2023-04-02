import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC6KJeUmn64K5fkqwrB8Ub4U0rOuXjtfRU",
  authDomain: "university-luguns.firebaseapp.com",
  projectId: "university-luguns",
  storageBucket: "university-luguns.appspot.com",
  messagingSenderId: "916810468560",
  appId: "1:916810468560:web:78cd5903eb0584c0a0e2d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app) 