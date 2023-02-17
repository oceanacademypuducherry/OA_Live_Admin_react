import React, { useState } from "react";
import TextInput from "../common/TextInput";
import "./add_certificate.scss";
import { AiOutlineUpload } from "react-icons/ai";
import CustomButton from "../common/CustomButton";
import firebaseStorage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "../../index";

export default function AddEertificate() {
  const [uploadPercent, setUploadPercent] = useState({
    file: "",
  });

  const [certInfo, setCertInfo] = useState({
    studentId: "OCNST",
    certificateUrl: "",
    token: localStorage.getItem("a_token"),
  });

  function imageFileUpload() {
    const fileInp = document.querySelector("#certInp");
    fileInp.type = "file";
    fileInp.accept = "image/*";
    fileInp.style.display = "none";
    fileInp.click();
  }
  function onChangeHandler(e) {
    const { value, name, type, files } = e.target;
    if (type === "file") {
      uploadImage(files[0], "e_certificate", name);
    } else {
      setCertInfo({ ...certInfo, studentId: value.toUpperCase() });
    }
  }
  function uploadImage(img, path, fieldName) {
    const storageRef = ref(firebaseStorage, path + "/" + img.name);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(fieldName, progress);

        setUploadPercent({
          ...uploadPercent,
          file: progress.toFixed(0) + "%",
        });
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setCertInfo({ ...certInfo, certificateUrl: downloadURL });
        });
      }
    );
  }

  function onSubmit() {
    axios
      .post("/certificate/add", certInfo)
      .then((res) => {
        console.log(res.data);
        setUploadPercent({});
        setCertInfo({
          studentId: "OCNST",
          certificateUrl: "",
          token: localStorage.getItem("a_token"),
        });
        setUploadPercent({
          ...uploadPercent,
          file: "",
        });
      })
      .catch((e) => {
        alert("something went wrong please check Student ID");
        console.log(e);
      });
  }
  return (
    <div className="upload-cert">
      <div className="img-div" onClick={imageFileUpload}>
        {certInfo.certificateUrl === "" ? (
          <button className="upload-btn">
            {uploadPercent.file !== "" ? uploadPercent.file : "Upload"}{" "}
            <AiOutlineUpload />
          </button>
        ) : (
          <img
            className="certImg"
            src={certInfo.certificateUrl}
            alt="Certificate.jpg"
          />
        )}
        <input type="hidden" id="certInp" onChange={onChangeHandler} />
      </div>
      <TextInput
        placeholder={"Student ID"}
        onchange={onChangeHandler}
        value={certInfo.studentId}
      />
      <CustomButton onClick={onSubmit}>Submit</CustomButton>
    </div>
  );
}
