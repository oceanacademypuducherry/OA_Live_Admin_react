import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6LAgyGpCnbIEu18M2yP5ae-_AWzVQuTk",
  authDomain: "oceanlivereact.firebaseapp.com",
  projectId: "oceanlivereact",
  storageBucket: "oceanlivereact.appspot.com",
  messagingSenderId: "795685034829",
  appId: "1:795685034829:web:873bb36dd533b314c37504",
  measurementId: "G-3MQRQHPERJ",
};
const firebase = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(
  firebase,
  "gs://oceanlivereact.appspot.com/"
);
export default firebaseStorage;
