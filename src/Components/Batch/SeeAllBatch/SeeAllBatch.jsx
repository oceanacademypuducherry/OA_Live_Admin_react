import axios from "../../../index";
import React, { useEffect, useState } from "react";
import BatchCard from "./BatchCard";
import "./see_all_batch.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../CommonFunctions/fetchData";

export default function SeeAllBatch() {
  const [allBatch, setAllBatch] = useState([]);
  const { data, isError, isLoading } = useQuery(["allbatch"], () =>
    fetchData({
      apiUrl: "batch/all",
      method: "POST",
      bodyData: { token: localStorage.getItem("a_token") },
    })
  );

  useEffect(() => {}, []);
  return (
    <div className="see-all-batch">
      {isError && <h1>Error</h1>}
      {isLoading && <h1>Loading</h1>}
      {data &&
        data.map((batch, index) => {
          return <BatchCard key={index} batch={batch} />;
        })}
    </div>
  );
}
