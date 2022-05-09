import React from "react";
import "./trainer_card.scss";
import mentorImg from "../../images/mentor.jpg";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function TrainerCard({
  trainer,
  index,
  setSelectIndex,
  selectIndex,
}) {
  return (
    <div
      className={`${selectIndex === index + 1 && "is-select"} trainer-card-div`}
      onClick={() => {
        setSelectIndex(index + 1);
      }}
    >
      <div className="indicator">
        <div className="tic"></div>
      </div>
      <div className="divide-trainer-block">
        <div className="trainer-img-div">
          <img src={trainer.profilePicture} alt="mentor" />
        </div>
      </div>
      <div className="divide-trainer-block">
        <div className="trainer-info">
          <div className="trainer-data">
            <div className="t-name">{trainer.trainerName}</div>
            <div className="t-designation">{trainer.designation}</div>
          </div>
          <div className="trainer-data icons">
            <div className="icon-div">
              <FaFacebookF />
            </div>
            <div className="icon-div">
              <FaTwitter />
            </div>
            <div className="icon-div">
              <FaLinkedinIn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
