import React from "react";
import "./offline_course_downloaded_user.scss";
import { AiFillDelete } from "react-icons/ai";
import axios from "../../index";

var ML = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var MS = [
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
export default function DownloadedCourseCard({ user, deleteUser }) {
  const downlodedDate = new Date(user.date);
  const date = {
    month: ML[downlodedDate.getMonth()],
    date:
      downlodedDate.getDate() < 10
        ? "0" + downlodedDate.getDate()
        : downlodedDate.getDate(),
    year: downlodedDate.getFullYear(),
  };

  // function deleteUser() {
  //   console.log(user._id);
  //   axios
  //     .post("/downloaded/course/delete/user/", { userId: user._id })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  return (
    <div className="dcc-div">
      <div className="ico-trash" onClick={deleteUser.bind(this, user)}>
        <AiFillDelete />
      </div>
      <div className="caption">{user.courseId}</div>
      <div className="field">
        {/* <div className="property field-data">Name</div> */}
        <div className="value field-data">{user.name}</div>
      </div>
      <div className="field">
        {/* <div className="property field-data">Mobile</div> */}
        <div className="value field-data">{user.mobileNumber}</div>
      </div>
      <div className="field">
        {/* <div className="property field-data">Email</div> */}
        <div className="value field-data">{user.email}</div>
      </div>

      <div className="field">
        {/* <div className="property field-data">Date</div> */}
        <div className="value field-data">{`${date.date}-${date.month}-${date.year}`}</div>
      </div>
    </div>
  );
}
