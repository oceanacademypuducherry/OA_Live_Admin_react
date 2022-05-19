import React, { useEffect, useState } from "react";
// import "./course_card.scss";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "../../../index";

export default function CourseCard({
  course,
  useEffectRun,
  setUseEffectRun,
  isOffline,
}) {
  const navigate = useNavigate();

  function deleteCourse() {
    axios
      .delete("course/" + course.courseId)
      .then((res) => {
        console.log(res.data);
        setUseEffectRun(!useEffectRun);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function deleteOfflineCourse() {
    console.log(course._id);
    console.log(localStorage.getItem("a_token"));
    axios
      .post("/offlinecourse/delete", {
        docId: course._id,
      })
      .then((res) => {
        console.log(res.data);
        setUseEffectRun(!useEffectRun);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function onlineUpdate() {
    navigate("/add/course/" + course.courseId, {
      state: { isOffline: false },
    });
  }
  function offlineUpdate() {
    navigate("/add/course/" + course.courseId, {
      state: { isOffline: true },
    });
  }

  useEffect(() => {}, []);
  return (
    <div className="card-div">
      <div
        className="image-div"
        style={{ backgroundImage: `url(${course.courseImage})` }}
      ></div>
      <div className="content">
        <div className="course-info">
          <div className="c-text">{course.courseId}</div>
          {!isOffline && (
            <>
              <div className="divider"></div>
              <div className="c-text">{course.duration} Hrs</div>
              <div className="divider"></div>
              <div className="c-text">₹{course.price}</div>
            </>
          )}
        </div>
        <div className="footer-card">
          <p className="dec">{course.description}</p>
          <div className="buttons">
            <RiEdit2Fill
              className="i-btn"
              onClick={isOffline ? offlineUpdate : onlineUpdate}
            />
            <MdDelete
              className="i-btn"
              onClick={isOffline ? deleteOfflineCourse : deleteCourse}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
