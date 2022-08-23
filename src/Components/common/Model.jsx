import React from "react";
import Overlay from "./Overlay";
import "./modal.scss";

export default function Madel({ children }) {
  return (
    <Overlay>
      <div className="modal-div">{children}</div>
    </Overlay>
  );
}
