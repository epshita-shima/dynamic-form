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
  const [allElement, setAllElement] = useState([]);
  const previousInputValue = useRef("");
  const previousInputValueDDF = useRef("");
  const previousInputValueCheck = useRef("");
  const previousInputValueDate = useRef("");
const[input,setInput]=useState('')
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
    let _count = [...allElement];
    const draggedItemContent = _count.splice(dragItem.current, 1)[0];
    _count.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setAllElement(_count);
  };
console.log(allElement)
  // const handleSortCheckBox=()=>{
  //   let _countCheck=[...countCheck]
  //   const draggedItemContent=_countCheck.splice(dragItem.current,1)[0]
  //   _countCheck.splice(dragOverItem.current,0,draggedItemContent);
  //   dragItem.current=null;
  //   dragOverItem.current=null;
  //   setCountCheck(_countCheck)
  // }

  const dragItem = useRef();
  const dragOverItem = useRef();
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
              const elementArray = [];

              for (var i = 0; i < number; i++) {
                array.push([<TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  
                  onChange={(e)=>{
                  console.log(e.target.value)
                  }}
                  name={`item.${i}.check`}
                  placeholder="Enter text"
                />]);
              }
              for (var i = 0; i < numberDDf; i++) {
                arrayDDF.push([<Box sx={{ minWidth: 120, marginTop: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Age
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      // id={`item.${index}.drop`}
                      value={age}
                      label="Age"
                      // name={`item.${index}.drop`}
                      size="small"
                      onChange={handleChange}
                    >
                    </Select>
                  </FormControl>
                </Box>]);
              }
              for (var i = 0; i < numberCheck; i++) {
                arrayCheck.push([<FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Label"
                  />
                </FormGroup>]);
              }
              for (var i = 0; i < numberDate; i++) {
                arrayDate.push([ <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />]);
              }
              elementArray.push(array, arrayDDF, arrayCheck, arrayDate);
              console.log(elementArray);
              setAllElement(elementArray);
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
          // <DragDropContext>
          //   <Droppable droppableId="inputList">
          //     {(provided) => (
                <form
                  onSubmit={""}
                  // ref={provided.innerRef}
                  // {...provided.droppableProps}
                >
                  <div>
                    <div className="form-parent">
                      {allElement.map((result, index) => {
                        console.log(result)
                        return (
                          <div key={index} draggable 
                          onDragStart={(e)=>{dragItem.current=index}}
                          onDragEnter={(e)=>{dragOverItem.current=index}}
                          onDragEnd={handleSort}
                          onDragOver={(e)=>e.preventDefault}
                         >
                            {result.map((item, id) => {
                              //  const handleItem= () => {
                              //   let _count = [...result];
                              //   const draggedItemContent = _count.splice(dragItem.current, 1)[0];
                              //   _count.splice(dragOverItem.current, 0, draggedItemContent);
                              //   dragItem.current = null;
                              //   dragOverItem.current = null;
                              //   setAllElement(_count);
                              // };
                              return (
                                <div key={id} >
                                  {index == 0 ? (
                                    <div draggable  style={{marginTop:'5px'}}>
                                      {
                                        item
                                      }
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {index == 1 ? (
                                    <div draggable style={{marginLeft:'5px',marginTop:'5px'}}>
                                      {
                                        item
                                      }
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {index == 2 ? (
                                   <div draggable style={{marginLeft:'5px',marginTop:'5px'}}>
                                    {
                                      item
                                    }
                                   </div>
                                  ) : (
                                    ""
                                  )}
                                  {index == 3 ? (
                                   <div draggable style={{marginLeft:'5px',marginTop:'5px'}}>
                                    {
                                      item
                                    }
                                   </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </form>
              // )}
          //   </Droppable>
          // </DragDropContext>
        )}
      />
    </div>
  );
};

export default SingleEntryForm;
