import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBKCR3rza_aynrqWAFQ4X1twJyzbwBx45w",
  authDomain: "ecommerce-website-62135.firebaseapp.com",
  projectId: "ecommerce-website-62135",
  storageBucket: "ecommerce-website-62135.appspot.com",
  messagingSenderId: "134026715566",
  appId: "1:134026715566:web:f809b2788db2ba04fd283f"
};

const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const db= getFirestore(app);
export const storage= getStorage(app);

export default app;