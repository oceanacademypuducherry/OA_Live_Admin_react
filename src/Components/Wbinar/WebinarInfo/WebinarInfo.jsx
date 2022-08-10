import axios from "../../../index";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./webinar_info.scss";

export default function WebinarInfo() {
  const navigate = useNavigate();
  const state = useLocation().state;
  const webinar = state.webinar;
  const [webinarUsers, setWebinarUses] = useState([]);

  function getWebinarUser() {
    axios
      .get("/webinar/users/" + state.webinar._id)
      .then((res) => {
        setWebinarUses(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function makeCompleted(isCompleted) {
    axios
      .post("/webinar/completed/" + state.webinar._id, {
        isComplete: isCompleted,
      })
      .then((res) => {
        console.log("meke completed successfully...");
        navigate("/all/webinar");
        // setWebinarUses(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function deleteWbinar() {
    console.log(webinar._id);

    axios
      .post("/webinar/delete/", {
        webinarId: webinar._id,
        token: localStorage.a_token,
      })
      .then((res) => {
        console.log("meke delete successfully...");
        navigate("/all/webinar");
        // setWebinarUses(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getWebinarUser();
  }, []);

  return (
    <div className="webinar-info">
      <div className="content">
        <div className="infos">
          <div className="banner-img">
            <img src={webinar.bannerImage} alt="" />
          </div>
          <div className="title">{webinar.title}</div>
          <div className="description">{webinar.subtitle}</div>
        </div>
        <div className="btns">
          <div
            className="complete-btn"
            style={{
              background: state.webinar.isComplete ? "green" : "#0b91dd",
            }}
            onClick={() => {
              makeCompleted(!state.webinar.isComplete);
            }}
          >
            {state.webinar.isComplete ? "Make Available" : "Make Completed"}
          </div>
          <button
            className="complete-btn"
            style={{ background: "red" }}
            onClick={deleteWbinar}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="user-info-div">
        {webinarUsers.map((user, index) => {
          return (
            <div key={index} className="user-info">
              <div className="u-icon">
                <span>{user.username[0].toUpperCase()}</span>
              </div>

              <div key={index} className="w-user-info">
                <div className="name">{user.username}</div>
                <div className="sub email">{user.email}</div>
                <div className="sub number">{user.mobileNumber}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
