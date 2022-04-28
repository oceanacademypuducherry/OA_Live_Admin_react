import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Appbar from "../Appbar/Appbar";
import Bg from "../BG/Bg";
import Content from "../Content/Content";
import Sidebar from "../Sidebar/Sidebar";
import "./home.scss";

export default function Home() {
  const navigate = useNavigate();
  const session = localStorage.getItem("token");

  useEffect(() => {
    if (session === null || session === "undefined") navigate("/login");
  }, []);
  return (
    <div className="home-div">
      <div className="component-div">
        <Appbar />
        <div className="t-c">
          <Sidebar />
          <Content>
            <Outlet />
          </Content>
        </div>
      </div>
      <Bg />
    </div>
  );
}
