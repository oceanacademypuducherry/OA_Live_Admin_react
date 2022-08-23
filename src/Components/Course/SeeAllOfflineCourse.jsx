import axios from "../../index";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard/CourseCard";
import "./CourseCard/course_card.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../CommonFunctions/fetchData";

export default function SeeAllOfflineCourse() {
  const [allCourse, setAllCourse] = useState([]);
  const [useEffectRun, setUseEffectRun] = useState(true);
  const { data, isError, isLoading } = useQuery(["offlinecourse"], () =>
    fetchData({ apiUrl: "offlinecourse/" })
  );
  useEffect(() => {
    axios.get("offlinecourse/").then((res) => {
      setAllCourse(res.data);
    });
  }, [useEffectRun]);
  return (
    <div className="all-course-div">
      {isLoading && <h1>Loading...</h1>}
      {isError && <h1>Error</h1>}
      {data &&
        data.map((course, index) => {
          return (
            <CourseCard
              isOffline={true}
              key={index}
              course={course}
              useEffectRun={useEffectRun}
              setUseEffectRun={setUseEffectRun}
            />
          );
        })}
    </div>
  );
}
