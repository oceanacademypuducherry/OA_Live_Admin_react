import React from "react";
import "./enquiry.scss";
import axios from "../../index";
import { AiFillDelete, AiFillDatabase } from "react-icons/ai";
export default function EnquiryCard({ enqData, refetch }) {
  function deleteEnq() {
    axios
      .post(`/enquiry/delete/${enqData._id}`)
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function convertedDate(rawDate) {
    const date = new Date(rawDate);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }
  return (
    <div
      className="enq-cart-div"
      title={enqData.description ? enqData.description : "Empty"}
    >
      <h3>{enqData.name}</h3>
      <p>{enqData.mobileNumber}</p>
      <p>{convertedDate(enqData.queryDate)}</p>
      <p>
        {enqData.selectedCoruse} {enqData.description && <AiFillDatabase />}
      </p>
      <div className="ico">
        <AiFillDelete onClick={deleteEnq} />
      </div>
    </div>
  );
}
