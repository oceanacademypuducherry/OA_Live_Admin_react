import React from "react";
import CustomButton from "../common/CustomButton";
import { IoMdClose } from "react-icons/io";
import TextInput from "../common/TextInput";
import { useState } from "react";
import axios from "../../index";
import { firebaseFileUpload } from "../CommonFunctions/fileUpload";

import "./add_mcq_collection.scss";

export default function AddMcqCollection({ setIsModalOpen }) {
  const [collectionData, setCollectionData] = useState({
    bgColor: "#FBF8E1",
    languageImage: "",
    languageName: "",
    token: localStorage.getItem("a_token"),
  });

  function imgUpload() {
    const imagePicker = document.getElementById("image-piker");
    imagePicker.type = "file";
    imagePicker.click();
  }

  function setFile(url) {
    setCollectionData({ ...collectionData, languageImage: url });
  }
  function onChangeHandler(e) {
    const { value, name, type, files } = e.target;

    if (name === "bgColor") {
      setCollectionData({ ...collectionData, bgColor: value });
    }
    if (type === "file") {
      firebaseFileUpload({
        file: files[0],
        dbPath: "MCQ_Collection/image",
        setState: setFile,
      });
    }
    if (name === "languageName") {
      setCollectionData({ ...collectionData, languageName: value });
    }
  }

  async function syllabusUpload(pickedFile) {
    var reader = new FileReader();
    reader.addEventListener("load", () => {
      setCollectionData({ ...collectionData, languageImage: reader.result });
    });
    if (pickedFile) {
      reader.readAsDataURL(pickedFile);
    }
  }
  function addCollection() {
    // console.log(collectionData);
    axios
      .post("/mcq/add/collection", collectionData)
      .then((res) => {
        setIsModalOpen();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="add-collection-div">
      <IoMdClose className="ico" onClick={setIsModalOpen} />

      <div className="img-div">
        <div className="color-div">
          <input
            type="color"
            className="colorPicker"
            name="bgColor"
            value={collectionData.bgColor}
            onChange={onChangeHandler}
          />
        </div>

        <img
          src={collectionData.languageImage}
          alt="languageimage"
          onClick={imgUpload}
          id="c-img"
        />

        <input
          type="hidden"
          id="image-piker"
          style={{ display: "none" }}
          name="languageImage"
          onChange={onChangeHandler}
        />
      </div>

      <TextInput
        className={"modal-inp"}
        name="languageName"
        value={collectionData.languageName}
        onchange={onChangeHandler}
      />
      <CustomButton style={{ width: 300 }} onClick={addCollection}>
        Add Collection
      </CustomButton>
    </div>
  );
}
