import React from "react";
import "./un_assign_batch_card.scss";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
export default function UnAssignBatchCard({ purchaseDataInfo }) {
  const navigate = useNavigate();

  function titleCase(str) {
    return str.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase());
  }
  return (
    <div
      className="uab-div"
      onClick={() => {
        navigate("/add/to/batch/assign", { state: purchaseDataInfo });
      }}
    >
      <div className="count-div">
        <div className="count">{purchaseDataInfo.users.length}</div>
        <span>Students</span>
      </div>
      <div className="card-content-div">
        <div className="title-div">
          <div className="title">{purchaseDataInfo.course.courseName}</div>

          <IoIosArrowDroprightCircle className="ico" />
        </div>
        <div className="course-tt">
          <div className="time">{purchaseDataInfo.batchTime}</div>
          <div className="type">{purchaseDataInfo.batchType}</div>
        </div>
      </div>
    </div>
  );
}
