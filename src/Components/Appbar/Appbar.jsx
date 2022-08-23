import React, { useEffect, useState } from "react";
import "./appbar.scss";
import brandLogo from "../images/oa logo.svg";

import { Link, useNavigate } from "react-router-dom";
import axios from "../../index";
import { useQuery, QueryClientProvider } from "@tanstack/react-query";

export default function Appbar() {
  const token = localStorage.getItem("a_token");

  const [adminInfo, setAdminInfo] = useState({
    mobileNumber: "",
    adminName: "",
    email: "",
    adminImage: sessionStorage.getItem("userImg"),
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
        sessionStorage.setItem("userImg", res.data.adminImage);
      })
      .catch((e) => {
        console.log(e.message);
        navigate("/login");
      });
  }
  useEffect(() => {
    getAdminInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <img src={adminInfo.adminImage} alt="" />
          </div>
        </div>
        <div className="admin-name logout" onClick={logout}>
          Logout
        </div>
      </div>
    </div>
  );
}
