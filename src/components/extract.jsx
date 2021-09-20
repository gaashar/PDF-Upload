import React, { useState, useRef } from "react";
import CsvDownload from "react-json-to-csv";
import { DataTable } from "./dataTable";
import { EXTRACT_API } from "../constants";
import { formatData } from "../helper";

export const Extract = () => {
  const [inputFile, setInputFile] = useState(null);
  const [bankName, setBankName] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [extractedDataHeaders, setExtractedDataHeaders] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const handleExtract = () => {
    let file = inputFile;
    if (file) {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("bank", bankName);
      const requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
      };
      setError(false);
      setIsLoading(true);
      setIsFileSelected(false);
      fetch(EXTRACT_API, requestOptions)
        .then((response) => {
          if (response.ok) return response.text();
          else {
            setError(`ERROR:${response.status} ${response.statusText}`);
            throw new Error(response);
          }
        })
        .then((result) => {
          const { headers, output } = formatData(result);
          setIsLoading(false);
          setExtractedData(output);
          setExtractedDataHeaders(headers);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  };

  const handleClear = () => {
    setError(false);
    setIsFileSelected(false);
    setBankName("");
    inputRef.current.value = "";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div
        style={{ border: "1px solid Grey", width: "80%", marginLeft: "175px" }}
      >
        <div style={{ padding: "40px" }}>
          <label style={{ padding: "30px", fontSize: "larger" }}>
            Bank Name
          </label>
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
            ref={inputRef}
            style={{ fontSize: "initial", width: "500px" }}
            type="file"
            accept="application/pdf, application/vnd.ms-excel"
            onChange={(e) => {
              setInputFile(e.target.files[0]);
              setIsFileSelected(true);
            }}
          />
          <p>(upload .pdf file format as input)</p>
          <div>
            <button
              style={{
                marginLeft: "20px",
                margin: "50px",
                width: "100px",
                padding: "5px",
                fontWeight: "bold",
              }}
              disabled={!bankName || !inputFile}
              onClick={handleExtract}
            >
              EXTRACT
            </button>
            <button
              style={{
                marginLeft: "20px",
                margin: "50px",
                width: "100px",
                padding: "5px",
                fontWeight: "bold",
              }}
              onClick={handleClear}
              disabled={!bankName || !inputFile}
            >
              RESET
            </button>
          </div>
        </div>
        {isFileSelected && (
          <div style={{ color: "#3f51b5" }}>
            <p>Filename: {inputFile.name}</p>
            <p>Size in bytes: {inputFile.size}</p>
            <h4 style={{ paddingTop: "10px" }}>
              CLICK ON EXTRACT TO PROCESS YOUR FILE
            </h4>
          </div>
        )}
        {isLoading && (
          <div style={{ paddingTop: "10px", color: "#3f51b5" }}>
            <h4>EXTRACTION IN PROCESS... PLEASE WAIT</h4>
          </div>
        )}
        {error && (
          <div style={{ padding: "10px 0px", color: "red" }}>
            <h4>{error}</h4>
          </div>
        )}
      </div>
      {extractedData && (
        <div style={{ margin: "60px" }}>
          <CsvDownload
            data={extractedData}
            style={{
              border: "none",
              backgroundColor: "white",
              cursor: "pointer",
              color: "blue",
              fontSize: "18px",
              paddingLeft: "93%",
            }}
            fileName="extract.csv"
          >
            DOWNLOAD
          </CsvDownload>
          <DataTable data={extractedData} headersList={extractedDataHeaders} />
        </div>
      )}
    </div>
  );
};
