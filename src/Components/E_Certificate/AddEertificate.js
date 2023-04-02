import React, { useState } from "react";
import TextInput from "../common/TextInput";
import "./add_certificate.scss";
import { AiOutlineUpload, AiOutlineCamera } from "react-icons/ai";
import CustomButton from "../common/CustomButton";
import firebaseStorage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "../../index";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddEertificate() {
  const state = useLocation().state;
  const navigate = useNavigate();

  const [uploadPercent, setUploadPercent] = useState({
    certificateUrl: "",
    studentProfile: "",
  });

  const [certInfo, setCertInfo] = useState({
    studentId: state != null ? state.studentId : "OCNST",
    certificateUrl: state != null ? state.certificateUrl : "",
    studentProfile: state != null ? state.studentProfile : "",
    studentName: state != null ? state.studentName : "",
    courseCompleted: state != null ? state.courseCompleted : "",
    certificateEarned: state != null ? state.certificateEarned : "",
    skills: state != null ? skillsToString(state.learnedSkills) : "",
    learnedSkills: state != null ? state.learnedSkills : [],
    token: localStorage.getItem("a_token"),
  });

  function skillsToString(skills) {
    let val = "";
    skills.forEach((itme, index) => {
      if (skills.length - 1 === index) {
        val += itme;
      } else {
        val += itme + ", ";
      }
    });
    return val;
  }

  function imageFileUpload(elementId) {
    const fileInp = document.querySelector(elementId);
    fileInp.type = "file";
    fileInp.accept = "image/*";
    fileInp.style.display = "none";
    fileInp.click();
  }
  function onChangeHandler(e) {
    console.log(e.target.name, "------------");
    const { value, name, type, files } = e.target;
    if (type === "file") {
      if (name === "certificateUrl") {
        console.log("cert uploded");
        uploadImage(files[0], "e_certificate", name);
      } else if (name === "studentProfile") {
        console.log("studentProfile uploded");
        uploadImage(files[0], "studentProfile", name);
      }
    } else {
      if (name === "studentId") {
        setCertInfo({ ...certInfo, [name]: value.toUpperCase() });
      } else if (name === "skills") {
        let ls = [];
        value.split(",").forEach((item) => {
          if (item.trim() !== "") {
            ls.push(item.trim());
          }
        });
        setCertInfo({
          ...certInfo,
          learnedSkills: ls,
          [name]: value,
        });
      } else {
        setCertInfo({ ...certInfo, [name]: value });
      }
    }
  }
  function uploadImage(img, path, fieldName) {
    const fold = new Date(Date.now());
    const storageRef = ref(
      firebaseStorage,
      "E_certificate/" + `${fold.getFullYear()}/` + path + "/" + img.name
    );
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(fieldName, progress);

        setUploadPercent({
          ...uploadPercent,
          [fieldName]: progress.toFixed(0) + "%",
        });
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setCertInfo({ ...certInfo, [fieldName]: downloadURL });
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
          studentProfile: "",
          studentName: "",
          courseCompleted: "",
          certificateEarned: "",
          skills: "",
          learnedSkills: [],
          token: localStorage.getItem("a_token"),
        });
        setUploadPercent({
          certificateUrl: "",
          studentProfile: "",
        });
      })
      .catch((e) => {
        alert("something went wrong please check Student ID");
        console.log(e);
      });
  }

  function onUpdate() {
    console.log(state._id);
    axios
      .post(`/certificate/update/${state._id}`, certInfo)
      .then((res) => {
        console.log(res.data);
        setUploadPercent({});
        setCertInfo({
          studentId: "OCNST",
          certificateUrl: "",
          studentProfile: "",
          studentName: "",
          courseCompleted: "",
          certificateEarned: "",
          skills: "",
          learnedSkills: [],
          token: localStorage.getItem("a_token"),
        });
        setUploadPercent({
          certificateUrl: "",
          studentProfile: "",
        });
        navigate(-1);
      })
      .catch((e) => {
        alert(e.response.data.message);
        console.log(e.response.data.message);
      });
  }
  return (
    <div className="upload-cert">
      <div className="img-div" onClick={() => imageFileUpload("#certInp")}>
        {certInfo.certificateUrl === "" ? (
          <button className="upload-btn">
            {uploadPercent.certificateUrl !== ""
              ? uploadPercent.certificateUrl
              : "Upload"}{" "}
            <AiOutlineUpload />
          </button>
        ) : (
          <img
            className="certImg"
            src={certInfo.certificateUrl}
            alt="Certificate.jpg"
          />
        )}
        <input
          type="hidden"
          id="certInp"
          onChange={onChangeHandler}
          name="certificateUrl"
        />
      </div>
      <div
        className="profile-img"
        onClick={() => imageFileUpload("#profile-img")}
      >
        {certInfo.studentProfile === "" ? (
          <span>
            {uploadPercent.studentProfile === "" ? (
              <AiOutlineCamera size={25} />
            ) : (
              uploadPercent.studentProfile
            )}
          </span>
        ) : (
          <img src={certInfo.studentProfile} alt="" />
        )}

        <input
          type="hidden"
          id="profile-img"
          name="studentProfile"
          onChange={onChangeHandler}
        />
      </div>
      <TextInput
        placeholder={"Student ID"}
        onchange={onChangeHandler}
        value={certInfo.studentId}
        name={"studentId"}
      />
      <TextInput
        placeholder={"Student Name"}
        onchange={onChangeHandler}
        value={certInfo.studentName}
        name={"studentName"}
      />
      <TextInput
        placeholder={"Course Name"}
        onchange={onChangeHandler}
        value={certInfo.courseCompleted}
        name={"courseCompleted"}
      />
      <TextInput
        placeholder={"Certificate Earned"}
        onchange={onChangeHandler}
        value={certInfo.certificateEarned}
        name={"certificateEarned"}
      />
      <TextInput
        placeholder={"Learned Skills (ex:html,css)"}
        onchange={onChangeHandler}
        value={certInfo.skills}
        name={"skills"}
      />
      <p className="cert-skils">
        {certInfo.learnedSkills.map((item, index) => {
          return <span key={index}>{item}</span>;
        })}
      </p>
      <CustomButton onClick={state != null ? onUpdate : onSubmit}>
        {state != null ? "Update" : "Add"}
      </CustomButton>
    </div>
  );
}
