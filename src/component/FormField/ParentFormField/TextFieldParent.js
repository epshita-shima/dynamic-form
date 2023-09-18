import { TextField } from "@mui/material";
import swal from "sweetalert";
const TextFieldParent = (
  {inputValueParent,
  setInputValueParent,
  allParentInputValueData,
  setAllParentInputValueData}
) => {

  return (
   <>
    <label htmlFor="" className="text-style d-block mx-auto">
    Text Field
  </label>
    <TextField
      id="outlined-basic"
      variant="outlined"
      type="number"
      size="small"
      defaultValue="0"
      value={inputValueParent}
      onChange={(e) => {
        console.log(e.target.value)
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
        setAllParentInputValueData((prev) => {
          const temp__details = {};
          for (var inputLength = 0; inputLength < targetValue; inputLength++) {
            temp__details[inputLength] = "";
          }
          return temp__details;
        });
        setInputValueParent(targetValue);
      }}
    />
   </>
  );
};

export default TextFieldParent;
