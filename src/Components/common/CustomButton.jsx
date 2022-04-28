import React from "react";
import "./custom_button.scss";

export default function CustomButton({ children, onClick }) {
  return (
    <div className="c-btn" onClick={onClick}>
      {children}
    </div>
  );
}
