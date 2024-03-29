import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

export default axios.create({
  baseURL: "https://us-central1-oceanlivereact.cloudfunctions.net/app/",
  // baseURL: "http://127.0.0.1:5001/oceanlivereact/us-central1/app/",
  // baseURL: "http://localhost:5000/",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
