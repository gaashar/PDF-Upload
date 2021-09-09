import React, { useState } from "react";

export const Train = () => {
  const [trainingFile, setTrainingFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [dataReady, setDataReady] = useState(false);

  const handleButtonClick = (action) => {
    let output;
    if (output) setDataReady(true);
    else setDataReady(false);
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
          onClick={() => handleButtonClick("train")}
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
          onClick={() => handleButtonClick("clear")}
        >
          CLEAR
        </button>
        {dataReady && (
          <div style={{ paddingTop: "10px" }}>
            <h4>Data Training Successful!</h4>
          </div>
        )}
      </div>
    </div>
  );
};
