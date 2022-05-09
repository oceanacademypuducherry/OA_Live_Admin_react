import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./login.scss";
import Bg from "../BG/Bg";
import OA from "../OA/OA";
import TextInput from "../common/TextInput";
import CustomButton from "../common/CustomButton";
import profileImage from "../images/profile.gif";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../index";

import firebaseStorage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function SignUp() {
  const navigate = useNavigate();
  const state = useLocation().state;
  // const [profile, setProfile] = useState(profileImage);
  const [uploadPercent, setUploadPercent] = useState("Upload");
  const [adminInfo, setAdminInfo] = useState({
    adminName: "",
    mobileNumber: state ? state.mobileNumber : "",
    email: "",
    adminImage:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  });

  function onChangeHandler(e) {
    const { value, name, type, files } = e.target;
    if (type === "file") {
      setAdminInfo({ ...adminInfo, adminImage: null });
      // console.log(files[0]);
      uploadImage(files[0]);
    } else {
      setAdminInfo({ ...adminInfo, [name]: value });
    }
  }
  function signUp() {
    axios
      .post("admin/create", adminInfo)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/all/course");
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  function fileUpload() {
    const fileInp = document.querySelector("#profile-inp");
    fileInp.type = "file";
    fileInp.accept = "image/*";
    fileInp.click();
  }

  function uploadImage(img) {
    const storageRef = ref(firebaseStorage, "admin/" + img.name);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercent(progress + "%");
        // console.log("Upload is " + progress.toFixed(0) + "% done");
        // console.log(snapshot.state);
      },
      (error) => {
        console.log(error);
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setAdminInfo({ ...adminInfo, adminImage: downloadURL });
        });
      }
    );
  }

  return (
    <div className="auth-div">
      <div
        className="back-btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        <FaArrowLeft className="ico" />
      </div>

      <div className="box">
        <input
          type="hidden"
          onChange={onChangeHandler}
          id="profile-inp"
          style={{ display: "none" }}
        />
        <div className="profile" onClick={fileUpload}>
          <div className="img-div">
            {adminInfo.adminImage ? (
              <img src={adminInfo.adminImage} alt="profile" />
            ) : (
              <div className="imgUpload">
                <h1>{uploadPercent}</h1>
              </div>
            )}
          </div>
        </div>

        <TextInput
          placeholder="Name"
          value={adminInfo.adminName}
          name="adminName"
          onchange={onChangeHandler}
        />
        <TextInput
          type="number"
          value={adminInfo.mobileNumber}
          name="mobileNumber"
          onchange={onChangeHandler}
          placeholder="Mobile Number"
        />
        <TextInput
          type={"email"}
          placeholder="Email"
          value={adminInfo.email}
          name="email"
          onchange={onChangeHandler}
        />

        <CustomButton style={{ width: 420 }} onClick={signUp}>
          SignUp
        </CustomButton>
      </div>
      <OA />
      <Bg />
    </div>
  );
}
