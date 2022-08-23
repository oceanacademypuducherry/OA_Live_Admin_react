import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../index";
import "./mcq_collection.scss";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";

export default function MCQCollections() {
  const { data, isFetching, refetch } = useQuery(["allCollection"], () => {
    return axios.get("/mcq/get/collections").then((res) => {
      return res.data;
    });
  });

  function deleteCollection(collectionId) {
    axios
      .post("mcq/delete/collection", { collectionId: collectionId })
      .then((res) => refetch())
      .catch((e) => console.log(e));
  }

  return (
    <div className="collections-div">
      {!isFetching ? (
        data.map((collection) => {
          return (
            <div key={collection._id} className="img-div">
              <MdDelete
                className="del-ico"
                onClick={() => {
                  console.log(collection._id);
                  deleteCollection(collection._id);
                }}
              />
              <img
                src={collection.languageImage}
                alt={collection.languageName}
              />
            </div>
          );
        })
      ) : (
        <h1>Fetching</h1>
      )}
    </div>
  );
}
