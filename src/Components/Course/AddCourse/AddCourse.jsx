import React, { useEffect, useState } from "react";
import TextInput from "../../common/TextInput";
import "./add_course.scss";
import { FiUpload } from "react-icons/fi";
import axios from "../../../index";
import { useNavigate, useParams } from "react-router-dom";

export default function AddCourse() {
  // axios.post().then(res=>{console.log(res.data)}).catch(error=>{console.log(error.message)})
  const navigate = useNavigate();
  const courseId = useParams().courseId;
  const [courseInfo, setCourseInfo] = useState({
    courseId: "",
    courseImage: "https://i.ibb.co/Xttwyfn/Python.png",
    courseName: "",
    price: "",
    duration: "",
    description: "course description",
    syllabus: ["intro", "data type", "if else", "loop"],
    token: localStorage.getItem("token"),
  });

  function onChangeHandler(e) {
    const { value, name } = e.target;
    setCourseInfo({ ...courseInfo, [name]: value });
    // if (type === "number") {
    //   setCourseInfo({ ...courseInfo, [name]: parseInt(value) });
    // } else {
    //   setCourseInfo({ ...courseInfo, [name]: value });
    // }
  }

  function addCourse() {
    let bodyData = {
      courseId: courseInfo.courseId,
      courseImage: courseInfo.courseImage,
      courseName: courseInfo.courseName,
      price: parseInt(courseInfo.price),
      duration: parseInt(courseInfo.duration),
      description: courseInfo.description,
      syllabus: courseInfo.syllabus,
      token: localStorage.getItem("token"),
    };
    axios
      .post("/course/add/course", bodyData)
      .then((res) => {
        console.log(res.data);
        navigate("/all/course");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateCourse() {
    let bodyData = {
      courseId: courseInfo.courseId,
      courseImage: courseInfo.courseImage,
      courseName: courseInfo.courseName,
      price: parseInt(courseInfo.price),
      duration: parseInt(courseInfo.duration),
      description: courseInfo.description,
      syllabus: courseInfo.syllabus,
      token: localStorage.getItem("token"),
    };
    axios
      .patch("/course/" + courseId, bodyData)
      .then((res) => {
        console.log(res.data);
        navigate("/all/course");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (courseId !== undefined && courseId !== null) {
      axios
        .get("course/" + courseId)
        .then((res) => {
          setCourseInfo(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <div className="add-course-div">
      <div className="overlay course-add">
        <div className="course-img">
          <img src={"https://i.ibb.co/Xttwyfn/Python.png"} alt="" />
        </div>
        <div className="inputs-div">
          <div className="inp-text">
            <TextInput
              className={"courseInp"}
              placeholder={"Course Name"}
              type={"text"}
              value={courseInfo.courseName}
              name="courseName"
              onchange={onChangeHandler}
            />
            <TextInput
              className={"courseInp"}
              placeholder={"Price"}
              type={"number"}
              value={courseInfo.price}
              name="price"
              onchange={onChangeHandler}
            />
            <TextInput
              className={"courseInp"}
              placeholder={"Course ID"}
              type={"text"}
              value={courseInfo.courseId}
              name="courseId"
              onchange={onChangeHandler}
            />
            <TextInput
              className={"courseInp"}
              placeholder={"Duration"}
              type={"number"}
              value={courseInfo.duration}
              name="duration"
              onchange={onChangeHandler}
            />
            <TextInput
              className={"courseInp"}
              placeholder={"Description"}
              type={"number"}
              textarea={true}
              value={courseInfo.description}
              name="description"
              onchange={onChangeHandler}
            />
            <div className="courseInp file-upload-inp">
              <div className="filename">Upload Syllabus (Filename.json)</div>
              <FiUpload className="upload-ico" />
            </div>
          </div>
        </div>
        <div
          className="add-course-btn"
          onClick={
            courseId !== undefined && courseId !== null
              ? updateCourse
              : addCourse
          }
        >
          <span>
            {courseId !== undefined && courseId !== null
              ? "Update Course"
              : "Add Course"}
          </span>
        </div>
      </div>
      <div className="overlay syllabus">
        <div className="syl-title">Syllabus</div>
        <div className="syl-list">
          {courseInfo.syllabus.map((item, index) => {
            return (
              <div key={index} className="syl-content">
                <span>{item}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
