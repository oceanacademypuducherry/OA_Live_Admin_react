import React, { useState } from "react";
import "./login.scss";
import Bg from "../BG/Bg";
import OA from "../OA/OA";
import TextInput from "../common/TextInput";
import CustomButton from "../common/CustomButton";
import { useNavigate } from "react-router-dom";
import axios from "../../index";

export default function Login() {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");

  function login() {
    axios
      .post("/admin/login", {
        mobileNumber: mobileNumber,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 403)
          navigate("/signup", { state: { mobileNumber: mobileNumber } });
      });
  }

  return (
    <div className="auth-div">
      <div className="box">
        <TextInput
          type={"number"}
          value={mobileNumber}
          // valid={mobileNumber.length > 9}
          placeholder="Mobile Number"
          onchange={(e) => {
            setMobileNumber(e.target.value);
          }}
        />
        <CustomButton onClick={login}>Login</CustomButton>
      </div>
      <OA />
      <Bg />
    </div>
  );
}
