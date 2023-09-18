import { TextField } from "@mui/material";
import React from "react";

const TextareaField = ({
  name,
  allTextAreaValueData,
  setAllData,
  allData,
  setAllTextAreaValueData,
  errorsTextarea
}) => {
  return (
    <div>
      <TextField
        type="text"
        name={`input${name}`}
        id={name}
        variant="outlined"
        size="small"
        placeholder="textarea field"
        className="getInputValue mt-2"
        value={allTextAreaValueData[name]}
        onChange={(e) => {
          setAllData({
            ...allData,
            [allData.length]: e.target.value,
          });
          setAllTextAreaValueData({
            ...allTextAreaValueData,
            [name]: e.target.value,
          });
        }}
      />
      {errorsTextarea
        .filter((err) => err.index === name)
        .map((err, i) => (
          <div style={{ color: "#FF0000" }} key={i}>
            This Field is required
          </div>
        ))}
    </div>
  );
};

export default TextareaField;
