import axios from "../../index";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard/CourseCard";
import "./CourseCard/course_card.scss";

export default function SeeAllCourse() {
  const [allCourse, setAllCourse] = useState([]);
  const [useEffectRun, setUseEffectRun] = useState(true);

  useEffect(() => {
    axios.get("/course").then((res) => {
      console.log(res.data);
      setAllCourse(res.data);
    });
  }, [useEffectRun]);
  return (
    <div className="all-course-div">
      {allCourse.map((course, index) => {
        return (
          <CourseCard
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
