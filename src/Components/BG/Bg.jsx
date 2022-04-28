import React from "react";
import "./bg.scss";
import bgImg from "../images/bg.jpg";
export default function Bg() {
  return (
    <div className="bg">
      <div className="bg-overlay"></div>
      <img src={bgImg} alt="bg" />
    </div>
  );
}
