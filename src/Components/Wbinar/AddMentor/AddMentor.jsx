import React, { useState } from "react";
import TextInput from "../../common/TextInput";
import "./add_mentor.scss";
import firebaseStorage from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "../../../index";
import { motion } from "framer-motion";

export default function AddMentor() {
  const [percent, setPercent] = useState("Upload Image");
  const [showMsg, setShowMsg] = useState({
    opacity: 0,
    x: 300,
  });
  const [mentorInfo, setMentorInfo] = useState({
    mentorName: "",
    designation: "",
    mentorImage: "",
    aboutMentor: "",
    mentorEmail: "",
    mobileNumber: "",
    token: localStorage.getItem("a_token"),
  });

  function inputHandler(e) {
    const { value, name, type, files } = e.target;
    if (type === "file") {
      if (files[0] !== undefined) imageUpload(files[0]);
    } else {
      setMentorInfo({ ...mentorInfo, [name]: value });
    }
  }
  function imageUpload(img) {
    setMentorInfo({ ...mentorInfo, mentorImage: "" });
    const storageRef = ref(firebaseStorage, "webinarMentor/" + img.name);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(progress.toFixed(0) + "%");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setMentorInfo({ ...mentorInfo, mentorImage: downloadURL });
        });
      }
    );
  }

  function filePick() {
    let fileInp = document.querySelector("#fileInp");
    fileInp.type = "file";
    fileInp.style.display = "none";
    fileInp.click();
  }

  function hideMessage() {
    setShowMsg({
      opacity: 1,
      x: 0,
    });
    setTimeout(() => {
      setShowMsg({
        opacity: 0,
        x: 300,
      });
    }, 3000);
  }
  function addMentor() {
    axios
      .post("/webinar/mentor/add", mentorInfo)
      .then((res) => {
        setPercent("Upload Image");
        setMentorInfo({
          mentorName: "",
          designation: "",
          mentorImage: "",
          aboutMentor: "",
          mentorEmail: "",
          mobileNumber: "",
        });
        hideMessage();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="add-mentor-div">
      <motion.div
        className="message"
        initial={showMsg}
        animate={showMsg}
        transition={{}}
      >
        Mentor added Successfully...
      </motion.div>

      <div className="info-section">
        <div className="img-div" onClick={filePick}>
          <input
            type="hidden"
            name="mentorImage"
            id="fileInp"
            onChange={inputHandler}
          />
          {mentorInfo.mentorImage === "" ? (
            <h2>{percent}</h2>
          ) : (
            <img src={mentorInfo.mentorImage} alt="mentor" />
          )}
        </div>
        <div className="inputs">
          <TextInput
            style={{ width: 300, margin: 10 }}
            placeholder={"Mentor Name"}
            onchange={inputHandler}
            name={"mentorName"}
            value={mentorInfo.mentorName}
          />
          <TextInput
            style={{ width: 300, margin: 10 }}
            placeholder={"Designation"}
            onchange={inputHandler}
            value={mentorInfo.designation}
            name={"designation"}
          />
          <TextInput
            style={{ width: 300, margin: 10 }}
            placeholder={"Mobile Number"}
            onchange={inputHandler}
            name={"mobileNumber"}
            value={mentorInfo.mobileNumber}
          />
          <TextInput
            style={{ width: 300, margin: 10 }}
            placeholder={"Email"}
            onchange={inputHandler}
            name={"mentorEmail"}
            value={mentorInfo.mentorEmail}
          />
          <TextInput
            style={{ width: 300, margin: 10 }}
            placeholder={"About Mentor"}
            onchange={inputHandler}
            name={"aboutMentor"}
            value={mentorInfo.aboutMentor}
          />
          <div className="c-btn" style={{ width: 300 }} onClick={addMentor}>
            Add Mentor
          </div>
        </div>
      </div>
    </div>
  );
}
