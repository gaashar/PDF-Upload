import React, { useState } from "react";
import fetchAPIResults from "./api_calls";
import CsvDownload from "react-json-to-csv";
import data from "./data.json";

export const UploadPDF = () => {
  const [extractFile, setExtractFile] = useState("");
  const [trainingFile, setTrainingFile] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [bankName, setBankName] = useState("");
  const [dataExtracted, setDataExtracted] = useState("");
  const [dataReady, setDataReady] = useState(false);
  const [error, setError] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("File", extractFile);

    // API call to extract the uploaded pdf
    let extractedContent = fetchAPIResults("extract", {
      file: formData,
      bank: bankName,
    });

    setDataExtracted(extractedContent);
    setIsFileSelected(false);
    setUploadSuccess(true);
    setBankName("");
  };

  const mockData = data;

  const handleButtonClick = (action) => {
    const formData = new FormData();
    formData.append("File", trainingFile);
    let output;
    if (action === "train") {
      output = fetchAPIResults(action, {
        file: formData,
      });
    } else {
      output = fetchAPIResults(action);
    }
    if (output) setDataReady(true);
    else setDataReady(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h3>OCR Extract</h3>
      <div style={{ padding: "40px" }}>
        <label style={{ padding: "30px", fontSize: "larger" }}>Bank Name</label>
        <input
          style={{ fontSize: "initial", width: "500px" }}
          type="text"
          onChange={(e) => {
            setBankName(e.target.value);
          }}
          value={bankName}
        />
      </div>
      <div>
        <label style={{ padding: "30px", fontSize: "larger" }}>
          Browse Files
        </label>
        <input
          style={{ fontSize: "initial", width: "500px" }}
          type="file"
          accept="application/pdf, application/vnd.ms-excel"
          onChange={(e) => {
            setExtractFile(e.target.files[0]);
            setIsFileSelected(true);
            setUploadSuccess(false);
          }}
        />
        <CsvDownload
          style={{
            marginLeft: "20px",
            margin: "50px",
            width: "100px",
            padding: "5px",
            fontWeight: "bold",
          }}
          // onClick={handleUpload}
          data={mockData.results}
        >
          EXTRACT
        </CsvDownload>
      </div>
      {isFileSelected && (
        <div>
          <p>Filename: {extractFile.name}</p>
          <p>Size in bytes: {extractFile.size}</p>
          <h4 style={{ paddingTop: "10px" }}>
            CLICK ON UPLOAD TO PROCESS YOUR FILE
          </h4>
        </div>
      )}
      {uploadSuccess && (
        <div style={{ paddingTop: "10px" }}>
          <h4>FILE UPLOADED SUCCESSFULLY!</h4>
        </div>
      )}
      {error && (
        <div style={{ paddingTop: "10px" }}>
          <h4>SOMETHING WENT WRONG. PLEASE TRY AFTER SOMETIME.</h4>
        </div>
      )}
      <hr style={{ margin: "40px 150px" }}></hr>
      <h3>Train Data</h3>
      <div
        style={{ border: "1px solid Grey", width: "80%", marginLeft: "175px" }}
      >
        <label style={{ padding: "30px", fontSize: "larger" }}>
          Browse Files
        </label>
        <input
          style={{ fontSize: "initial", width: "500px" }}
          type="file"
          // accept="application/csv, application/vnd.ms-excel"
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
