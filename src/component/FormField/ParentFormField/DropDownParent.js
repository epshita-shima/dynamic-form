import { TextField } from '@mui/material';
import React from 'react'
import swal from "sweetalert";
const DropDownParent = ({inputValueDDF,setAllDropValueData,setInputValueDDF}) => {
    
  return (
    <div>
      <label htmlFor="" className="text-style d-block mx-auto">
                  DropDown Field
                </label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="number"
                  size="small"
                  defaultValue="0"
                  value={inputValueDDF}
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

                    setAllDropValueData((prev) => {
                      const temp__details = {};
                      console.log(temp__details);
                      for (
                        var inputLength = 0;
                        inputLength < targetValue;
                        inputLength++
                      ) {
                        temp__details[inputLength] = "";
                      }
                      return temp__details;
                    });
                    setInputValueDDF(targetValue);
                  }}
                  />
    </div>
  )
}

export default DropDownParent
