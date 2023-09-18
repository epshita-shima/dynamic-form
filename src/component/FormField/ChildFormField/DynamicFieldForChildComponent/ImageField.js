import { TextField } from "@mui/material";
import React from "react";

const ImageField = ({
  name,
  allImageValueData,
  setAllData,
  allData,
  setAllImageValueData,
  errorsImage,
}) => {
  return (
    <div>
      <TextField
        type="text"
        name={`input${name}`}
        id={name}
        variant="outlined"
        size="small"
        placeholder="image field"
        className="getInputValue mt-2"
        value={allImageValueData[name]}
        onChange={(e) => {
          setAllData({
            ...allData,
            [allData.length]: e.target.value,
          });
          setAllImageValueData({
            ...allImageValueData,
            [name]: e.target.value,
          });
        }}
      />
      {errorsImage
        .filter((err) => err.index === name)
        .map((err, i) => (
          <div style={{ color: "#FF0000" }} key={i}>
            This Field is required
          </div>
        ))}
    </div>
  );
};

export default ImageField;
