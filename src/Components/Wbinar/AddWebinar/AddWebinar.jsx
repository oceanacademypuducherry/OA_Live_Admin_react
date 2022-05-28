import React, { useEffect, useState } from "react";
import TextInput from "../../common/TextInput";
import "./add_webinar.scss";
import webinarVideo from "./webinar.mp4";

import firebaseStorage from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "../../../index";

export default function AddWebinar() {
  const [percent, setPercent] = useState({
    bannerImage: "upload image",
    promoVideo: "upload video",
  });
  const [avilableMentor, setAvilabelMentor] = useState([]);
  const [webinarInfo, setWbinarInfo] = useState({
    title: "",
    subtitle: "",
    bannerImage: "",
    course: "",
    enrolledCount: 100,
    duration: 60,
    isFree: true,
    isComplete: false,
    price: 0,
    topics: [],
    startAt: "",
    mentor: "",
    promoVideo: "",
    token: localStorage.getItem("a_token"),
  });

  function inputHandler(e) {
    const { value, name, type, files } = e.target;
    if (name === "topics") {
      topicPicker(files[0]);
    } else if (type === "file") {
      if (files[0] !== undefined) {
        console.log(files[0].type);
        imageUpload(files[0], name);
      }
    } else if (type === "datetime-local") {
      console.log(value);
      let date = new Date(value).toISOString();
      console.log(date);
      setWbinarInfo({ ...webinarInfo, [name]: date });
    } else {
      setWbinarInfo({ ...webinarInfo, [name]: value });
    }
  }
  function imageUpload(file, fieldName) {
    setWbinarInfo({ ...webinarInfo, [fieldName]: "" });
    const storageRef = ref(
      firebaseStorage,
      "webinar/" + fieldName + "/" + file.name
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent({ ...percent, [fieldName]: progress.toFixed(0) + "%" });
        // setPercent(progress.toFixed(0) + "%");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setWbinarInfo({ ...webinarInfo, [fieldName]: downloadURL });
          // setMentorInfo({ ...mentorInfo, mentorImage: downloadURL });
        });
      }
    );
  }
  function filePick(className) {
    let fileInp = document.querySelector("." + className);
    fileInp.type = "file";
    fileInp.style.display = "none";
    fileInp.click();
  }

  function dateConverter() {
    if (webinarInfo.startAt === "") {
      return "DD-MM-YY HH:MM AM";
    }
    let fullDate = new Date(webinarInfo.startAt);
    let hours = fullDate.getHours() === 12 ? 12 : fullDate.getHours() % 12;
    return `${fullDate.getDate()}-${fullDate.getMonth()}-${fullDate.getFullYear()} ${hours}:${fullDate.getMinutes()} ${
      fullDate.getHours() <= 11 || fullDate.getHours() === 0 ? "AM" : "PM"
    }`;
  }

  async function topicPicker(pickedFile) {
    var reader = new FileReader();
    reader.readAsText(pickedFile, "UTF-8");
    try {
      reader.onload = (readerEvent) => {
        var content = readerEvent.target.result;
        const topics = JSON.parse(content);
        if (topics[0].subtitle === undefined || topics[0].title === undefined) {
          alert("invalid syllabus");
        } else {
          console.log(topics);
          setWbinarInfo({ ...webinarInfo, topics: topics });
        }
      };
    } catch (e) {
      console.log(e.message);
      alert("invalid syllabus");
    }
  }
  function getAllWebinarMentor() {
    axios
      .post("/webinar/mentor/all", { token: localStorage.getItem("a_token") })
      .then((res) => {
        setAvilabelMentor(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function addWebinar() {
    axios
      .post("/webinar/add", webinarInfo)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getAllWebinarMentor();
  }, []);
  return (
    <div className="add-webinar-div">
      <div className="webinar-form-div">
        <div className="files-div ">
          <div
            className="banner-div asset"
            onClick={() => {
              filePick("w-img-inp");
            }}
          >
            <input
              type="hidden"
              onChange={inputHandler}
              name="bannerImage"
              className="w-img-inp"
            />
            {webinarInfo.bannerImage === "" ? (
              <h2>{percent.bannerImage}</h2>
            ) : (
              <img src={webinarInfo.bannerImage} alt="" />
            )}
          </div>
          <div
            className="video-div asset"
            onClick={() => filePick("w-video-inp")}
          >
            <input
              type="hidden"
              className="w-video-inp"
              name="promoVideo"
              onChange={inputHandler}
            />
            {webinarInfo.promoVideo === "" ? (
              <h2>{percent.promoVideo}</h2>
            ) : (
              <video controls>
                <source src={webinarInfo.promoVideo} />
              </video>
            )}
          </div>
        </div>
        <div className="inputs">
          <TextInput
            style={{ width: 300, margin: "10px 10px" }}
            placeholder="Title"
            name={"title"}
            value={webinarInfo.title}
            onchange={inputHandler}
          />
          <TextInput
            style={{ width: 300, margin: "10px 10px" }}
            placeholder="Subtitle"
            name={"subtitle"}
            value={webinarInfo.subtitle}
            onchange={inputHandler}
          />
          <TextInput
            type={"number"}
            style={{ width: 200, margin: "10px 10px" }}
            placeholder="Duration"
            name={"duration"}
            value={webinarInfo.duration}
            onchange={inputHandler}
          />
          <TextInput
            style={{ width: 200, margin: "10px 10px" }}
            placeholder="Course Name"
            name={"course"}
            value={webinarInfo.course}
            onchange={inputHandler}
          />
          <TextInput
            type={"number"}
            style={{ width: 200, margin: "10px 10px" }}
            placeholder="Price"
            name="price"
            value={webinarInfo.price}
            onchange={inputHandler}
          />
          <div className="webinar-inp date-picker">
            <input
              id="date-pi"
              type="datetime-local"
              name="startAt"
              value={webinarInfo.startAt}
              onChange={inputHandler}
            />
            <div className="date-time">{dateConverter()}</div>
          </div>
          <div className="webinar-inp mentor-picker">
            <select
              name="mentor"
              // value={webinarInfo.mentor}
              onChange={inputHandler}
              // style={{ height: 40 }}
            >
              <option value="">Select</option>
              {avilableMentor.map((mentor, index) => {
                return (
                  <option key={index} value={mentor._id}>
                    {mentor.mentorName}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            className="status-btn"
            style={{ background: webinarInfo.isComplete ? "green" : "red" }}
            onClick={() => {
              setWbinarInfo({
                ...webinarInfo,
                isComplete: !webinarInfo.isComplete,
              });
            }}
          >
            {webinarInfo.isComplete ? "Completed" : "Not Completed"}
          </button>
        </div>
      </div>
      <div className="topic-div" onClick={() => filePick("topics-json")}>
        <input
          type="hidden"
          className="topics-json"
          name="topics"
          onChange={inputHandler}
        />
        <div className="topic-title">Topic</div>
        <div className="topics">
          {webinarInfo.topics.map((item, index) => (
            <span key={index} className="topic">
              {item.title}
            </span>
          ))}
        </div>
      </div>
      <div
        className="c-btn addmentor"
        style={{ width: 300 }}
        onClick={addWebinar}
      >
        Add Mentor
      </div>
    </div>
  );
}
