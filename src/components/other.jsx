import React, { useState } from "react";
import { ADD_COMMON_KEY_API, ADD_REMOVE_WORD_API } from "../constants";

export const Other = () => {
  const [inputWord, setInputWord] = useState("");
  const [commonKeyFile, setCommonKeyFile] = useState(null);
  const [dataReady, setDataReady] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ word: inputWord });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(ADD_REMOVE_WORD_API, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setIsLoading(false);
        setDataReady(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  const handleCommonKey = () => {
    let file = commonKeyFile;
    if (file) {
      const formData = new FormData();
      formData.append("file", file, file.name);
      const requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
      };
      fetch(ADD_COMMON_KEY_API, requestOptions)
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
      <div
        style={{ border: "1px solid Grey", width: "80%", marginLeft: "175px" }}
      >
        <div>
          <label style={{ padding: "30px", fontSize: "larger" }}>
            Enter word
          </label>
          <input
            style={{ fontSize: "initial", width: "500px" }}
            type="text"
            onChange={(e) => {
              setInputWord(e.target.value);
            }}
            value={inputWord}
          />
          <button
            style={{
              margin: "50px 30px 50px 50px",
              width: "150px",
              padding: "5px",
              fontWeight: "bold",
            }}
            onClick={() => {
              setIsLoading(true);
              setDataReady(false);
              handleAdd();
            }}
          >
            ADD/REMOVE
          </button>
        </div>
        <div>
          <label style={{ padding: "30px", fontSize: "larger" }}>
            Browse Files
          </label>
          <input
            style={{ fontSize: "initial", width: "500px" }}
            type="file"
            onChange={(e) => {
              setCommonKeyFile(e.target.files[0]);
            }}
          />
          <button
            style={{
              margin: "50px 30px 50px 50px",
              width: "150px",
              padding: "5px",
              fontWeight: "bold",
            }}
            onClick={() => {
              setIsLoading(true);
              setDataReady(false);
              handleCommonKey();
            }}
          >
            ADD
          </button>
        </div>
        {dataReady && (
          <div style={{ paddingTop: "10px", color: "#3f51b5" }}>
            <h4>DATA PROCESS SUCCESSFUL!</h4>
          </div>
        )}
        {isLoading && (
          <div style={{ paddingTop: "10px", color: "#3f51b5" }}>
            <h4>LOADING... PLEASE WAIT</h4>
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
