import React from "react";
import "./mcq.scss";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "../../index";
import { useNavigate } from "react-router-dom";

export default function MCQ({ question, reFetch }) {
  const navigate = useNavigate();

  function editMcq(questionInfo) {
    navigate("/add/mcq", { state: questionInfo });
  }

  function deleteMcq(mcqId) {
    axios
      .post("/mcq/question/delete", { mcqId: mcqId })
      .then((res) => {
        console.log(res.data);
        reFetch();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <div className="q-div">
      <FaEdit className="ico edit" onClick={editMcq.bind(this, question)} />
      <FaTrash
        className="ico del"
        onClick={deleteMcq.bind(this, question._id)}
      />
      <div className="question">{question && question.question}</div>
      <pre className="qus dec">
        <span>{question.questionDescription}</span>
      </pre>
      <div className="options">
        {question.options.map((option, index) => {
          return (
            <div
              key={index}
              className={`option ${option === question.answer && "o-ans"}`}
            >
              {option}
            </div>
          );
        })}
      </div>
      <pre className="ans dec">
        <span>{question.answerDesription}</span>
      </pre>
    </div>
  );
}
