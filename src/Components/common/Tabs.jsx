import React from "react";
import { Link } from "react-router-dom";

import "./tabs.scss";
export default function Tabs({ activeTab, tabName, icon, navigateTo }) {
  return (
    <Link to={navigateTo} className="tabs-div">
      <div className={`tab ${activeTab}`}>
        <div className="ico">{icon}</div>
        <span>{tabName}</span>
      </div>
      <div className={`glow ${activeTab && "active-glow"}`}></div>
    </Link>
  );
}
