import React, { useEffect, useState } from "react";
import TextInput from "../../common/TextInput";
import "./add_course.scss";
import { FiUpload } from "react-icons/fi";
import axios from "../../../index";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import firebaseStorage from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function AddCourse() {
  // axios.post().then(res=>{console.log(res.data)}).catch(error=>{console.log(error.message)})
  const navigate = useNavigate();
  const courseId = useParams().courseId;

  const location = useLocation().state;

  const [uploadPercent, setUploadPercent] = useState({
    image: "Upload Course Image",
    file: "",
  });
  const [isOffline, setIsOffline] = useState(false);
  const [courseInfo, setCourseInfo] = useState({
    courseId: "",
    courseImage: "",
    courseName: "",
    price: "",
    duration: "",
    description: "",
    syllabus: [],
    syllabusLink: "",
    token: localStorage.getItem("token"),
  });
  async function syllabusUpload(pickedFile) {
    var reader = new FileReader();
    reader.readAsText(pickedFile, "UTF-8");
    try {
      reader.onload = (readerEvent) => {
        var content = readerEvent.target.result;
        const syllabus = JSON.parse(content);
        if (
          syllabus[0].topics === undefined ||
          syllabus[0].title === undefined
        ) {
          alert("invalid syllabus");
        } else {
          console.log(syllabus[0].title);
          setCourseInfo({ ...courseInfo, syllabus: syllabus });
        }
      };
    } catch (e) {
      console.log(e.message);
      alert("invalid syllabus");
    }
  }

  function onChangeHandler(e) {
    const { value, name, type, files } = e.target;
    // setCourseInfo({ ...courseInfo, [name]: value });
    // console.log(name);
    if (type === "file" && name === "courseImage") {
      setCourseInfo({ ...courseInfo, courseImage: null });
      uploadImage(files[0], "courseImage", name);
    } else if (type === "file" && name === "syllabus") {
      // setCourseInfo({ ...courseInfo, syllabus: ["convert the json file"] });
      syllabusUpload(files[0]);
      // console.log(files[0]);
      // uploadImage(files[0], "onlineSyllabus", name);
    } else if (type === "file" && name === "syllabusLink") {
      setCourseInfo({ ...courseInfo, syllabusLink: null });
      uploadImage(files[0], "offlineSyllabus", name);
    } else {
      setCourseInfo({ ...courseInfo, [name]: value });
    }
  }
  function uploadImage(img, path, fieldName) {
    const storageRef = ref(firebaseStorage, path + "/" + img.name);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(fieldName, progress);
        if (fieldName === "courseImage")
          setUploadPercent({
            ...uploadPercent,
            image: progress.toFixed(0) + "%",
          });
        if (fieldName === "syllabusLink") {
          setUploadPercent({
            ...uploadPercent,
            file: progress.toFixed(0) + "%",
          });
        }

        // console.log("Upload is " + progress + "% done");
        // console.log(snapshot.state);
      },
      (error) => {
        console.log(error);
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);

          setCourseInfo({ ...courseInfo, [fieldName]: downloadURL });
        });
      }
    );
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

  function addOfflineCourse() {
    console.log(courseInfo);
    let bodyData = {
      courseId: courseInfo.courseId,
      courseImage: courseInfo.courseImage,
      courseName: courseInfo.courseName,
      description: courseInfo.description,
      syllabusLink: courseInfo.syllabusLink,
      token: localStorage.getItem("token"),
    };
    axios
      .post("/offlinecourse/add/", bodyData)
      .then((res) => {
        console.log(res.data);
        navigate("/all/offlinecourse");
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
    console.log(bodyData);
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
  function updateOfflineCourse() {
    let bodyData = {
      docId: courseInfo["_id"],
      courseId: courseInfo.courseId,
      courseImage: courseInfo.courseImage,
      courseName: courseInfo.courseName,
      description: courseInfo.description,
      syllabusLink: courseInfo.syllabusLink,
      token: localStorage.getItem("token"),
    };
    axios
      .put("/offlinecourse/update", bodyData)
      .then((res) => {
        console.log(res.data);
        navigate("/all/offlinecourse");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function imageFileUpload() {
    const fileInp = document.querySelector("#fileInp");
    fileInp.type = "file";
    fileInp.accept = "image/*";
    fileInp.click();
  }
  function fileUpload() {
    const fileInp = document.querySelector("#syllabusFile");
    fileInp.type = "file";
    fileInp.accept = "json";
    fileInp.style.display = "none";
    fileInp.click();
  }

  useEffect(() => {
    if (courseId !== undefined && courseId !== null) {
      if (location.isOffline) {
        axios
          .get("/offlinecourse/get/" + courseId)
          .then((res) => {
            setCourseInfo(res.data);
            setIsOffline(res.data.price ? false : true);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .get("course/" + courseId)
          .then((res) => {
            setCourseInfo(res.data);
            setIsOffline(res.data.price ? false : true);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="add-course-div">
      <div className="overlay course-add">
        <div className="is-offline" onClick={() => setIsOffline(!isOffline)}>
          <span>{isOffline ? "Offline" : "Online"}</span>
          <div className="ch-button">
            <div
              className="ch-indicator"
              style={{ background: !isOffline && "rgb(0, 128, 255)" }}
            ></div>
          </div>
        </div>
        <div className="course-img" onClick={imageFileUpload}>
          <input
            type="hidden"
            id="fileInp"
            name="courseImage"
            style={{ display: "none" }}
            onChange={onChangeHandler}
          />
          {courseInfo.courseImage ? (
            <img src={courseInfo.courseImage} alt="" accept="image/*" />
          ) : (
            <div className="imgUpload">
              <h1>{uploadPercent.image}</h1>
            </div>
          )}
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
            {!isOffline && (
              <TextInput
                className={"courseInp"}
                placeholder={"Price"}
                type={"number"}
                value={courseInfo.price}
                name="price"
                onchange={onChangeHandler}
              />
            )}
            <TextInput
              className={"courseInp"}
              placeholder={"Course ID"}
              type={"text"}
              value={courseInfo.courseId}
              name="courseId"
              onchange={onChangeHandler}
            />
            {!isOffline && (
              <TextInput
                className={"courseInp"}
                placeholder={"Duration"}
                type={"number"}
                value={courseInfo.duration}
                name="duration"
                onchange={onChangeHandler}
              />
            )}
            <TextInput
              className={"courseInp"}
              placeholder={"Description"}
              type={"number"}
              textarea={true}
              value={courseInfo.description}
              name="description"
              onchange={onChangeHandler}
            />
            <div className="courseInp file-upload-inp" onClick={fileUpload}>
              <input
                type="hidden"
                id="syllabusFile"
                name={isOffline ? "syllabusLink" : "syllabus"}
                onChange={onChangeHandler}
              />
              <div className="filename">
                Upload Syllabus ({isOffline ? "Filename.pdf" : "Filename.json"})
              </div>
              <span style={{ color: "white" }}>{uploadPercent.file}</span>

              <FiUpload className="upload-ico" />
            </div>
          </div>
        </div>
        <div
          className="add-course-btn"
          onClick={() => {
            if (isOffline) {
              if (courseId !== undefined && courseId !== null) {
                updateOfflineCourse();
              } else {
                addOfflineCourse();
              }
            } else {
              if (courseId !== undefined && courseId !== null) {
                updateCourse();
              } else {
                addCourse();
              }
            }
          }}
        >
          {isOffline ? (
            <span>
              {courseId !== undefined && courseId !== null
                ? "Update Offline Course"
                : "Add Offline Course"}
            </span>
          ) : (
            <span>
              {courseId !== undefined && courseId !== null
                ? "Update Course"
                : "Add Course"}
            </span>
          )}
        </div>
      </div>
      <div className="overlay syllabus">
        <div className="syl-title">Syllabus</div>
        <div className="syl-list">
          {courseInfo.syllabus &&
            courseInfo.syllabus.map((item, index) => {
              return (
                <div key={index} className="syl-content">
                  <span>{item.title}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
