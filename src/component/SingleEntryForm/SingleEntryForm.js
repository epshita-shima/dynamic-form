import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./SingleEntryForm.css";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import SingleForm from "../GenerateForm/SingleForm/SingleForm";

const SingleEntryForm = () => {
  const navigate=useNavigate()
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [inputValue, setInputValue] = useState("");
  const [inputValueDDF, setInputValueDDF] = useState("");
  const [inputValueCheck, setInputValueCheck] = useState("");
  const [inputValueDate, setInputValueDate] = useState("");
  const [count, setCount] = useState([]);
  const previousInputValue = useRef("");
  const previousInputValueDDF = useRef("");
  const previousInputValueCheck = useRef("");
  const previousInputValueDate = useRef("");

  useEffect(() => {
    previousInputValue.current = inputValue;
    previousInputValueDDF.current = inputValueDDF;
    previousInputValueCheck.current = inputValueCheck;
    previousInputValueDate.current = inputValueDate;
  }, [inputValue, inputValueDDF, inputValueCheck]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/single-form')

  };
 
  return (
    <div>
      <div className="single-entry-form">
        <div>
          <label htmlFor="" className="text-style">
            Text Field
          </label>{" "}
          <br></br>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div style={{ marginLeft: "5px" }}>
          <label htmlFor="" className="text-style">
            DropDown Field
          </label>{" "}
          <br></br>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={inputValueDDF}
            onChange={(e) => setInputValueDDF(e.target.value)}
          />
        </div>
        <div style={{ marginLeft: "5px" }}>
          <label htmlFor="" className="text-style">
            Checkbox Field
          </label>
          <br></br>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={inputValueCheck}
            onChange={(e) => setInputValueCheck(e.target.value)}
          />
        </div>
        <div style={{ marginLeft: "5px" }}>
          <label htmlFor="" className="text-style">
            Date Field
          </label>
          <br></br>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            onChange={(e) => setInputValueDate(e.target.value)}
          />
        </div>
        <div>
          <Button
            variant="contained"
            style={{marginLeft:'20px',marginTop:'20px'}}
            onClick={() => {
              handleClickOpen()
              const number = inputValue;
              const numberDDf = inputValueDDF;
              const numberCheck = inputValueCheck;
              const numberDate = inputValueDate;
              var array = [];

              for (var i = 0; i < number; i++) {
                array.push([<TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  onChange={(e)=>{
                  console.log(e.target.value)
                  }}
                  name={`item.${i}.text`}
                  placeholder="Enter text"
                />]);
              }
              for (var i = 0; i < numberDDf; i++) {
                array.push([<Box sx={{ minWidth: 100 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Age
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id={`item.${i}.drop`}
                      value={age}
                      label="Age"
                      name={`item.${i}.drop`}
                      size="small"
                      onChange={handleChange}
                    >
                    </Select>
                  </FormControl>
                </Box>]);
              }
              for (var i = 0; i < numberCheck; i++) {
                array.push([<FormGroup>
                  <FormControlLabel
                  name={`item.${i}.check`}
                    control={<Checkbox defaultChecked />}
                    label="Label"
                  />
                </FormGroup>]);
              }
              for (var i = 0; i < numberDate; i++) {
                array.push([ <DatePicker
                  selected={startDate}
                  name={`item.${i}.date`}
                  onChange={(date) => setStartDate(date)}
                />]);
              }
            setCount([...array])
            }}
          >
            Enter
          </Button>
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Give page name"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  
                  onChange={(e)=>{
                  console.log(e.target.value)
                  }}
                  placeholder="Enter text"
                />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
        </div>
      </div>

    <div>
      {
        <SingleForm count={count} setCount={setCount}></SingleForm>
      }
    </div>
    </div>
  );
};

export default SingleEntryForm;
