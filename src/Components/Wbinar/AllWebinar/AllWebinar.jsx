import axios from "../../../index";
import React, { useEffect, useState } from "react";
import "./all_webinar.scss";
import WebinarCard from "./WebinarCard";

export default function AllWebinar() {
  const [allWebinar, setAllWebinar] = useState([]);

  useEffect(() => {
    axios
      .get("/webinar/")
      .then((res) => {
        setAllWebinar(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="w-d">
      <div className="all-webinar-div">
        {allWebinar.map((webinar, index) => {
          return <WebinarCard key={index} webinar={webinar} />;
        })}
      </div>
    </div>
  );
}
