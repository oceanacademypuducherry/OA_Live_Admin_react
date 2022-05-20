import React from "react";
import Tabs from "../common/Tabs";
import "./sidebar.scss";
import { FaBook } from "react-icons/fa";
import { useLocation } from "react-router-dom";

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
      <Tabs
        navigateTo={"/all/offlinecourse"}
        icon={<FaBook />}
        tabName={"All Offline Course"}
        activeTab={pathName === "/all/offlinecourse" && "active-tab"}
      />
      <Tabs
        navigateTo={"/add/course"}
        icon={<FaBook />}
        tabName={"Add Course"}
        activeTab={
          (pathName === "/add/course" || pathName.includes("/add/course/")) &&
          "active-tab"
        }
      />
      <Tabs
        navigateTo={"/add/to/batch"}
        icon={<FaBook />}
        tabName={"Un Assign Batch"}
        activeTab={
          (pathName === "/add/to/batch" ||
            pathName === "/add/to/batch/assign") &&
          "active-tab"
        }
      />
      <Tabs
        navigateTo={"/all/batch"}
        icon={<FaBook />}
        tabName={"See All Batches"}
        activeTab={pathName === "/all/batch" && "active-tab"}
      />
    </div>
  );
}
