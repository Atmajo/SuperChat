import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDJyk7YaksAv6XcjTG-cpvjT16wdzEmdbA",
//   authDomain: "chatapp2-1bc36.firebaseapp.com",
//   projectId: "chatapp2-1bc36",
//   storageBucket: "chatapp2-1bc36.appspot.com",
//   messagingSenderId: "497284446196",
//   appId: "1:497284446196:web:14124549458abce2122ba1"
// };

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