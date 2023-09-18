import { TextField } from "@mui/material";
import React from "react";

const DateField = ({name,allParentDateValueData,setParentAllData,allParentData,setAllParentDateValueData,parentErrorsDate}) => {
  return (
    <div>
      <TextField
        type="text"
        name={`input${name}`}
        id={name}
        variant="outlined"
        size="small"
        placeholder="Date Field"
        className="getInputValue mt-2"
        value={allParentDateValueData[name]}
        onChange={(e) => {
          setParentAllData({
            ...allParentData,
            [allParentData.length]: e.target.value,
          });
          setAllParentDateValueData({
            ...allParentDateValueData,
            [name]: e.target.value,
          });
        }}
      />
      {parentErrorsDate
        .filter((err) => err.index === name)
        .map((err, i) => (
          <div style={{ color: "#FF0000" }} key={i}>
            This Field is required
          </div>
        ))}
    </div>
  );
};

export default DateField;
