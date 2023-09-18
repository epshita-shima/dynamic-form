import { TextField } from "@mui/material";
import React from "react";

const TextFields = ({
  name,
  allInputValueData,
  setAllInputValueData,
  allInputValueForFormulaData,
  setAllInputValueForFormulaData,
  errorsInput,
}) => {
  return (
    <div>
      <TextField
        type="text"
        name={`input${name}`}
        id={name}
        variant="outlined"
        size="small"
        placeholder="Text Field"
        className="getInputValue mt-2 noscroll"
        required
        value={allInputValueData[name]}
        onChange={(e) => {
          setAllInputValueData({
            ...allInputValueData,
            [name]: e.target.value,
          });
          var tempValue = {
            label: e.target.value,
            value: e.target.value,
          };
          allInputValueForFormulaData[name] = tempValue;
          setAllInputValueForFormulaData((prev) => {
            const temp__details = [...prev];
            return temp__details;
          });
        }}
      />
      {errorsInput
        .filter((err) => err.index === name)
        .map((err, i) => {
          return (
            <div style={{ color: "#FF0000" }} key={i}>
              This Field is required
            </div>
          );
        })}
    </div>
  );
};

export default TextFields;
