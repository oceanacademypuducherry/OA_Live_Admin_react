import React from "react";
import apiData from "./api.json";
import "./api.scss";
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import ReactJson from "@microlink/react-json-view";

export default function APIDocs() {
  const [selected, setSelected] = useState({ moduleIndex: 0, methodIndex: 0 });
  const [apiInfo, setApiInfo] = useState({
    body: "",
    url: "",
    method: "",
    title: "",
  });
  return (
    <div className="api">
      <div className="api-tabs-div">
        {apiData.item.map((item, moduleIndex) => {
          return (
            <div key={moduleIndex} className="section-api">
              <div
                className="module"
                onClick={() => {
                  if (selected.moduleIndex === moduleIndex + 1) {
                    setSelected({ ...selected, moduleIndex: 0 });
                    return;
                  }
                  setSelected({ ...selected, moduleIndex: moduleIndex + 1 });
                }}
              >
                <p>{item.name}</p>
                <span>
                  <AiFillCaretDown />
                </span>
              </div>
              <div
                className={`api-link ${
                  selected.moduleIndex === moduleIndex + 1 && "isOpen"
                }`}
                style={{
                  height:
                    selected.moduleIndex === moduleIndex + 1
                      ? item.item.length * (40 + 8) + 8
                      : 0,
                }}
              >
                {item.item.map((title, methodIndex) => {
                  return (
                    <div
                      key={methodIndex}
                      className={`api-title ${title.request.method}`}
                      onClick={() => {
                        console.log(title);
                        if (title.request.body === undefined) {
                          setApiInfo({
                            url: title.request.url.raw,
                            body: "",
                            method: title.request.method,
                            title: title.name,
                          });
                        } else {
                          setApiInfo({
                            url: title.request.url.raw,
                            body: title.request.body.raw,
                            method: title.request.method,
                            title: title.name,
                          });
                        }
                      }}
                    >
                      <div className="title">{title.name}</div>
                      <div className={`api-method ${title.request.method}`}>
                        {title.request.method}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="body-of-api">
        <h3>{apiInfo.title}</h3>
        <div className="url-bar-div">
          <div className={`method-btn ${apiInfo.method}`}>{apiInfo.method}</div>
          <p>{apiInfo.url}</p>
        </div>
        {apiInfo.body && (
          <div className="body-contents">
            <div className="body-lable">Body</div>

            <ReactJson
              src={JSON.parse(apiInfo.body)}
              enableClipboard={false}
              name="BodyData"
            />
          </div>
        )}

        {/* <pre>{apiInfo.body}</pre> */}
      </div>
    </div>
  );
}
