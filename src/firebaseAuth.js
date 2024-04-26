import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYmjQwYntQ6m8MJDScqxE1oBkgGX4trSM",
  authDomain: "superchat-a9e56.firebaseapp.com",
  projectId: "superchat-a9e56",
  storageBucket: "superchat-a9e56.appspot.com",
  messagingSenderId: "377948175795",
  appId: "1:377948175795:web:8a3cf4ed67e0e0ad915fc6"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, app };