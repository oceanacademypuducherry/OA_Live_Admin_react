import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./login.scss";
import Bg from "../BG/Bg";
import OA from "../OA/OA";
import TextInput from "../common/TextInput";
import CustomButton from "../common/CustomButton";
import profileImage from "../images/profile.gif";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../index";

export default function SignUp() {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [adminInfo, setAdminInfo] = useState({
    adminName: "",
    mobileNumber: state.mobileNumber,
    email: "",
  });
  function onChangeHandler(e) {
    const { value, name, type } = e.target;
    if (type === "file") {
    } else {
      setAdminInfo({ ...adminInfo, [name]: value });
    }
  }
  function signUp() {
    axios
      .post("admin/create", adminInfo)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/add/batch");
      })
      .catch((e) => {
        console.log(e.message);
      });
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
        <div className="profile">
          <div className="img-div">
            <img src={profileImage} alt="profile" />
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

        <CustomButton onClick={signUp}>SignUp</CustomButton>
      </div>
      <OA />
      <Bg />
    </div>
  );
}
