import axios from "../../index";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DownloadedCourseCard from "./DownloadedCourseCard";
import "./offline_course_downloaded_user.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../CommonFunctions/fetchData";

export default function OfflineCourseDownloadedUser() {
  const [allUsers, setAllusers] = useState([]);
  const [runUseEffect, setRunUseEffect] = useState(true);

  const { data, isError, isLoading, refetch } = useQuery(
    ["alldownloaduser"],
    () =>
      fetchData({
        apiUrl: "/downloaded/course",
        method: "GET",
      })
  );

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
    refetch();
  }, [runUseEffect]);
  return (
    <div className="ocdu-div">
      {isError && <h1>Error</h1>}
      {isLoading && <h1>Loading</h1>}
      {data &&
        data.map((user, index) => {
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
