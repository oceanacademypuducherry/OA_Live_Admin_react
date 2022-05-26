import React, { useState } from "react";
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
    topics: [{ title: "", subtitle: "" }],
    startAt: "2022-06-20T23:45:00.000+00:00",
    mentor: "",
    promoVideo: "",
  });

  function inputHandler(e) {
    const { value, name, type, files } = e.target;

    if (type === "file") {
      if (files[0] !== undefined) {
        console.log(files[0].type);
        imageUpload(files[0], name);
      }
    } else if (type === "datetime-local") {
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
              type="datetime-local"
              name="startAt"
              value={webinarInfo.startAt}
              onChange={inputHandler}
            />
          </div>
          <div className="webinar-inp mentor-picker">
            <select
              name="mentor"
              // value={webinarInfo.mentor}
              onChange={inputHandler}
            >
              <option>Thamizh</option>
              <option>Ijass</option>
            </select>
          </div>
          <button className="status-btn">Not Completed</button>
        </div>
      </div>
      <div className="topic-div">
        <div className="topic-title">Topic</div>
        <div className="topics">
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
          <span className="topic">Intro</span>
        </div>
      </div>
      <div
        className="c-btn addmentor"
        style={{ width: 300 }}
        onClick={() => {
          console.log(webinarInfo);
        }}
      >
        Add Mentor
      </div>
    </div>
  );
}
