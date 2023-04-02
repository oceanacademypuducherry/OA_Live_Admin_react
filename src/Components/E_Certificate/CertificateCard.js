import React from "react";
import "./certificate_card.scss";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import axios from "../../index";
import { useNavigate } from "react-router-dom";

export default function CertificateCard({
  studentId,
  certificateUrl,
  onDelete,
  data,
}) {
  const navigate = useNavigate();

  function onEdit() {
    navigate("/add/certificate", { state: data });
  }

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
        <p>{studentId}</p>
        <div className="cert-control">
          <FaEdit className="ico edit" onClick={onEdit} />
          <AiFillDelete className="ico del" onClick={deleteCert} />
        </div>
      </div>
    </div>
  );
}
