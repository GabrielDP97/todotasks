import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx8F588RbXRWDXYiYVKf60igz2IBBX_D0",
  authDomain: "todotasks-b76fd.firebaseapp.com",
  projectId: "todotasks-b76fd",
  storageBucket: "todotasks-b76fd.firebasestorage.app",
  messagingSenderId: "493545939996",
  appId: "1:493545939996:web:b6b1fa190111b62d872bd9",
  measurementId: "G-WXT24L0BES"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export default db;