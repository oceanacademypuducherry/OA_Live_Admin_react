import React, { useState, useEffect } from "react";
import UnAssignBatchCard from "./UnAssignBatchCard";
import axios from "../../../index";
// import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function UnAssignBatch() {
  const token = localStorage.getItem("a_token");
  const [purchaseData, setPurchaseData] = useState(null);

  const fetchData = () => {
    console.log("geting unassign batch");
    return axios
      .post("/batch/options", { token: token })
      .then((res) => res.data);
  };
  const { isLoading, error, data, isFetching } = useQuery(
    ["repoData"],
    fetchData
  );

  function getPurchaseData() {
    axios
      .post("/batch/options", { token: token })
      .then((res) => {
        setPurchaseData(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  useEffect(() => {
    getPurchaseData();
  }, []);
  return (
    <div className="un-assign-batch">
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>somthing went wrong...</h2>}
      {/* purchaseData to data */}
      {data &&
        data.map((item, index) => {
          return <UnAssignBatchCard key={index} purchaseDataInfo={item} />;
        })}
      {isFetching && <h1>fetching..............</h1>}
    </div>
  );
}
