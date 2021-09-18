import React, { useState } from "react";
import { CLEAN_DATA_API, TRAIN_API } from "../constants";

export const Train = () => {
  const [trainingFile, setTrainingFile] = useState(null);
  const [dataReady, setDataReady] = useState(false);
  const [action, setAction] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = (inputAction) => {
    let api, requestOptions;
    if (inputAction === "TRAIN") {
      api = TRAIN_API;
      let file = trainingFile;
      if (file) {
        const formData = new FormData();
        formData.append("file", file, file.name);
        requestOptions = {
          method: "POST",
          body: formData,
          redirect: "follow",
        };
      }
    } else if (inputAction === "CLEAR") {
      api = CLEAN_DATA_API;
      requestOptions = {
        method: "POST",
        redirect: "follow",
      };
    }
    setIsLoading(true);
    fetch(api, requestOptions)
      .then((response) => {
        if (response.ok) response.text();
        else {
          setError(`ERROR:${response.status} ${response.statusText}`);
          throw new Error(response);
        }
      })
      .then((result) => {
        setIsLoading(false);
        setDataReady(true);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <div
        style={{ border: "1px solid Grey", width: "80%", marginLeft: "175px" }}
      >
        <label style={{ padding: "30px", fontSize: "larger" }}>
          Browse Files
        </label>
        <input
          style={{ fontSize: "initial", width: "500px", paddingTop: "50px" }}
          type="file"
          accept=".csv"
          onChange={(e) => {
            setTrainingFile(e.target.files[0]);
          }}
        />
        <p>(upload .csv file format as input)</p>
        <button
          style={{
            margin: "50px",
            width: "100px",
            padding: "5px",
            fontWeight: "bold",
          }}
          onClick={() => {
            setAction("TRAIN");
            setDataReady(false);
            handleButtonClick("TRAIN");
          }}
        >
          TRAIN
        </button>
        <button
          style={{
            margin: "50px",
            width: "100px",
            padding: "5px",
            fontWeight: "bold",
          }}
          onClick={() => {
            setAction("CLEAR");
            setDataReady(false);
            handleButtonClick("CLEAR");
          }}
        >
          CLEAR
        </button>
        {dataReady && (
          <div style={{ paddingTop: "10px", color: "#3f51b5" }}>
            <h4>DATA {action}ING SUCCESSFUL!</h4>
          </div>
        )}
        {isLoading && (
          <div style={{ paddingTop: "10px", color: "#3f51b5" }}>
            <h4>DATA {action}ING IN PROCESS... PLEASE WAIT</h4>
          </div>
        )}
        {error && (
          <div style={{ padding: "10px 0px", color: "red" }}>
            <h4>{error}</h4>
          </div>
        )}
      </div>
    </div>
  );
};
