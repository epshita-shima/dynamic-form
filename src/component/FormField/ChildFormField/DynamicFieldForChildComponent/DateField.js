import { TextField } from "@mui/material";
import React from "react";

const DateField = ({
  name,
  allDateValueData,
  setAllData,
  allData,
  setAllDateValueData,
  errorsDate,
}) => {
  return (
    <div className="">
      <TextField
        type="text"
        name={`input${name}`}
        id={name}
        variant="outlined"
        size="small"
        placeholder="Date Field"
        className="getInputValue mt-2"
        value={allDateValueData[name]}
        onChange={(e) => {
          setAllData({
            ...allData,
            [allData.length]: e.target.value,
          });
          setAllDateValueData({
            ...allDateValueData,
            [name]: e.target.value,
          });
        }}
      />
      {errorsDate
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
