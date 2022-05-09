import axios from "../../index";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard/CourseCard";
import "./CourseCard/course_card.scss";

export default function SeeAllOfflineCourse() {
  const [allCourse, setAllCourse] = useState([]);
  const [useEffectRun, setUseEffectRun] = useState(true);

  useEffect(() => {
    axios.get("offlinecourse/").then((res) => {
      setAllCourse(res.data);
    });
  }, [useEffectRun]);
  return (
    <div className="all-course-div">
      {allCourse.map((course, index) => {
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
