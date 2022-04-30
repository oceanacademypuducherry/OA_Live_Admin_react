import React, { useEffect, useState } from "react";
// import "./course_card.scss";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "../../../index";

export default function CourseCard({ course, useEffectRun, setUseEffectRun }) {
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
          <div className="divider"></div>
          <div className="c-text">{course.duration} Hrs</div>
          <div className="divider"></div>
          <div className="c-text">₹{course.price}</div>
        </div>
        <div className="footer-card">
          <p className="dec">{course.description}</p>
          <div className="buttons">
            <RiEdit2Fill
              className="i-btn"
              onClick={() => {
                navigate("/add/course/" + course.courseId);
              }}
            />
            <MdDelete className="i-btn" onClick={deleteCourse} />
          </div>
        </div>
      </div>
    </div>
  );
}
