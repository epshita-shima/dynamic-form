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
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./SingleEntryForm.css";
import DatePicker from "react-datepicker";
import { Link, useNavigate } from "react-router-dom";
import SingleForm from "../GenerateForm/SingleForm/SingleForm";
import { Formik } from "formik";

const SingleEntryForm = ({ opens, setOpens, setOpen }) => {
  console.log(opens);
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  // const [open, setOpen] = useState(true);
  const [array, setArray] = useState([]);
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
  console.log(count);
  useEffect(() => {
    previousInputValue.current = inputValue;
    previousInputValueDDF.current = inputValueDDF;
    previousInputValueCheck.current = inputValueCheck;
    previousInputValueDate.current = inputValueDate;
  }, [inputValue, inputValueDDF, inputValueCheck]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSort = () => {
    let _count = [...count];
    const draggedItemContent = _count.splice(dragItem.current, 1)[0];
    _count.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setCount(_count);
  };

  const dragItem = useRef();
  const dragOverItem = useRef();

  const addList = () => {
    setCount([...count, ...array]);
  };

  return (
    <Grid>
      {opens == true ? (
        <Grid className="single-entry-form">
          <Grid>
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
          </Grid>
          <Grid style={{ marginLeft: "5px" }}>
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
          </Grid>
          <Grid style={{ marginLeft: "5px" }}>
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
          </Grid>
          <Grid style={{ marginLeft: "5px" }}>
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
          </Grid>
          <Grid>
            <Button
              variant="contained"
              style={{ marginLeft: "20px", marginTop: "20px" }}
              onClick={() => {
                const number = inputValue;
                const numberDDf = inputValueDDF;
                const numberCheck = inputValueCheck;
                const numberDate = inputValueDate;
                // var array = [];

                for (var i = 0; i < number; i++) {
                  array.push([
                    <TextField
                      id="standard-basic"
                      label="Enter label"
                      variant="standard"
                    />,
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      style={{ marginTop: "3px" }}
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                      name={`item.${i}.text`}
                      placeholder="Enter text"
                    />,
                  ]);
                }
                for (var i = 0; i < numberDDf; i++) {
                  array.push([
                    <TextField
                      id="standard-basic"
                      label="Enter label"
                      variant="standard"
                    />,
                    <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id={`item.${i}.drop`}
                          value={age}
                          label="Age"
                          name={`item.${i}.drop`}
                          size="small"
                          style={{ marginTop: "3px" }}
                          onChange={handleChange}
                        ></Select>
                      </FormControl>
                    </Box>,
                  ]);
                }
                for (var i = 0; i < numberCheck; i++) {
                  array.push([
                    <TextField
                      id="standard-basic"
                      label="Enter label"
                      variant="standard"
                    />,
                    <FormGroup>
                      <FormControlLabel
                        name={`item.${i}.check`}
                        style={{ marginTop: "3px" }}
                        control={<Checkbox defaultChecked />}
                        label="Label"
                      />
                    </FormGroup>,
                  ]);
                }
                for (var i = 0; i < numberDate; i++) {
                  array.push([
                    <DatePicker
                      selected={startDate}
                      name={`item.${i}.date`}
                      style={{ marginTop: "3px" }}
                      onChange={(date) => setStartDate(date)}
                    />,
                  ]);
                }
                setCount([...array]);
                setOpens(false);
                setOpen(false);
              }}
            >
              Enter
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid style={{ margin: "50px" }}>
          <Formik
            initialValues={{}}
            render={({ values, setFieldValue }) => (
              <form>
                <h2
                  style={{
                    textAlign: "center",
                    fontSize: "32px",
                    color: "purple",
                  }}
                >
                  Single Form
                </h2>
                <Button variant="contained" type="submit">
                  Save
                </Button>

                <Button
                  type="button"
                  variant="contained"
                  style={{ marginLeft: "5px", background: "indigo" }}
                  onClick={addList}
                >
                  Add row
                </Button>
                
                  <a href="/slider" target="_blank" style={{ marginLeft: "5px", background: "purple", color:'white', textDecoration:'none', padding:'7px'}}> Slider view</a>
             
               
                <Grid className="grid-container">
                  {count?.map((result, index) => {
                    console.log(result);
                    return (
                      <Grid
                        key={index}
                        draggable
                        onDragStart={(e) => {
                          dragItem.current = index;
                        }}
                        onDragEnter={(e) => {
                          dragOverItem.current = index;
                        }}
                        onDragEnd={handleSort}
                        onDragOver={(e) => e.preventDefault}
                        className="grid-item"
                        // style={{display:'flex'}}
                      >
                        {result}
                      </Grid>
                    );
                  })}
                  <Button
                    variant="contained"
                    style={{ background: "red", marginTop: "3px" }}
                    onClick={() => {
                      const itemList = [...count];
                      itemList.splice(0);
                      setCount(itemList);
                    }}
                  >
                    X
                  </Button>
                </Grid>
              </form>
            )}
          ></Formik>
        </Grid>
      )}
    </Grid>
  );
};

export default SingleEntryForm;
