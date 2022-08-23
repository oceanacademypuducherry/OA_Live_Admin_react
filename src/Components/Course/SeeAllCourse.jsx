import axios from "../../index";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard/CourseCard";
import "./CourseCard/course_card.scss";
import { useQuery } from "@tanstack/react-query";

export default function SeeAllCourse() {
  const [useEffectRun, setUseEffectRun] = useState(true);

  const fetchData = () => {
    return axios.get("/course", {}).then((res) => res.data);
  };
  const { data, isLoading, isError, isFetching } = useQuery(
    ["allcourse"],
    fetchData
  );

  return (
    <div className="all-course-div">
      {isLoading && <h1>Loading...</h1>}
      {data &&
        data.map((course, index) => {
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
