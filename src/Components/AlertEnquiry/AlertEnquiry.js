import React from "react";
import "./alertEnquiry.scss";
import EnquiryCard from "./EnquiryCard";
import { useQuery } from "@tanstack/react-query";
import axios from "../../index";
import { calcLength } from "framer-motion";

export default function AlertEnquiry() {
  const fetchData = () => {
    return axios.get("/enquiry/all").then((res) => res.data);
  };
  const { data, isLoading, isError, isFetching, refetch } = useQuery(
    ["enquiry"],
    fetchData
  );

  return (
    <div className="enq-div">
      {isLoading && "Loading"}
      {!isLoading &&
        [...data].reverse().map((item, index) => {
          console.log(item);
          return <EnquiryCard key={index} enqData={item} refetch={refetch} />;
        })}
    </div>
  );
}
