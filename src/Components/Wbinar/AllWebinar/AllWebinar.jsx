import axios from "../../../index";
import React, { useEffect, useState } from "react";
import "./all_webinar.scss";
import WebinarCard from "./WebinarCard";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../CommonFunctions/fetchData";

export default function AllWebinar() {
  const { data, isError, isLoading } = useQuery(["allwebinar"], () =>
    fetchData({
      apiUrl: "/webinar/",
      method: "GET",
    })
  );

  return (
    <div className="w-d">
      <div className="all-webinar-div">
        {isError && <h1>Error</h1>}
        {isLoading && <h1>Loading</h1>}
        {data &&
          data.map((webinar, index) => {
            return <WebinarCard key={index} webinar={webinar} />;
          })}
      </div>
    </div>
  );
}
