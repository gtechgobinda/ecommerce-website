import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_REACT_APP_FB_API_KEY,
  authDomain: "ecommerce-website1-41753.firebaseapp.com",
  projectId: "ecommerce-website1-41753",
  storageBucket: "ecommerce-website1-41753.appspot.com",
  messagingSenderId: "706114381089",
  appId: "1:706114381089:web:2793665ad4505583c88a60"
};

const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const db= getFirestore(app);
export const storage= getStorage(app);

export default app;