import React from "react";
import "./circle_progress.scss";
export default function CircleProgressBar({ percentage }) {
  return (
    <div
      className="progres-div"
      progress-value={percentage}
      style={{
        background: `conic-gradient(
          #057c31 0deg,
          #057c31 ${(percentage * 360) / 100}deg,
          #060e15 0deg,
          #060e15 0deg
        )`,
      }}
    ></div>
  );
}
