import React from "react";
import Tabs from "../common/Tabs";
import "./sidebar.scss";
import { FaBook } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const pathName = useLocation().pathname;

  return (
    <div className="sidebar-div">
      <Tabs
        navigateTo={"/add/to/batch"}
        icon={<FaBook />}
        tabName={"Un Assign Batch"}
        activeTab={
          (pathName === "/add/to/batch" ||
            pathName === "/add/to/batch/assign" ||
            pathName === "/") &&
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
