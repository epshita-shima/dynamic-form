import { TextField } from "@mui/material";
import React from "react";

const Checkbox = ({
  name,
  allCheckValueData,
  setAllData,
  allData,
  setAllCheckValueData,
  errorsCheck,
}) => {
  return (
    <div className="">
      <TextField
        type="text"
        name={`check${name}`}
        id={name}
        variant="outlined"
        size="small"
        className="getInputValue mt-2"
        placeholder="Checkbox Field"
        value={allCheckValueData[name]}
        onChange={(e) => {
          setAllData({
            ...allData,
            [allData.length]: e.target.value,
          });
          setAllCheckValueData({
            ...allCheckValueData,
            [name]: e.target.value,
          });
        }}
      />
      {errorsCheck
        .filter((err) => err.index === name)
        .map((err, i) => (
          <div style={{ color: "#FF0000" }} key={i}>
            This Field is required
          </div>
        ))}
    </div>
  );
};

export default Checkbox;
