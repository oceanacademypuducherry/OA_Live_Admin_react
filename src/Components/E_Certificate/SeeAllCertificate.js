import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../index";
import CertificateCard from "./CertificateCard";

export default function SeeAllCertificate() {
  const [runUseEffect, setRunUseEffect] = useState(true);
  const fetchData = () => {
    return axios
      .post("/certificate/get/all", { token: localStorage.getItem("a_token") })
      .then((res) => res.data);
  };
  const { data, isLoading, isError, isFetching, refetch } = useQuery(
    ["allCertificate"],
    fetchData
  );

  return (
    <div className="cert-view">
      {isLoading && <h1>Loading...</h1>}
      <div className="cert-container">
        {data &&
          data.map((cert, index) => {
            return (
              <CertificateCard
                key={index}
                studentId={cert.studentId}
                certificateUrl={cert.certificateUrl}
                onDelete={refetch}
                data={cert}
              />
            );
          })}
      </div>
    </div>
  );
}
