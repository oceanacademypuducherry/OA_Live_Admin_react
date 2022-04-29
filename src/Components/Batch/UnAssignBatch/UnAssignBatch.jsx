import React, { useState, useEffect } from "react";
import UnAssignBatchCard from "./UnAssignBatchCard";
import axios from "../../../index";

export default function UnAssignBatch() {
  const token = localStorage.getItem("token");
  const [purchaseData, setPurchaseData] = useState([
    {
      availableTrainer: [],
      users: "",
      batchTime: "",
      batchType: "",
      course: {},
    },
  ]);

  function getPurchaseData() {
    axios
      .post("/batch/options", { token: token })
      .then((res) => {
        console.log(res.data);
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
      {purchaseData.map((item, index) => {
        return <UnAssignBatchCard key={index} purchaseDataInfo={item} />;
      })}
    </div>
  );
}
