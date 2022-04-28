import React from "react";
import "./text_input.scss";

export default function TextInput({
  value,
  onchange,
  placeholder,
  valid,
  type,
  name,
}) {
  return (
    <div>
      <div className="text-box">
        <div className="dot"></div>
        <input
          className="inp"
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onchange}
        />
      </div>
    </div>
  );
}
