import axios from "../../../index";
import React, { useEffect, useState } from "react";
import BatchCard from "./BatchCard";
import "./see_all_batch.scss";

export default function SeeAllBatch() {
  const [allBatch, setAllBatch] = useState([]);

  function getAllBatch() {
    axios
      .post("batch/all", { token: localStorage.getItem("token") })
      .then((res) => {
        setAllBatch(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getAllBatch();
  }, []);
  return (
    <div className="see-all-batch">
      {allBatch.map((batch, index) => {
        return <BatchCard key={index} batch={batch} />;
      })}
    </div>
  );
}
