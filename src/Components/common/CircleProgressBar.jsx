import React, { useState } from "react";
import "./circle_progress.scss";
export default function CircleProgressBar({ percentage }) {
  return (
    <div className="percent" data-pct={(100 * percentage).toFixed(0)}>
      <svg height="140" width="140" viewBox="0 0 100 100">
        <circle
          className="p-bg"
          cx="50"
          cy="50"
          r="40"
          stroke="#ffffff10"
          strokeWidth="5"
          fill="transparent"
          strokeDasharray={`300 500`}
          strokeDashoffset="49"
        />
        <circle
          className="p-bg"
          cx="50"
          cy="50"
          r="40"
          stroke="#0E85AB"
          strokeWidth="5"
          fill="transparent"
          strokeDasharray={`${350 * percentage} 500`}
          strokeDashoffset="49"
        />
      </svg>
    </div>
  );
}
