import React from "react";
import "./user_card.scss";
import userPic from "../../images/user.jpg";
export default function UserCard({ userData }) {
  return (
    <div className="user-card-div">
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
