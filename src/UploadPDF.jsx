import React, { useState } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { Extract } from "./components/extract";
import { Train } from "./components/train";
import { Config } from "./components/config";

export const UploadPDF = () => {
  const [value, setValue] = useState(0);

  let component;
  switch (value) {
    case 0:
      component = <Extract />;
      break;
    case 1:
      component = <Train />;
      break;
    case 2:
      component = <Config />;
      break;
  }

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
        <Tab label="Config" />
      </Tabs>
      {component}
    </div>
  );
};
