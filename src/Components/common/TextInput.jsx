import React from "react";
import "./text_input.scss";

export default function TextInput({
  textarea,
  className,
  value,
  onchange,
  placeholder,
  style,
  type,
  name,
  readOnly,
}) {
  return (
    <div
      className={`text-box ${className} ${textarea && "inp-textarea"} `}
      style={style}
    >
      <div className="dot"></div>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          name={name}
          onChange={onchange}
          value={value}
        ></textarea>
      ) : (
        <input
          readOnly={readOnly}
          className="inp"
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onchange}
        />
      )}
    </div>
  );
}
