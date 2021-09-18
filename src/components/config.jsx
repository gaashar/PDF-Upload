import React, { useState } from "react";
import { ADD_COMMON_KEY_API, ADD_REMOVE_WORD_API } from "../constants";

export const Config = () => {
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
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <div
        style={{ border: "1px solid Grey", width: "80%", marginLeft: "175px" }}
      >
        <div style={{ height: "100px" }}>
          <p
            style={{
              fontSize: "larger",
              marginRight: "700px",
              color: "#3f51b5",
              fontWeight: "bold",
            }}
          >
            Add a word to a removal list
          </p>
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
              margin: "10px 30px 50px 50px",
              width: "150px",
              padding: "5px",
              fontWeight: "bold",
            }}
            disabled={!inputWord}
            onClick={() => {
              setIsLoading(true);
              setDataReady(false);
              handleAdd();
            }}
          >
            ADD
          </button>
        </div>
        <div style={{ height: "180px" }}>
          <p
            style={{
              fontSize: "larger",
              marginRight: "780px",
              color: "#3f51b5",
              fontWeight: "bold",
            }}
          >
            Add common keys
          </p>
          <label style={{ padding: "30px", fontSize: "larger" }}>
            Browse Files
          </label>
          <input
            style={{
              fontSize: "initial",
              width: "500px",
            }}
            type="file"
            accept=".csv"
            onChange={(e) => {
              setCommonKeyFile(e.target.files[0]);
            }}
          />
          <button
            style={{
              margin: "10px 30px 5px 50px",
              width: "150px",
              padding: "5px",
              fontWeight: "bold",
            }}
            disabled={!commonKeyFile}
            onClick={() => {
              setIsLoading(true);
              setDataReady(false);
              handleCommonKey();
            }}
          >
            ADD
          </button>
          <p>(upload .csv file format as input)</p>
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
          <div style={{ padding: "10px 0px", color: "red" }}>{error}</div>
        )}
      </div>
    </div>
  );
};
