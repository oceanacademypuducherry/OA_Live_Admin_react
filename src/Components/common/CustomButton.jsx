import React from "react";
import "./custom_button.scss";

export default function CustomButton({ children, onClick, style }) {
  return (
    <div style={style} className="c-btn" onClick={onClick}>
      {children}
    </div>
  );
}
