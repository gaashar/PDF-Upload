import React, { useState } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { Extract } from "./extract";
import { Train } from "./train";

export const UploadPDF = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <Tabs
        value={value}
        textColor="primary"
        indicatorColor="primary"
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <Tab label="OCR Extract" />
        <Tab label="Train and Clean" />
      </Tabs>
      {value === 0 ? <Extract /> : <Train />}
    </div>
  );
};
