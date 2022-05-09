import React from "react";

import userImage from "../../images/user.jpg";
// import trainerImage from "../../images/mentor.jpg";

import CircleProgressBar from "../../common/CircleProgressBar";

export default function BatchCard({ batch }) {
  console.log(batch);
  const { trainer, completedSyllabus, users, syllabus } = batch;
  const percentage = completedSyllabus.length / syllabus.length;

  return (
    <div className="batch-card">
      <div className="batch-name">{batch.batchName}</div>
      <div className="trainer-info">
        <div className="profileImage">
          <img src={trainer.profilePicture} alt="" />
        </div>
        <div className="t-about">
          <div className="name">{trainer.trainerName}</div>
          <div className="email">{trainer.email}</div>
        </div>
      </div>
      <div className="progress-div">
        {/* <div className="progres">
          <div className="percent">75%</div>
        </div> */}

        <CircleProgressBar percentage={percentage ? percentage : 0} />
      </div>

      <div className="users-group">
        {users.map((user, index) => {
          return (
            <div key={index} className="overlap">
              <div className="user">
                <img src={user.profilePicture} alt="user" />
              </div>
            </div>
          );
        })}
      </div>
      {/* <CustomButton style={{ width: "95%" }}> View Info</CustomButton> */}
    </div>
  );
}
