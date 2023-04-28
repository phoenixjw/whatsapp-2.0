// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "whatsapp-2-6759d.firebaseapp.com",
  projectId: "whatsapp-2-6759d",
  storageBucket: "whatsapp-2-6759d.appspot.com",
  messagingSenderId: "66196621308",
  appId: "1:66196621308:web:a365a6357ed5fe56905479"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {db, auth, provider}