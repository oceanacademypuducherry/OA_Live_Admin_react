import React from "react";
import "./user_card.scss";
import userPic from "../../images/user.jpg";
export default function UserCard({ userData, style }) {
  return (
    <div className="user-card-div " style={style}>
      <div className="user-img">
        <img src={userPic} alt="user" />
      </div>

      <div className="user-info">
        <div className="username">{userData.firstName}</div>
        <div className="user-email">{userData.email}</div>
      </div>
    </div>
  );
}
