import React, { useEffect, useState } from "react";
import "./appbar.scss";
import brandLogo from "../images/oa logo.svg";
import adminImage from "../images/profile.gif";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../index";

export default function Appbar() {
  const token = localStorage.getItem("token");
  const [adminInfo, setAdminInfo] = useState({
    mobileNumber: "",
    adminName: "",
    email: "",
  });
  function titleCase(str) {
    return str.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase());
  }

  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  function getAdminInfo() {
    axios
      .post("admin/", { token: token })
      .then((res) => {
        setAdminInfo(res.data);
      })
      .catch((e) => {
        console.log(e.message);
        navigate("/login");
      });
  }
  useEffect(() => {
    getAdminInfo();
  }, []);
  return (
    <div className="appbar-div">
      <Link to={"/"} className="brand-logo">
        <img src={brandLogo} alt="" />
      </Link>
      <div className="admin-profile">
        <div className="admin-name">{titleCase(adminInfo.adminName)}</div>
        <div className="pic-div">
          <div className="pic">
            <img src={adminImage} alt="" />
          </div>
        </div>
        <div className="admin-name logout" onClick={logout}>
          Logout
        </div>
      </div>
    </div>
  );
}
