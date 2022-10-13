import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "A",
  authDomain: "toom",
  projectId:  "topp",
  storageBucket: "topm",
  messagingSenderId: "53",
  appId: "1:54",
  measurementId: "N4YPMD"
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app);

export  {auth, db}

