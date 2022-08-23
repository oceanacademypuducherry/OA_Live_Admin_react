import React from "react";
import { useState } from "react";

import "./my_dropdown.scss";

export default function MyDropdown({
  title,
  value,
  staticValue,
  staticValueClick,
  onChange,
  lableText,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(lableText);

  return (
    <div
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className="drop-div"
    >
      <div className="lable-div">
        <span className="value"> {selectedTitle}</span>
        <span className="ico"> ▼</span>
      </div>
      <div
        className="options-div"
        style={{
          height: isOpen ? title.length * 40 + (staticValue && 40) : 0,
        }}
      >
        {title.map((item, index) => {
          return (
            <div
              className="option"
              key={index}
              onClick={() => {
                onChange(value[index]);
                setSelectedTitle(item);
              }}
            >
              {item}
            </div>
          );
        })}
        {staticValue && (
          <div className="option default-option" onClick={staticValueClick}>
            {staticValue}
          </div>
        )}
      </div>
    </div>
  );
}
