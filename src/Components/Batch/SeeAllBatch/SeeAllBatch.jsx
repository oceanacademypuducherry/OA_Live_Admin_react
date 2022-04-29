import React from "react";
import BatchCard from "./BatchCard";
import "./see_all_batch.scss";

export default function SeeAllBatch() {
  return (
    <div className="see-all-batch">
      <BatchCard />
      <BatchCard />
      <BatchCard />
      <BatchCard />
    </div>
  );
}
