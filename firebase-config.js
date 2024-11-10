// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "portfoliowebsite-8fae4.firebaseapp.com",
  projectId: "portfoliowebsite-8fae4",
  storageBucket: "portfoliowebsite-8fae4.appspot.com",
  messagingSenderId: "324271427257",
  appId: "1:324271427257:web:bd3b463e169418dab95568"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
export const auth=getAuth(fireBaseApp);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(fireBaseApp)