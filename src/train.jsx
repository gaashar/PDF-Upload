import React, { useState } from "react";
import { CLEAN_DATA_API, TRAIN_API } from "./constants";

export const Train = () => {
  const [trainingFile, setTrainingFile] = useState(null);
  const [dataReady, setDataReady] = useState(false);
  const [action, setAction] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = (inputAction) => {
    if (inputAction === "TRAIN") {
      let file = trainingFile;
      if (file) {
        const formData = new FormData();
        formData.append("file", file, file.name);
        const requestOptions = {
          method: "POST",
          body: formData,
          redirect: "follow",
        };
        setIsLoading(true);
        fetch(TRAIN_API, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            setIsLoading(false);
            setDataReady(true);
          })
          .catch((err) => {
            setIsLoading(false);
            setError(err);
          });
      }
    } else if (inputAction === "CLEAR") {
      setIsLoading(true);
      fetch(CLEAN_DATA_API, { method: "POST", redirect: "follow" })
        .then((response) => response.text())
        .then((result) => {
          setIsLoading(false);
          setDataReady(true);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }
  };
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {/* <h3>Train Data</h3> */}
      <div
        style={{ border: "1px solid Grey", width: "80%", marginLeft: "175px" }}
      >
        <label style={{ padding: "30px", fontSize: "larger" }}>
          Browse Files
        </label>
        <input
          style={{ fontSize: "initial", width: "500px" }}
          type="file"
          onChange={(e) => {
            setTrainingFile(e.target.files[0]);
          }}
        />
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
          <div style={{ paddingTop: "10px", color: "red" }}>
            <h4>SOMETHING WENT WRONG. PLEASE TRY AFTER SOMETIME.</h4>
          </div>
        )}
      </div>
    </div>
  );
};
