import React, { useEffect, useRef, useState } from "react";
import TrainerCard from "../UserAndTrainerCard/TrainerCard";
import UserCard from "../UserAndTrainerCard/UserCard";
import CustomButton from "../../common/CustomButton";
import "./assign_batch.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../index";

export default function AssingBatch() {
  const [selectIndex, setSelectIndex] = useState(null);
  const navigate = useNavigate();
  const locationHistoryState = useLocation().state;
  console.log(locationHistoryState);

  const [pickedDate, setPickedDate] = useState("YYYY-MM-DD");

  function addBatch(data) {
    let startDate = "";
    if (pickedDate !== "") {
      startDate = new Date(pickedDate).toISOString();
    }
    let batchData = {
      batchName: `${pickedDate}_${locationHistoryState.course.courseName}`,
      courseId: data.course.courseId,
      course: data.course._id,
      users: data.users,
      courseProgress: 0,
      courseStartDate: startDate,
      duration: data.course.duration,
      batchTime: data.batchTime,
      trainer: `${
        selectIndex &&
        locationHistoryState.availableTrainer[selectIndex - 1]._id
      }`,
      batchType: data.batchType,
      isComplete: false,
      isStarted: true,
      token: localStorage.getItem("a_token"),
    };
    console.log(batchData);
    axios
      .post("/batch/add", batchData)
      .then((res) => {
        console.log(res.data);
        navigate("/add/to/batch");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div className="assign-batch-div">
      <div className="user-view">
        {locationHistoryState == null ? (
          <h1>Invalid link</h1>
        ) : (
          locationHistoryState.users.map((user, index) => {
            const userData = user.user;
            return <UserCard key={index} userData={userData} />;
          })
        )}
      </div>
      <div className="add-batch-info">
        <div className="date-bar">
          <div className="date-picker-div">
            <div className="info-of-batch">
              <div className="key">Start Date :</div>
              <div className="value">
                {pickedDate}
                <input
                  type="date"
                  className="value dd"
                  onChange={(e) => {
                    setPickedDate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="info-of-batch">
              <div className="key">Batch Id :</div>
              <div className="value">
                {pickedDate}-{locationHistoryState.course.courseName}
              </div>
            </div>
          </div>

          <CustomButton
            style={{ width: 100 }}
            onClick={() => {
              addBatch(locationHistoryState);
            }}
          >
            Assign
          </CustomButton>
        </div>
        <div className="trainer-picker">
          {locationHistoryState.availableTrainer.map((trainer, index) => {
            return (
              <TrainerCard
                trainer={trainer}
                key={index}
                index={index}
                setSelectIndex={setSelectIndex}
                selectIndex={selectIndex}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
