import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import "../SingleEntryForm/SingleEntryForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";

import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import Token from "../common/Token";
import useChildMenu from "./../customHooks/useChildMenu";

const DoubleEntryChildData = ({
  childMenuName,
  allInputValueDataDetails,
  setAllInputValueDataDetails,
  allDropValueDataDetails,
  setAllDropValueDataDetails,
  allCheckValueDataDetails,
  setAllCheckValueDataDetails,
  allDateValueDataDetails,
  setAllDateValueDataDetails,
  allTextAreaValueDataDetails,
  setAllTextAreaValueDataDetails,
  allImageValueDataDetails,
  setAllImageValueDataDetails,
  inputValueDetails,
  setInputValueDetails,
  inputValueDDFDetails,
  setInputValueDDFDetails,
  inputValueCheckDetails,
  setInputValueCheckDetails,
  inputValueDateDetails,
  setInputValueDateDetails,
  inputValueTextAreaDetails,
  setInputValueTextAreaDetails,
  inputValueImageDetails,
  setInputValueImageDetails,
  previousInputValueDetails,
  previousInputValueDDFDetails,
  previousInputValueCheckDetails,
  previousInputValueDateDetails,
  previousInputValueTextAreaDetails,
  previousInputValueImageDetails,
  displayFormulaAutoDetails,
  setDisplayFormulaAutoDetails,
  setCalculationTypeDetails,
  setFormulaTargetDetails,
  inputDataDetails,
  setInputDataDetails,
  dropdownDataDetails,
  setDropdownDataDetails,
  checkboxDataDetails,
  setCheckboxDataDetails,
  dateDataDetails,
  setDateDataDetails,
  textareaDataDetails,
  setTextareaDataDetails,
  imageDataDetails,
  setImageDataDetails,
  showDropDownModalDetails,
  setShowDropDownModalDetails,
  currentDropSelectedDetails,
  setCurrentDropSelectedDetails,
  arrayInputDetails,
  arrayDropdownDetails,
  arrayCheckDetails,
  arrayDateDetails,
  arrayTextAreaDetails,
  arrayImageDetails,
  pageFormulaDetails,
setPageFormulaDetails,
radioButton2,setRadioButton2,
keyValue, setKeyValue,
showCalculactionModalDetails,
setShowCalculactionModalDetails,
allInputValueForFormulaDataDetails, setAllInputValueForFormulaDataDetails,
childModalTitle,setChildModalTitle,
inputSchemaDetails,
            setInputSchemaDetails,
            dropSchemaDetails,
            setDropSchemaDetails,
            checkSchemaDetails,
            setCheckSchemaDetails,
            dateSchemaDetails,
            setDateSchemaDetails,
            pageSchemaDetails,
            pageNameDetails,
            setPageNameDetails,
            errorsPageDetails,
            errorsInputDetails,
            errorsDropDownDetails,
            errorsDateDetails,
            errorsCheckDetails,
            errorsTextareaDetails,
            errorsImageDetails
}) => {

  const [showErrorModalDetails, setShowErrorModalDetails] = useState(false);
  const [errorMessageStringDetails, setErrorMessageStringDetails] =
    useState("");
 
 
  const [allDataDetails, setAllDataDetails] = useState([]);
  const [selectedOptionDetails, setSelectedOptionDetails] = useState([]);
  const [modalSpecificDataDetails, setModalSpecificDataDetails] = useState([]);
  const [allModelDataTableDetails, setAllModelDataTableDetails] = useState([]);


  const handleClose = () => setShowCalculactionModalDetails(false);
  const handleDropClose = () => setShowDropDownModalDetails(false);
  const handleErrorClose = () => setShowErrorModalDetails(false);
  
  const [childMenu, setChildMenu] = useChildMenu([]);
  const [show2, setShow2] = useState(false);
  
  const [menuId, setMenuId] = useState("");
  const [dropdownName, setDropdownName] = useState([]);
  const token = Token.token;
  const tableName = childMenuName.SubMenuName;
  const spaceRemove = tableName.split(" ").join("");
  const tableNameLowerCase = spaceRemove.toLowerCase();

  const insertField = (modelDataParams) => {
    fetch("http://localhost:53601/DBCommand/Insert", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(modelDataParams),
    })
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  {
    for (let i = 0; i < inputValueDetails; i++) {
      arrayInputDetails.push([i]);
    }
    for (let i = 0; i < inputValueDDFDetails; i++) {
      arrayDropdownDetails.push([i]);
    }
    for (let i = 0; i < inputValueCheckDetails; i++) {
      arrayCheckDetails.push([i]);
    }
    for (let i = 0; i < inputValueDateDetails; i++) {
      arrayDateDetails.push([i]);
    }
    for (let i = 0; i < inputValueTextAreaDetails; i++) {
      arrayTextAreaDetails.push(i);
    }
    for (let i = 0; i < inputValueImageDetails; i++) {
      arrayImageDetails.push(i);
    }

    useEffect(() => {
      setInputDataDetails(arrayInputDetails);
      setDropdownDataDetails(arrayDropdownDetails);
      setCheckboxDataDetails(arrayCheckDetails);
      setDateDataDetails(arrayDateDetails);
      setTextareaDataDetails(arrayTextAreaDetails);
      setImageDataDetails(arrayImageDetails);
    }, [
      inputValueDetails,
      inputValueDDFDetails,
      inputValueCheckDetails,
      inputValueDateDetails,
      inputValueTextAreaDetails,
      inputValueImageDetails,
    ]);
  }

  useEffect(() => {
    previousInputValueDetails.current = inputValueDetails;
    previousInputValueDDFDetails.current = inputValueDDFDetails;
    previousInputValueCheckDetails.current = inputValueCheckDetails;
    previousInputValueDateDetails.current = inputValueDateDetails;
    previousInputValueTextAreaDetails.current = inputValueTextAreaDetails;
    previousInputValueImageDetails.current = inputValueImageDetails;
  }, [
    inputValueDetails,
    inputValueDDFDetails,
    inputValueCheckDetails,
    inputValueDateDetails,
    inputValueTextAreaDetails,
  ]);

 
  const handleModalMenu = () => {
    const modelData = {
      procedureName: "",
      parameters: {},
    };
    modelData.procedureName = "prc_GetMenuList";
    fetch("https://localhost:44372/api/GetData/GetInitialData", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(modelData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == true) {
          const allModalData = JSON.parse(data.data);
          setModalSpecificDataDetails(allModalData.Tables2);
        } else {
          console.log(data);
        }
      });
  };
  const handleDropdownValue = (i) => {

    var radioName = 0;
    if (
      document.querySelector('input[name="dropValueField"]:checked') != null
    ) {
      radioName = document.querySelector(
        'input[name="dropValueField"]:checked'
      ).value;
    }
    setChildModalTitle(radioName)
    let newString = radioName.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let tableName = convertLowerCase;

    const modelDataLabel = {
      procedureName: "",
      parameters: {
        TableName: "",
      },
    };
    modelDataLabel.procedureName = "prc_GetMasterInfoList";
    modelDataLabel.parameters.TableName = `${tableName}`;
    fetch("https://localhost:44372/api/GetData/GetDataByID", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(modelDataLabel),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == true) {
          const allModalData = JSON.parse(data.data);
          console.log(allModalData);
          setAllModelDataTableDetails(allModalData);
      
          setAllDropValueDataDetails({
            ...allDropValueDataDetails,
            [i]: radioName,
          });
        } else {
          console.log(data);
        }
      });
      const modelData = {
        procedureName: "prc_GetPageInfo",
        parameters: {
          MenuId: menuId,
        },
      };
      fetch(`https://localhost:44372/api/GetData/GetMultipleDataByParam`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(modelData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == true) {
            console.log(data);
            const showSingleData = JSON.parse(data.data);
            console.log(showSingleData)
            setDropdownName(showSingleData.Tables1);
          }
        });
    setShowDropDownModalDetails(false);
  };

  const handleDropdown = (i) => {
    let radioName=0
    if (
      document.querySelector('input[name="dropValueFieldCheck"]:checked') != null
    ) {
      radioName = document.querySelector(
        'input[name="dropValueFieldCheck"]:checked'
      ).value;
    }
  setRadioButton2([...radioButton2,radioName])
    var dataTable = [];
          console.log(allModelDataTableDetails);
          for (var modelArrayPosition in allModelDataTableDetails)
            dataTable.push([
              modelArrayPosition,
              allModelDataTableDetails[modelArrayPosition],
            ]);
          console.log(dataTable,allModelDataTableDetails);
    var dataMenuArr = [];
    dataTable.map((element) => {
      element.map((member) => {
        for (var key in member) {
          if (member.hasOwnProperty(key)) { 
            if (key != "0") {
              if (key==radioName) {
                var dataMenuArrLength = dataMenuArr.length;
                dataMenuArr[dataMenuArrLength] = {};
                dataMenuArr[dataMenuArrLength]["value"] = member.ID;
                var val = member[key];
                dataMenuArr[dataMenuArrLength]["label"] =val
                ;
              }
            }
          }
        }
        console.log(dataMenuArr);
        var allDropValueDataLength = 0;
        if (allDropValueDataDetails != null) {
          allDropValueDataLength = Object.keys(allDropValueDataDetails).length;
          console.log(allDropValueDataLength);
        } 
      });
    
    });
    setSelectedOptionDetails((prev) => {
      console.log(prev);
      const temp__details = [...prev];
      temp__details[i] = dataMenuArr;
      return temp__details;
    });
  };
  function validationOutsideSchema() {

  }

  // const handleSubmit = (e) => {
  //   console.log(e);
  //   e.preventDefault();
  //   validationOutsideSchema();
  //   var foundKey = 0;
  //   var foundEmpty = 0;
  //   console.log(allInputValueDataDetails);
  //   var allInputValueDataLength = 0;
  //   if (inputValue != "") {
  //     allInputValueDataLength = inputValue;
  //   }

  //   var allCheckValueDataLength = 0;
  //   if (inputValueCheck != "") {
  //     allCheckValueDataLength = inputValueCheck;
  //   }

  //   var allDateValueDataLength = 0;
  //   if (inputValueDate != "") {
  //     allDateValueDataLength = inputValueDate;
  //   }

  //   var allDropValueDataLength = 0;
  //   if (inputValueDDF != "") {
  //     allDropValueDataLength = inputValueDDF;
  //   }
  //   var totalField =
  //     allCheckValueDataLength +
  //     allInputValueDataLength +
  //     allDateValueDataLength +
  //     allDropValueDataLength;

  //   console.log(totalField);

  //   if (totalField > 12) {
  //     setErrorMessageString("There cannot be more than 12 input");
  //     showErrorModal(true);
  //   } else if (totalField == 0) {
  //     setErrorMessageString("There need to be more than 0 input");
  //     setShowErrorModal(true);
  //   } else {
  //     var totalValueField = 0;

  //     var errorstatus = 0;
  //     var allInputValueDataLength = 0;
  //     if (allInputValueDataDetails != null) {
  //       allInputValueDataLength = Object.keys(allInputValueDataDetails).length;
  //     }
  //     for (
  //       var allInputCount = 0;
  //       allInputCount < allInputValueDataLength;
  //       allInputCount++
  //     ) {
  //       if (allInputValueDataDetails[allInputCount] == "") {
  //         foundEmpty = 1;
  //       }
  //     }

  //     var allCheckValueDataLength = 0;
  //     if (allCheckValueDataDetails != null) {
  //       allCheckValueDataLength = Object.keys(allCheckValueDataDetails).length;
  //     }
  //     for (
  //       var allInputCount = 0;
  //       allInputCount < allInputValueDataLength;
  //       allInputCount++
  //     ) {
  //       if (allInputValueDataDetails[allInputCount] == "") {
  //         foundEmpty = 1;
  //       }
  //     }

  //     var allDropValueDataLength = 0;
  //     if (allDropValueDataDetails != null) {
  //       allDropValueDataLength = Object.keys(allDropValueDataDetails).length;
  //     }
  //     for (
  //       var allDropCount = 0;
  //       allDropCount < allDropValueDataLength;
  //       allDropCount++
  //     ) {
  //       console.log(allDropValueDataDetails[allDropCount]);
  //       if (allDropValueDataDetails[allDropCount] == "") {
  //         foundEmpty = 1;
  //       }
  //     }

  //     var allDateValueDataLength = 0;
  //     if (allDateValueDataDetails != null) {
  //       allDateValueDataLength = Object.keys(allDateValueDataDetails).length;
  //     }
  //     for (
  //       var allDateCount = 0;
  //       allDateCount < allDateValueDataLength;
  //       allDateCount++
  //     ) {
  //       if (allDateValueDataDetails[allDateCount] == "") {
  //         foundEmpty = 1;
  //       }
  //     }
  //     if (foundEmpty == 1) {
  //     } else {
  //       if (inputValue > 2) {
  //         for (
  //           let countKeyValue = 0;
  //           countKeyValue < allInputValueDataLength;
  //           countKeyValue++
  //         ) {
  //           if (
  //             keyValue.some(
  //               (item) => item.key === allInputValueDataDetails[countKeyValue]
  //             )
  //           ) {
  //             foundKey = 1;
  //           }
  //         }
  //         alert(foundKey);
  //         if (foundKey == 1) {
  //           setShowCalculactionModal(true);
  //         } else {
  //           submitForm();
  //         }
  //       } else {
  //         submitForm();
  //       }
  //     }
  //   }
  // };


  return (
    <Grid>
      <div class="container-fluid mt-4">
        <h2 className="fs-4 fw-bold" style={{ color: "#3AAFA9" }}>
          Child Field{" "}
        </h2>
        <div class="row shadow-lg pt-4 pb-4">
          <div class="col">
            <label htmlFor="" className="text-style d-block mx-auto">
              Text Field
            </label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="number"
              size="small"
              defaultValue="0"
              value={inputValueDetails}
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
                setAllInputValueDataDetails((prev) => {
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
                setInputValueDetails(targetValue);
              }}
            />
          </div>
          <div class="col">
            <label htmlFor="" className="text-style d-block mx-auto">
              DropDown Field
            </label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="number"
              size="small"
              defaultValue="0"
              value={inputValueDDFDetails}
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

                setAllDropValueDataDetails((prev) => {
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
                setInputValueDDFDetails(targetValue);
              }}
            />
          </div>
          <div class="col">
            <label htmlFor="" className="text-style d-block mx-auto">
              Checkbox Field
            </label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="number"
              size="small"
              defaultValue="0"
              value={inputValueCheckDetails}
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
                setAllCheckValueDataDetails((prev) => {
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
                setInputValueCheckDetails(targetValue);
              }}
            />
          </div>
          <div class="col">
            <label htmlFor="" className="text-style d-block mx-auto">
              Date Field
            </label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="number"
              size="small"
              defaultValue="0"
              value={inputValueDateDetails}
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
                setAllDateValueDataDetails((prev) => {
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
                setInputValueDateDetails(targetValue);
              }}
            />
          </div>
          <div class="col">
            <label htmlFor="" className="text-style d-block mx-auto">
              Textarea
            </label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="number"
              size="small"
              defaultValue="0"
              value={inputValueTextAreaDetails}
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
                setAllTextAreaValueDataDetails((prev) => {
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
                setInputValueTextAreaDetails(targetValue);
              }}
            />
          </div>
          <div class="col">
            <label htmlFor="" className="text-style d-block mx-auto">
              Image Field
            </label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="number"
              size="small"
              defaultValue="0"
              value={inputValueImageDetails}
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
                setAllImageValueDataDetails((prev) => {
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
                setInputValueImageDetails(targetValue);
              }}
            />
          </div>
          <div class="w-100"></div>
          <div class="col">
            {inputDataDetails?.map((item, name) => {
              return (
                <div>
                  <TextField
                    type="text"
                    name={`input${name}`}
                    id={name}
                    variant="outlined"
                    size="small"
                    placeholder="Text Field"
                    className="getInputValue mt-2"
                    required
                    onChange={(e) => {
                      setAllInputValueDataDetails({
                        ...allInputValueDataDetails,
                        [name]: e.target.value,
                      });
                      var tempValue = {
                        label: e.target.value,
                        value: e.target.value,
                      };
                      allInputValueForFormulaDataDetails[name] = tempValue;
                      setAllInputValueForFormulaDataDetails((prev) => {
                        const temp__details = [...prev];
                        return temp__details;
                      });
                      console.log(allInputValueForFormulaDataDetails);
                    }}
                  />
                  {errorsInputDetails
                    .filter((err) => err.index === name)
                    .map((err, i) => (
                      <div style={{ color: "#FF0000" }} key={i}>
                        This Field is required
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
          <div class="col">
            {dropdownDataDetails.map((item, name) => {
              return (
                <div className="d-flex align-items-center ">
                  <div className="w-100">
                    <Select
                      class="form-select w-100"
                      className="w-[100%] mt-2"
                      name={`drop${name}`}
                      aria-label="Default select example"
                      options={selectedOptionDetails[name]}
                      
                      id={`dropValue${name}`}
                      onChange={(e) => {}}
                      required
                    ></Select>
                    {errorsDropDownDetails
                      .filter((err) => err.index === name)
                      .map((err, i) => (
                        <div style={{ color: "#FF0000" }} key={i}>
                          This Field is required
                        </div>
                      ))}
                  </div>
                  <div className="ms-2">
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      className="footerColor"
                      data-toggle="modal"
                      data-target={`#exampleModal${name}`}
                      data-id={name}
                      onClick={() => {
                        handleModalMenu();
                        setCurrentDropSelectedDetails(name);
                        setShowDropDownModalDetails(true);
                      }}
                    ></FontAwesomeIcon>
                  </div>
                </div>
              );
            })}
          </div>
          <div class="col">
            {checkboxDataDetails.map((item, name) => {
              return (
                <div className="">
                  <TextField
                    type="text"
                    name={`check${name}`}
                    id={name}
                    variant="outlined"
                    size="small"
                    className="getInputValue mt-2"
                    placeholder="Checkbox Field"
                    onChange={(e) => {
                      setAllDataDetails({
                        ...allDataDetails,
                        [allDataDetails.length]: e.target.value,
                      });
                      setAllCheckValueDataDetails({
                        ...allCheckValueDataDetails,
                        [name]: e.target.value,
                      });
                    }}
                  />
                  {errorsCheckDetails
                    .filter((err) => err.index === name)
                    .map((err, i) => (
                      <div style={{ color: "#FF0000" }} key={i}>
                        This Field is required
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
          <div class="col">
            {dateDataDetails.map((item, name) => {
              return (
                <div className="">
                  <TextField
                    type="text"
                    name={`input${name}`}
                    id={name}
                    variant="outlined"
                    size="small"
                    placeholder="Date Field"
                    className="getInputValue mt-2"
                    onChange={(e) => {
                      setAllDataDetails({
                        ...allDataDetails,
                        [allDataDetails.length]: e.target.value,
                      });
                      setAllDateValueDataDetails({
                        ...allDateValueDataDetails,
                        [name]: e.target.value,
                      });
                    }}
                  />
                  {errorsDateDetails
                    .filter((err) => err.index === name)
                    .map((err, i) => (
                      <div style={{ color: "#FF0000" }} key={i}>
                        This Field is required
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
          <div class="col">
            {textareaDataDetails.map((item, name) => {
              return (
                <div>
                  <TextField
                    type="text"
                    name={`input${name}`}
                    id={name}
                    variant="outlined"
                    size="small"
                    placeholder="textarea field"
                    className="getInputValue mt-2"
                    onChange={(e) => {
                      setAllDataDetails({
                        ...allDataDetails,
                        [allDataDetails.length]: e.target.value,
                      });
                      setAllTextAreaValueDataDetails({
                        ...allTextAreaValueDataDetails,
                        [name]: e.target.value,
                      });
                    }}
                  />
                  {errorsTextareaDetails
                    .filter((err) => err.index === name)
                    .map((err, i) => (
                      <div style={{ color: "#FF0000" }} key={i}>
                        This Field is required
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
          <div class="col">
            {imageDataDetails.map((item, name) => {
              return (
                <div>
                  <TextField
                    type="text"
                    name={`input${name}`}
                    id={name}
                    variant="outlined"
                    size="small"
                    placeholder="image field"
                    className="getInputValue mt-2"
                    onChange={(e) => {
                      setAllDataDetails({
                        ...allDataDetails,
                        [allDataDetails.length]: e.target.value,
                      });
                      setAllImageValueDataDetails({
                        ...allImageValueDataDetails,
                        [name]: e.target.value,
                      });
                    }}
                  />
                  {errorsImageDetails
                    .filter((err) => err.index === name)
                    .map((err, i) => (
                      <div style={{ color: "#FF0000" }} key={i}>
                        This Field is required
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        show={showDropDownModalDetails}
        onHide={handleDropClose}
        backdrop="true"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="text-black fw-bold">Select Menu</Modal.Title>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            onClick={handleDropClose}
          >
            X
          </button>
        </Modal.Header>

        <Modal.Body>
          {modalSpecificDataDetails
            .filter((person) => person.MenuName === "Master Entry")
            .map((filteredPerson) => (
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input
                      type="radio"
                      value={filteredPerson.SubMenuName}
                      name="dropValueField"
                      aria-label="Radio button for following text input"
                      onClick={(e) => {
                        setMenuId(filteredPerson.MenuId);
                      }}
                    />
                  </div>
                </div>
                <h4 className="text-black ms-2 fs-5">
                  {filteredPerson.SubMenuName}
                </h4>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <button
            style={{ backgroundColor: "#34C38F", border: "none" }}
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            aria-label="Close"
            onClick={(e) => {
              handleDropdownValue(currentDropSelectedDetails);
              setShow2(true);
            }}
          >
            Save changes
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showErrorModalDetails}
        onHide={handleErrorClose}
        backdrop="true"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            <h5 className="fw-bold">Warning!</h5>
          </Modal.Title>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            onClick={handleErrorClose}
          >
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <label>{errorMessageStringDetails}</label>
        </Modal.Body>

      </Modal>
      <Modal show={show2} onHide={() => setShow2(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{childModalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {dropdownName.map((item, i) => {
              console.log(item);
              return (
                <>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <input
                          type="radio"
                          value={item.ColumnName}
                          name="dropValueFieldCheck"
                          aria-label="Radio button for following text input"
                          onClick={(e) => {}}
                        />
                      </div>
                    </div>
                    <h4 className="text-black ms-2 fs-5">{item.ColumnName}</h4>
                  </div>
                </>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={(e) => {
                handleDropdown(currentDropSelectedDetails);
                setShow2(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </Grid>
  );
};

export default DoubleEntryChildData;
