import { TextField } from "@mui/material";
import React from "react";

const TextareaField = ({
  name,
  allParentTextAreaValueData,
  setParentAllData,
  allParentData,
  setAllParentTextAreaValueData,
  parentErrorsTextArea
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
        value={allParentTextAreaValueData[name]}
        onChange={(e) => {
          setParentAllData({
            ...allParentData,
            [allParentData.length]: e.target.value,
          });
          setAllParentTextAreaValueData({
            ...allParentTextAreaValueData,
            [name]: e.target.value,
          });
        }}
      />
      {parentErrorsTextArea
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
