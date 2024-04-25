import React, { useState, useEffect } from "react";
import { auth, app } from "../firebaseAuth";
import Chatbox from "./ChatBox";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const List = () => {
  const [opened, setOpened] = useState(false);
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState("");
  const time = new Date().toLocaleTimeString();

  const db = getFirestore(app);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData();
      setUsers(response);
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-[630px] gap-2">
      <div className="flex flex-col w-[40%]">
        {Object.values(users).map(
          (user, index) =>
            user.uid !== auth.currentUser.uid && (
              <div
                key={user.uid}
                className={`flex flex-col gap-2 p-3 border-b cursor-pointer`}
                onClick={() => {
                  setOpened(true);
                  setUser(user);
                }}
              >
                <div className="flex items-center gap-5">
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="rounded-full w-10"
                  />
                  <h1>{user.name}</h1>
                </div>
              </div>
            )
        )}
      </div>
      {opened ? (
        <Chatbox user={user} setOpened={setOpened} />
      ) : (
        <div className="flex flex-col w-[60%] p-2 border rounded-lg"></div>
      )}
    </div>
  );
};

export default List;
