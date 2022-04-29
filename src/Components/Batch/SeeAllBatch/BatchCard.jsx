import React from "react";

import userImage from "../../images/user.jpg";
import trainerImage from "../../images/mentor.jpg";
import CustomButton from "../../common/CustomButton";

export default function BatchCard() {
  return (
    <div className="batch-card">
      <div className="batch-name">28-Feb-1998-flutter</div>
      <div className="trainer-info">
        <div className="profileImage">
          <img src={trainerImage} alt="" />
        </div>
        <div className="t-about">
          <div className="name">Ijass</div>
          <div className="email">ijass@gmail.com</div>
        </div>
      </div>
      <div className="progress-div">
        <div className="progres">
          <div className="percent">75%</div>
        </div>
      </div>

      <div className="users-group">
        <div className="overlap">
          <div className="user">
            <img src={userImage} alt="user" />
          </div>
        </div>

        <div className="overlap">
          <div className="user">
            <img src={userImage} alt="user" />
          </div>
        </div>

        <div className="overlap">
          <div className="user">
            <img src={userImage} alt="user" />
          </div>
        </div>
      </div>
      <CustomButton style={{ width: "95%" }}> View Info</CustomButton>
    </div>
  );
}
