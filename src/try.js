import {
  collection,
  getFirestore,
  serverTimestamp,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { v4 } from "uuid";

async function storeData(db, uid, serverTimestamp, photoURL, text) {
  const id = v4();
  
  await addDoc(collection(db, "messages"), {
    text: text,
    photoURL: photoURL,
    uid: uid,
    createdAt: serverTimestamp,
  })
    .then(console.log("Data stored successfully"))
    .catch((err) => {
      console.log(err);
    });
}

export default storeData;
