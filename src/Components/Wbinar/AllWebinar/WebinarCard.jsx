import React from "react";
import "./webinar_card.scss";
import { FaVideo } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
export default function WebinarCard({ webinar }) {
  const navigate = useNavigate();

  const datime = new Date(webinar.startAt);
  console.log(webinar.isComplete);
  const date = {
    date: datime.getDate(),
    month: datime.getMonth(),
    hours: datime.getHours() > 11 ? datime.getHours() % 12 : datime.getHours(),
    minute: datime.getMinutes(),
    day: datime.getHours() > 11 ? "PM" : "AM",
  };
  return (
    <div
      className="webinar-card"
      onClick={() => {
        navigate("/webinar/info", { state: { webinar: webinar } });
      }}
    >
      <div
        className="card-leading"
        style={{ background: webinar.isComplete ? "green" : "#0978b6" }}
      >
        <div className="date">{date.date}</div>
        <div className="day">{MONTH[date.month]}</div>
      </div>
      <div className="card-body">
        <div className="top-c">
          <div className="title-c">
            <div className="title">{webinar.title}</div>
            <div className="mentor">{webinar.mentor.mentorName}</div>
          </div>
          <div className="icon-c">
            <div className="ico">
              {webinar.isComplete ? (
                <MdDone style={{ color: "green", fontSize: 35 }} />
              ) : (
                <FaVideo />
              )}
            </div>
          </div>
        </div>
        <div className="bottom-c">
          <div className="time">
            {date.hours}:{date.minute} {date.day}
          </div>
          <div className="price">
            {webinar.price === 0 ? "Free" : webinar.price}
          </div>
        </div>
      </div>
    </div>
  );
}
