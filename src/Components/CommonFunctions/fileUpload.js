import firebaseStorage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function firebaseFileUpload({
  file,
  dbPath = "",

  setState = () => {},
}) {
  const storageRef = ref(firebaseStorage, dbPath + "/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress.toFixed(0) + "%");
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setState(downloadURL);
      });
    }
  );
}
