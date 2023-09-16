import React from 'react'
import { TextField } from '@mui/material';
import swal from "sweetalert";
const ChildTextareaField = ({inputValueTextArea,setAllTextAreaValueData,setInputValueTextArea}) => {
  return (
    <div>
      <label htmlFor="" className="text-style d-block mx-auto">
                Textarea
              </label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="number"
                size="small"
                defaultValue="0"
                value={inputValueTextArea}
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
                    setAllTextAreaValueData((prev) => {
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
                    setInputValueTextArea(targetValue);
                  }
                  
                }
              />
    </div>
  )
}

export default ChildTextareaField
