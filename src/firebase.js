import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDWid_0ErhwQoPx2roX3kCmH0Ga_eGQ_W0",
  authDomain: "firestore-task-manager-2c486.firebaseapp.com",
  projectId: "firestore-task-manager-2c486",
  storageBucket: "firestore-task-manager-2c486.firebasestorage.app",
  messagingSenderId: "434307521022",
  appId: "1:434307521022:web:3c17f8503a711b12c108af",
  measurementId: "G-4ZJTPKVEL5"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export { app, analytics };

