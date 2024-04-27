"use client"
import React from "react";
import { auth, provider, app } from "../firebaseAuth";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";

const Signin = () => {
  const db = getFirestore(app);
  const navigate = useNavigate();

  const onLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    await getDoc(doc(db, "users", result.user.email)).then((docSnap) => {
      if (!docSnap.exists()) {
        setDoc(doc(db, "users", result.user.email), {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          uid: result.user.uid,
        });
      }
    });
    navigate("/");
    console.log(result)
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen my-24">
      <div className="w-[60%] md:w-[20%] flex flex-col justify-center items-center my-24 gap-24 p-10 border-2 border-white rounded-lg bg-white/30">
      <h1 className="text-2xl font-semibold">Sign In</h1>
      <button onClick={onLogin} className="text-black border-white bg-white p-2 px-4 rounded-full font-bold">Sign in with Google</button>
      </div>
    </div>
  );
};

export default Signin;
