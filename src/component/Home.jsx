"use client";
import React, { useEffect, useState } from "react";
import { auth, app } from "../firebaseAuth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import List from "./List";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";

const Home = () => {
  const [user, setUser] = useState({});
  const db = getFirestore(app);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const res = getDoc(doc(db, "users", user.uid));
        setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        });
      } else {
        navigate("/signin");
      }
    });
  }, []);

  const onLogout = async () => {
    await signOut(auth);
  };

  return (
    <main className="flex flex-col gap-2 h-[750px] my-20 mx-32 p-3 border rounded-lg bg-gray-400/15">
      <nav className="flex flex-row justify-between items-center py-4 px-3">
        <h1 className="text-2xl font-semibold">ChatApp</h1>
        <ul className="flex items-center gap-10">
          <li>
            <button>Search</button>
          </li>
          <li>
            <button onClick={onLogout}>Log Out</button>
          </li>
          <li>
            <img
              src={user.photoURL}
              alt="profile"
              className="rounded-full w-10"
            />
          </li>
        </ul>
      </nav>
      <List />
    </main>
  );
};

export default Home;
