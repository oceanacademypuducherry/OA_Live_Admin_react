import React from "react";
import MCQ from "./MCQ";
import { useQuery } from "@tanstack/react-query";
import axios from "../../index";
import { useState } from "react";
import "./all_mcq.scss";

export default function AllMCQs() {
  const { data, isError, isFetching, isLoading, refetch } = useQuery(
    ["allquestion"],
    () => {
      return axios.get("/mcq/question/all").then((res) => res.data);
    }
  );
  const collection = useQuery(["allCollection"], () => {
    return axios.get("/mcq/get/collections").then((res) => {
      return res.data;
    });
  });
  const topics = useQuery(["allTopics"], () => {
    return axios.post("/mcq/question/topics", {}).then((res) => {
      console.log(res.data);
      return res.data;
    });
  });
  const [selected, setSelected] = useState({
    collection: "",
    topic: "",
  });

  function onChangeHandler(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setSelected({ ...selected, [name]: value });
  }

  return (
    <div className="all-q">
      {isLoading && <h1>Loading...</h1>}
      <select name="collection" onChange={onChangeHandler} className="drop">
        <option value="">All</option>
        {collection.data &&
          collection.data.map((col) => {
            return (
              <option key={col._id} value={col.languageName}>
                {col.languageName}
              </option>
            );
          })}
      </select>
      <select name="topic" onChange={onChangeHandler} className="drop">
        <option value="">All</option>
        {topics.data &&
          topics.data.map((top, index) => {
            return (
              <option key={index} value={top}>
                {top}
              </option>
            );
          })}
      </select>
      <div className="all-mcq-q">
        {data &&
          data.map((qus, index) => {
            console.log(qus);
            if (selected.collection === "" && selected.topic === "") {
              return <MCQ key={index} question={qus} reFetch={refetch} />;
            } else if (
              selected.collection === qus.collectionId.languageName &&
              selected.topic === ""
            ) {
              return <MCQ key={index} question={qus} reFetch={refetch} />;
            } else if (
              selected.topic === qus.topic &&
              selected.collection === ""
            ) {
              return <MCQ key={index} question={qus} reFetch={refetch} />;
            } else if (
              selected.collection === qus.collectionId.languageName &&
              selected.topic === qus.topic
            ) {
              return <MCQ key={index} question={qus} reFetch={refetch} />;
            }
          })}
      </div>
    </div>
  );
}
