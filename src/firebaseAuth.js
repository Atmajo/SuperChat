import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDev0gEUDr0Yi2PBX2BpBQMZuWPJa5v6AE",
  authDomain: "superchat-a9e56.firebaseapp.com",
  projectId: "superchat-a9e56",
  storageBucket: "superchat-a9e56.appspot.com",
  messagingSenderId: "377948175795",
  appId: "1:377948175795:web:124fe107a27df733915fc6"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, app };