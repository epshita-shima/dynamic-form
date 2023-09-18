import React from "react";
import { TextField } from "@mui/material";
import swal from "sweetalert";

const ImageParentField = ({
  inputValueImageParent,
  setAllParentImageValueData,
  setInputValueImageParent,
}) => {
  return (
    <div>
      <label htmlFor="" className="text-style d-block mx-auto">
        Image Field
      </label>
      <TextField
        id="outlined-basic"
        variant="outlined"
        type="number"
        size="small"
        defaultValue="0"
        value={inputValueImageParent}
        onChange={(e) => {
          if (e.target.value < 0) {
            swal({
              title: "Not Possible!",
              text: "Please select positive number",
              icon: "warning",
              button: "OK",
            });
            return;
          }
          let targetValue = 0;
          if (e.target.value == "") {
            targetValue = 0;
          } else {
            targetValue = parseInt(e.target.value);
          }
          setAllParentImageValueData((prev) => {
            const temp__details = {};
            for (
              var inputLength = 0;
              inputLength < targetValue;
              inputLength++
            ) {
              temp__details[inputLength] = "";
            }
            return temp__details;
          });
          setInputValueImageParent(targetValue);
        }}
      />
    </div>
  );
};

export default ImageParentField;
