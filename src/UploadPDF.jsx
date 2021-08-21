import React, { useState } from "react";
export const UploadPDF = () => {
  const [inputFile, setInputFile] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("File", inputFile);

    // Replace your API below and see the output response is success

    // fetch("<API_URL>", { method: "POST", body: formData })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     setIsFileSelected(false);
    //     setUploadSuccess(true);
    //     console.log("File Successfully Uploaded");
    //   })
    //   .then((err) => console.log(err));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "250px" }}>
      <label style={{ padding: "30px", fontSize: "larger" }}>
        Browse Files
      </label>
      <input
        style={{ fontSize: "initial", width: "500px" }}
        type="file"
        accept="application/pdf, application/vnd.ms-excel"
        onChange={(e) => {
          setInputFile(e.target.files[0]);
          setIsFileSelected(true);
          setUploadSuccess(false);
        }}
      />
      <button
        style={{ marginLeft: "20px", fontSize: "initial" }}
        onClick={handleUpload}
      >
        Upload
      </button>
      {isFileSelected && (
        <div>
          <p>Filename: {inputFile.name}</p>
          <p>Filetype: {inputFile.type}</p>
          <p>Size in bytes: {inputFile.size}</p>
          <p>
            lastModifiedDate: {inputFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      )}
      {uploadSuccess && (
        <div>
          <p>File Uploaded Successfully!</p>
        </div>
      )}
    </div>
  );
};
