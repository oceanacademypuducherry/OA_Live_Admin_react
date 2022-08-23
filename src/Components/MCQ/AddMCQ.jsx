import React from "react";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "../../index";
import MyDropdown from "../common/MyDropdown";
import Modal from "../common/Model";
import "./add_mcq.scss";

import AddMcqCollection from "./AddMcqCollection";
import { useEffect } from "react";
import CustomButton from "../common/CustomButton";
import { useLocation, useNavigate } from "react-router-dom";

// import axios from "axios";

const COUNT = ["a", "b", "c", "d", "e", "f", "g", "h"];
export default function AddMCQ() {
  let state = useLocation().state;
  const navigate = useNavigate();

  const [questionData, setQuestionData] = useState({
    collectionId: state ? state.collectionId._id : "",
    question: state ? state.question : "",
    options: state ? state.options : [],
    answer: state ? state.answer : "",
    topic: state ? state.topic : "Others",
    questionDescription: state ? state.questionDescription : "",
    answerDesription: state ? state.answerDesription : "",
    token: localStorage.getItem("a_token"),
    lableText: state ? state.collectionId.languageName : "Select",
  });

  const [isModelOpen, setIsModalOpen] = useState(false);

  const { data, refetch } = useQuery(["allCollection"], () => {
    return axios.get("/mcq/get/collections").then((res) => {
      return res.data;
    });
  });

  function onChangeHandler(e) {
    const { value, name } = e.target;
    if (name === "options") {
      setQuestionData({ ...questionData, options: value.split("\n") });
    } else {
      setQuestionData({ ...questionData, [name]: value });
    }
  }

  function selectCollection(value) {
    setQuestionData({ ...questionData, collectionId: value });
  }

  function resetFields() {
    setQuestionData({
      collectionId: "",
      question: "",
      options: [],
      answer: "",
      topic: "",
      questionDescription: "",
      answerDesription: "",
      lableText: "Select",
      token: localStorage.getItem("a_token"),
    });
    state = {};
    const txtArea = document.querySelectorAll("#txt-area");
    txtArea.forEach((txt) => {
      txt.value = "";
    });
  }

  function modelControll() {
    setIsModalOpen(!isModelOpen);
  }
  function addQuestion() {
    // console.log(questionData);
    // resetFields();
    axios
      .post("/mcq/question/add", questionData)
      .then((res) => {
        console.log(res.data);
        resetFields();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function updateMCQ(mcqId) {
    axios
      .post("/mcq/question/update", { ...questionData, mcqId: mcqId })
      .then((res) => {
        console.log(res.data);
        navigate(-1);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    refetch();
  }, [isModelOpen]);
  return (
    <div className="question-div">
      <div className="top-inp">
        <div className="text-inp">
          <input
            type="text"
            placeholder="Question"
            name="question"
            value={questionData.question}
            onChange={onChangeHandler}
          />
        </div>

        <div className="text-inp">
          <input
            type="text"
            placeholder="Topic"
            name="topic"
            value={questionData.topic}
            onChange={onChangeHandler}
          />
        </div>

        <MyDropdown
          lableText={questionData.lableText}
          title={data ? data.map((item) => item.languageName) : []}
          value={data ? data.map((item) => item._id) : []}
          staticValue={"Add Collection"}
          staticValueClick={() => {
            setIsModalOpen(true);
          }}
          onChange={selectCollection}
        />
      </div>

      {questionData.options !== [] && (
        <div className="option-div">
          {questionData.options.map((option, index) => {
            return (
              <div
                className={`option ${questionData.answer === option && "ans"}`}
                style={{ color: "white" }}
                key={index}
                onClick={() => {
                  setQuestionData({ ...questionData, answer: option });
                }}
              >
                <span> {COUNT[index % COUNT.length]}. </span>

                <span> {option}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* <span>{questionData.collectionId}</span> */}
      <div className=" text-area">
        <textarea
          name="options"
          placeholder="Options"
          onChange={onChangeHandler}
          id="txt-area"
          defaultValue={questionData.options.join(`\n`)}
        ></textarea>
      </div>
      <div className=" text-area">
        <textarea
          name="questionDescription"
          placeholder="QuestionDescription"
          onChange={onChangeHandler}
          defaultValue={questionData.questionDescription}
          id="txt-area"
        >
          {/* {questionData.questionDescription} */}
        </textarea>
      </div>
      <div className=" text-area">
        <textarea
          name="answerDesription"
          placeholder="AnswerDesription"
          onChange={onChangeHandler}
          id="txt-area"
          defaultValue={questionData.answerDesription}
        >
          {/* {questionData.answerDesription} */}
        </textarea>
      </div>

      <div className="btn">
        {state ? (
          <CustomButton onClick={updateMCQ.bind(this, state._id)}>
            Update Question
          </CustomButton>
        ) : (
          <CustomButton onClick={addQuestion}>Add Question</CustomButton>
        )}
      </div>

      {isModelOpen && (
        <Modal>
          <AddMcqCollection setIsModalOpen={modelControll} />
        </Modal>
      )}
    </div>
  );
}
