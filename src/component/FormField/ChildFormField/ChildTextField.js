import React from 'react'
import { TextField } from '@mui/material';
import swal from "sweetalert";

const ChildTextField = ({inputValue,setAllInputValueData,setInputValue}) => {
  return (
    <div>
       <label htmlFor="" className="text-style d-block mx-auto">
                Text Field
              </label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="number"
                size="small"
                defaultValue="0"
                className="noscroll"
                onWheel={(e) => e.preventDefault()} 
                value={inputValue}
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
                    setAllInputValueData((prev) => {
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
                    setInputValue(targetValue);
                  }}
              />
    </div>
  )
}

export default ChildTextField
