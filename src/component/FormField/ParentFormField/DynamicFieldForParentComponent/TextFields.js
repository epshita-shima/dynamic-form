import { TextField } from "@mui/material";
import React from "react";

const TextFields = ({
  name,
  allParentInputValueData,
  setAllParentInputValueData,
  allParentInputValueForFormulaData,
  setAllParentInputValueForFormulaData,
  parentErrorsInput,
}) => {
  console.log(name,allParentInputValueData)
  return (
    <div>
      <TextField
        type="text"
        name={`input${name}`}
        id={name}
        variant="outlined"
        size="small"
        placeholder="Text Field"
        className="getInputValue mt-2"
        required
        value={allParentInputValueData[name]}
        onChange={(e) => {
          setAllParentInputValueData({
            ...allParentInputValueData,
            [name]: e.target.value,
          });
          var tempValue = {
            label: e.target.value,
            value: e.target.value,
          };
          allParentInputValueForFormulaData[name] = tempValue;
          setAllParentInputValueForFormulaData((prev) => {
            const temp__details = [...prev];
            return temp__details;
          });
          console.log(allParentInputValueForFormulaData);
        }}
      />
      {parentErrorsInput
        .filter((err) => err.index === name)
        .map((err, i) => (
          <div style={{ color: "#FF0000" }} key={i}>
            This Field is required
          </div>
        ))}
    </div>
  );
};

export default TextFields;
