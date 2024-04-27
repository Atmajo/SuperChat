import React, { useState, useEffect, useRef } from "react";
import { app, auth } from "../firebaseAuth";
import firebase from "firebase/compat/app";
import {
  collection,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
  doc,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { v4 } from "uuid";
import EmojiPicker from "emoji-picker-react";

const db = getFirestore(app);

const ChatBox = ({ user, setOpened, revUID }) => {
  return (
    <div className="flex flex-col w-[60%] p-2 border rounded-lg">
      <nav className="flex justify-between items-center p-2 ">
        <div className="flex gap-3 items-center">
          <button onClick={() => setOpened(false)}>{"<---"}</button>
          <img
            src={user.photoURL}
            alt="profile"
            className="rounded-full w-10"
          />
          <h1>{user.name}</h1>
        </div>
      </nav>
      <div className="flex flex-col justify-start">
        <div className="p-2">
          <ChatRoom revUID={revUID} />
        </div>
      </div>
    </div>
  );
};

const ChatRoom = ({ revUID }) => {
  const [data, setData] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [pick, setPick] = useState(null);
  const [message, setMessage] = useState({
    message: "",
  });
  
  const getData = async () => {
    const q = query(collection(db, "chats"), orderBy("createdAt"), where("msgTag", "==", auth.currentUser.uid+revUID));
    const querySnapshot = await getDocs(q);
    const messageRef = querySnapshot.docs.map((doc) => doc.data());
    return messageRef;
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getData();
      setData(response);
    };
    
    fetchData();
  }, [data]);
  
  if (!data) {
    return <div>Loading...</div>;
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    await setDoc(doc(db, "chats", v4()), {
      text: message.message,
      photoURL: photoURL,
      currentUID: uid,
      previousUID: revUID,
      msgTag: uid+revUID,
      createdAt: serverTimestamp(),
    });
    
    setMessage({ message: "" });
  };
  
  return (
    <div className="h-[550px] flex flex-col justify-end w-full relative">
      <div className="z-0">
        {data.map((message, index) => (
          <ChatMessage
            key={index}
            data={message.text}
            uid={message.currentUID}
            photoURL={message.photoURL}
          />
        ))}
      </div>
      {emoji && (
        <EmojiPicker
          open="true"
          onEmojiClick={(emojiData) => {
            console.log(emojiData.emoji);
            setMessage((prev) => ({
              ...prev,
              message: prev.message + emojiData.emoji,
            }));
          }}
          className="absolute bottom-0 right-0 z-10"
        />
      )}
      <div className="flex justify-between py-2 w-full">
        <input
          type="text"
          name="message"
          className="w-[85%] border bg-black/50 h-10 px-2 outline-none rounded-md"
          value={message.message}
          onChange={handleChange}
        />
        <button onClick={() => setEmoji(!emoji)}>
          <img src="/emoji.svg" alt="emoji" className="w-10" />
        </button>
        <button onClick={handleSubmit} className="">
          <img src="/send.svg" alt="send" className="w-8" />
        </button>
      </div>
    </div>
  );
};

function ChatMessage({ data, uid, photoURL }) {
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div
      className={`flex items-center gap-3 w-full ${
        messageClass === "sent" ? "flex-row-reverse" : ""
      }`}
    >
      <img src={photoURL} className="w-6 rounded-full" />
      <p className="text-lg">{data}</p>
    </div>
  );
}

export default ChatBox;
