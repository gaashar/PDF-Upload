import React, { useState, useRef } from "react";

export const Extract = () => {
  const [inputFile, setInputFile] = useState(null);
  const [bankName, setBankName] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [downloadableFile, setDownloadableFile] = useState(null);
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
      setIsLoading(true);
      setIsFileSelected(false);
      fetch("http://18.135.170.159:8081/extract", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          const json = JSON.stringify(result);
          const blob = new Blob([json], { type: "application/json" });
          return URL.createObjectURL(blob);
        })
        .then((href) => {
          setDownloadableFile(href);
          setIsFileSelected(false);
          setIsLoading(false);
          setBankName("");
          inputRef.current.value = "";
        })
        .catch((err) => setError(err));
    }
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
          <button
            style={{
              marginLeft: "20px",
              margin: "50px",
              width: "100px",
              padding: "5px",
              fontWeight: "bold",
            }}
            onClick={handleExtract}
          >
            EXTRACT
          </button>
        </div>
        {isFileSelected && (
          <div>
            <p>Filename: {inputFile.name}</p>
            <p>Size in bytes: {inputFile.size}</p>
            <h4 style={{ paddingTop: "10px" }}>
              CLICK ON EXTRACT TO PROCESS YOUR FILE
            </h4>
          </div>
        )}
        {isLoading && (
          <div style={{ paddingTop: "10px" }}>
            <h4>EXTRACTION IN PROCESS... PLEASE WAIT</h4>
          </div>
        )}
        {downloadableFile && (
          <div style={{ padding: "10px 0px" }}>
            <h4>
              FILE EXTRACTED SUCCESSFULLY! CLICK ON THE BELOW LINK TO VIEW
            </h4>
            <a href={downloadableFile} target="_blank">
              EXTRACTED DATA
            </a>
          </div>
        )}
        {error && (
          <div style={{ paddingTop: "10px" }}>
            <h4>SOMETHING WENT WRONG. PLEASE TRY AFTER SOMETIME.</h4>
          </div>
        )}
      </div>
    </div>
  );
};
