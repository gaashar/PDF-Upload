import React from "react";
import dataInput from "./sample.json";

export const DataTable = ({ data, headersList }) => {
  if (data) {
    return (
      <table
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          borderCollapse: "collapse",
          width: "100%",
          maxHeight: "750px",
          overflow: "scroll",
        }}
      >
        <thead>
          {headersList.map((header) => {
            return (
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  textAlign: "center",
                  backgroundColor: "#3f51b5",
                  color: "white",
                }}
              >
                {header.toUpperCase()}
              </th>
            );
          })}
        </thead>
        <tbody>
          {data.map((item, key) => {
            return (
              <tr key={key}>
                {headersList.map((header) => {
                  return (
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {item[header]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
};
