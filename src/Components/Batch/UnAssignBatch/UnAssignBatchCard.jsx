import React from "react";
import "./un_assign_batch_card.scss";
import { IoIosArrowDroprightCircle } from "react-icons/io";
export default function UnAssignBatchCard() {
  return (
    <div className="uab-div">
      <div className="count-div">
        <div className="count">10</div>
        <span>Students</span>
      </div>
      <div className="card-content-div">
        <div className="title-div">
          <div className="title">Flutter</div>

          <IoIosArrowDroprightCircle className="ico" />
        </div>
        <div className="course-tt">
          <div className="time">6-7</div>
          <div className="type">Week-End</div>
        </div>
      </div>
    </div>
  );
}
