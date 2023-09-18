import { TextField } from "@mui/material";
import React from "react";

const ImageField = ({
  name,
  allParentImageValueData,
  setParentAllData,
  allParentData,
  setAllParentImageValueData,
  parentErrorsImage,
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
        value={allParentImageValueData[name]}
        onChange={(e) => {
          setParentAllData({
            ...allParentData,
            [allParentData.length]: e.target.value,
          });
          setAllParentImageValueData({
            ...allParentImageValueData,
            [name]: e.target.value,
          });
        }}
      />
      {parentErrorsImage
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
