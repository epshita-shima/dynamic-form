import {
  Box,
  Button,
  Checkbox,
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
import { Formik } from "formik";
import DatePicker from "react-datepicker";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const SingleEntryForm = () => {
  const [age, setAge] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [inputValue, setInputValue] = useState("");
  const [inputValueDDF, setInputValueDDF] = useState("");
  const [inputValueCheck, setInputValueCheck] = useState("");
  const [inputValueDate, setInputValueDate] = useState("");
  const [count, setCount] = useState([]);
  const [countDDF, setCountDDf] = useState([]);
  const [countCheck, setCountCheck] = useState([]);
  const [countDate, setCountDate] = useState([]);
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
            onClick={() => {
              const number = inputValue;
              const numberDDf = inputValueDDF;
              const numberCheck = inputValueCheck;
              const numberDate = inputValueDate;
              const array = [];
              const arrayDDF = [];
              const arrayCheck = [];
              const arrayDate = [];
              for (var i = 0; i < number; i++) {
                array.push([i]);
              }
              for (var i = 0; i < numberDDf; i++) {
                arrayDDF.push([i]);
              }
              for (var i = 0; i < numberCheck; i++) {
                arrayCheck.push([i]);
              }
              for (var i = 0; i < numberDate; i++) {
                arrayDate.push([i]);
              }
              setCount(array);
              setCountDDf(arrayDDF);
              setCountCheck(arrayCheck);
              setCountDate(arrayDate);
            }}
          >
            Enter
          </Button>
        </div>
      </div>

      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {}}
        render={({ values, setFieldValue, handleSubmit }) => (
          <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="inputList">
              {(provided) => (
                <form
                  onSubmit={""}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="form-parent">
                    <div>
                      {count.map((item, index) => {
                        return (
                          <Draggable draggableId={index} index={0}>
                            {(provided) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  size="small"
                                  name={`item.${index}.check`}
                                />
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    </div>

                
                        <div
                         
                        >
                          {countDDF.map((item, index) => {
                            return (
                              <Draggable draggableId={index} index={0}>
                              {(provided) => (
                               <div   {...provided.draggableProps}
                               {...provided.dragHandleProps}
                               ref={provided.innerRef}>
                               <Box sx={{ minWidth: 120 }}>
                                 <FormControl fullWidth>
                                   <InputLabel id="demo-simple-select-label">
                                     Age
                                   </InputLabel>
                                   <Select
                                     labelId="demo-simple-select-label"
                                     id={`item.${index}.drop`}
                                     value={age}
                                     label="Age"
                                     name={`item.${index}.drop`}
                                     size="small"
                                     onChange={handleChange}
                                   >
                                     <MenuItem value={10}>Ten</MenuItem>
                                     <MenuItem value={20}>Twenty</MenuItem>
                                     <MenuItem value={30}>Thirty</MenuItem>
                                   </Select>
                                 </FormControl>
                               </Box>
                             </div>
                              )}
                            </Draggable>
                              
                            );
                          })}
                        </div>
                     
                    <Droppable droppableId="inputList">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        ></div>
                      )}
                    </Droppable>

                    {/* {countCheck.map((item, index) => {
                      return (
                        <div>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="Label"
                            />
                          </FormGroup>
                        </div>
                      );
                    })}
                    {countDate.map((item, index) => {
                      return (
                        <div>
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                          />
                        </div>
                      );
                    })} */}
                  </div>
                </form>
              )}
            </Droppable>
          </DragDropContext>
        )}
      />
    </div>
  );
};

export default SingleEntryForm;
