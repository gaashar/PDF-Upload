import React, { useState } from "react";
import { Extract } from "./extract";
import { Train } from "./train";

export const UploadPDF = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Extract />
      <hr style={{ margin: "40px 150px" }}></hr>
      <Train />
    </div>
  );
};
