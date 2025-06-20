import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCF8h1Up1bPcp-QkxxL78o3RdPWCiZ66z8",

  authDomain: "linkdin-clone-32e15.firebaseapp.com",
  projectId: "linkdin-clone-32e15",
  storageBucket: "linkdin-clone-32e15.appspot.com",

  messagingSenderId: "101299925075247627633",
  appId: "1:101299925075247627633:web:AIzaSyCF8h1Up1bPcp-QkxxL78o3RdPWCiZ66z8",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
