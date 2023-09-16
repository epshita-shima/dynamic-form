import { TextField } from "@mui/material";
import swal from "sweetalert";
const TextFieldParent = (
  {inputValue,
  setInputValue,
  allInputValueData,
  setAllInputValueData}
) => {
  // const [inputValue, setInputValue] = useState("");
  // const [allInputValueData, setAllInputValueData] = useState({});
  console.log(allInputValueData);
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
      value={inputValue}
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
        setAllInputValueData((prev) => {
          const temp__details = {};
          for (var inputLength = 0; inputLength < targetValue; inputLength++) {
            temp__details[inputLength] = "";
          }
          return temp__details;
        });
        setInputValue(targetValue);
      }}
    />
   </>
  );
};

export default TextFieldParent;
