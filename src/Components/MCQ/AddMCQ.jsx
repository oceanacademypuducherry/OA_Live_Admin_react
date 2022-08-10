import React from "react";
import { useState } from "react";
import TextInput from "../common/TextInput";
import { useQuery } from "@tanstack/react-query";
import axios from "../../index";
import MyDropdown from "../common/MyDropdown";
// import axios from "axios";

export default function AddMCQ() {
  const [value, setValue] = useState("Select");
  const { data, isLoading, isError } = useQuery(["allCollection"], () => {
    console.log("test");
    return axios.get("/mcq/get/collections").then((res) => res.data);
  });
  function onChange(value) {
    setValue(value);
  }
  return (
    <div>
      <MyDropdown
        title={data ? data.map((item) => item.languageName) : []}
        value={data ? data.map((item) => item._id) : []}
        staticValue={"Add Collection"}
        staticValueClick={() => {
          alert("add collection");
        }}
        onChange={onChange}
      />
      <h1>{value}</h1>
    </div>
  );
}
