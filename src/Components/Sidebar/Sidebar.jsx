import React from "react";
import Tabs from "../common/Tabs";
import "./sidebar.scss";
import { FaBook } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { navList } from "./navList";

export default function Sidebar() {
  const location = useLocation();
  let pathName = location.pathname;

  return (
    <div className="sidebar-div">
      <Tabs
        navigateTo={"/all/course"}
        icon={<FaBook />}
        tabName={"See All Course"}
        activeTab={
          (pathName === "/all/course" || pathName === "/") && "active-tab"
        }
      />
      {navList.map((tab, index) => {
        return (
          <Tabs
            key={index}
            navigateTo={tab.url}
            icon={<FaBook />}
            tabName={tab.title}
            activeTab={pathName === tab.url && "active-tab"}
          />
        );
      })}
      {/* <Tabs
        navigateTo={"/all/offlinecourse"}
        icon={<FaBook />}
        tabName={"All Offline Course"}
        activeTab={pathName === "/all/offlinecourse" && "active-tab"}
      />  <Tabs
        navigateTo={"/add/course"}
        icon={<FaBook />}
        tabName={"Add Course"}
        activeTab={
          (pathName === "/add/course" || pathName.includes("/add/course/")) &&
          "active-tab"
        }
      /><Tabs
        navigateTo={"/add/to/batch"}
        icon={<FaBook />}
        tabName={"Un Assign Batch"}
        activeTab={
          (pathName === "/add/to/batch" ||
            pathName === "/add/to/batch/assign") &&
          "active-tab"
        }
      /> <Tabs
        navigateTo={"/all/batch"}
        icon={<FaBook />}
        tabName={"See All Batches"}
        activeTab={pathName === "/all/batch" && "active-tab"}
      />  <Tabs
        navigateTo={"/add/mentor"}
        icon={<FaBook />}
        tabName={"Add Mentor"}
        activeTab={pathName === "/add/mentor" && "active-tab"}
      />  <Tabs
        navigateTo={"/add/webinar"}
        icon={<FaBook />}
        tabName={"Add Webinar"}
        activeTab={pathName === "/add/webinar" && "active-tab"}
      /> <Tabs
        navigateTo={"/all/webinar"}
        icon={<FaBook />}
        tabName={"All Webinar"}
        activeTab={pathName === "/all/webinar" && "active-tab"}
      />  <Tabs
        navigateTo={"/offline/course/downloaded/user"}
        icon={<FaBook />}
        tabName={"Downloaded User"}
        activeTab={
          pathName === "/offline/course/downloaded/user" && "active-tab"
        }
      />  <Tabs
        navigateTo={"/mcq/collections"}
        icon={<FaBook />}
        tabName={"All Collection MCQ"}
        activeTab={pathName === "/mcq/collections" && "active-tab"}
      />  <Tabs
        navigateTo={"/add/mcq"}
        icon={<FaBook />}
        tabName={"Add MCQ"}
        activeTab={pathName === "/add/mcq" && "active-tab"}
      /> */}
    </div>
  );
}
