import axios from "../../index";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DownloadedCourseCard from "./DownloadedCourseCard";
import "./offline_course_downloaded_user.scss";

export default function OfflineCourseDownloadedUser() {
  const [allUsers, setAllusers] = useState([]);
  const [runUseEffect, setRunUseEffect] = useState(true);

  function getUserData() {
    axios
      .get("/downloaded/course")
      .then((res) => {
        setAllusers(res.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteUser(user) {
    console.log(user._id);
    axios
      .post("/downloaded/course/delete/user/", { userId: user._id })
      .then((res) => {
        setRunUseEffect(!runUseEffect);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getUserData();
  }, [runUseEffect]);
  return (
    <div className="ocdu-div">
      {allUsers.map((user, index) => {
        return (
          <DownloadedCourseCard
            key={index}
            user={user}
            deleteUser={deleteUser}
          />
        );
      })}
    </div>
  );
}
