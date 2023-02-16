import React from "react";
import "./certificate_card.scss";
import { AiFillDelete } from "react-icons/ai";
import axios from "../../index";

export default function CertificateCard({
  studentId,
  certificateUrl,
  onDelete,
}) {
  function deleteCert() {
    axios
      .post(`/certificate/delete/${studentId}`, {
        token: localStorage.getItem("a_token"),
      })
      .then((res) => {
        console.log(res.data);
        onDelete();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <div className="cert">
      <div className="cert-div">
        <img src={certificateUrl} alt={studentId} />
      </div>
      <div className="cert-action">
        <p>{studentId}</p> <AiFillDelete className="ico" onClick={deleteCert} />
      </div>
    </div>
  );
}
