import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCF8h1Up1bPcp-QkxxL78o3RdPWCiZ66z8", 

  
  authDomain: "linkdin-clone-32e15.firebaseapp.com",
  projectId: "linkdin-clone-32e15",
  storageBucket: "linkdin-clone-32e15.appspot.com",
  
  messagingSenderId: "101299925075247627633",
  appId: "1:101299925075247627633:web:YOUR_APP_ID", 
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);   