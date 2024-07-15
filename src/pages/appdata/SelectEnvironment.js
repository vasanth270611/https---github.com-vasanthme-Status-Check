import * as React from "react";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import ConfigTable from "./ConfigTable";
import AppTypeTable from "./AppTypeTable";

function SelectEnvironment() {
  const [environment, setEnvironment] = useState("selectEnvironment");
  const [devDetailsVisible, setDevDetailsVisible] = useState(false);
  const [sitDetailsVisible, setSitDetailsVisible] = useState(false);
  const [qaDetailsVisible, setQaDetailsVisible] = useState(false);
  const [prodDetailsVisible, setProdDetailsVisible] = useState(false);

  const handleOnChange = (event) => {
    setEnvironment(event.target.value);
  };

  useEffect(() => {
    environment === "dev"
      ? setDevDetailsVisible(true)
      : setDevDetailsVisible(false);
    environment === "sit"
      ? setSitDetailsVisible(true)
      : setSitDetailsVisible(false);
    environment === "qa"
      ? setQaDetailsVisible(true)
      : setQaDetailsVisible(false);
    environment === "prod"
      ? setProdDetailsVisible(true)
      : setProdDetailsVisible(false);
  }, [environment]);

  return (
    <div className="environment selection">
      <div>
        <Typography variant="body1">Please select the environment</Typography>
      </div>

      <div className="environment list">
        <select
          className="form select"
          value={environment}
          onChange={handleOnChange}
        >
          <option value="selectEnvironment">select</option>
          <option value="dev">DEV</option>
          <option value="sit">SIT</option>
          <option value="qa">QA</option>
        </select>
      </div>
    </div>
  );
}

export default SelectEnvironment;
