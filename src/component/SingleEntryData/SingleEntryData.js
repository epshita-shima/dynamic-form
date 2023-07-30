import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import { FieldArray, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import Token from "../common/Token";
import { useLocation } from "react-router-dom";
import "./SingleEntryData.css";
import SingleEntryList from "./SingleEntryList";
import { handleAddRow } from "./SingleEntyAddRow";
const SingleEntryData = ({showTable, setShowTable}) => {
  const [openModal, setOpenModal] = useState(true);
  const [labelPosition, setLabelPosition] = useState([]);
  const [selectedListName, setSelectedListName] = useState([]);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [labelData, setLabelData] = useState([]);
  const [columnValues, setColumnValues] = useState([]);
  const [labelDataCopy, setLabelDataCopy] = useState([]);
  const [twoDimensionData, setTwoDimentionData] = useState([[]]);
  const [allModelDataTable, setAllModelDataTable] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [getDate, setGetDate] = useState([]);
  const [allInputValueData, setAllInputValueData] = useState(null);
  const [allDropValueData, setAllDropValueData] = useState(null);
  const [allCheckValueData, setAllCheckValueData] = useState(null);
  const [allDateValueData, setAllDateValueData] = useState(null);
  const [modalSpecificData, setModalSpecificData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

console.log({labelData},{labelDataCopy})
console.log(columnValues)
  const token = Token.token;
  const search = useLocation();
  const link = search.pathname.split("/");
  let id = link[2];

  useEffect(() => {
    const modelDataLabel = {
      procedureName: "",
      parameters: {},
    };
    modelDataLabel.procedureName = "prc_GetMasterInfoList";
    fetch("https://localhost:44372/api/GetData/GetInitialData", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(modelDataLabel),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == true) {
          const allModalData = JSON.parse(data.data);
          setAllModelDataTable(allModalData);
        } else {
          console.log(data);
        }
      });
  }, []);

  const modelData = {
    procedureName: "prc_GetPageInfo",
    parameters: {
      MenuId: id,
    },
  };
console.log(labelDataCopy)
  const handleLabelField = () => {
    console.log(modelData)
    setShowTable(true);
   
    fetch(`https://localhost:44372/api/GetData/GetDataById`, {
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
          const monthlySalesData = JSON.parse(data.data);
         
         if (labelData.length == 0 || labelData.length !== 0) {
            labelDataCopy[0]=monthlySalesData;
            labelData[0]=monthlySalesData;
           setColumnValues({})
          }
console.log(columnValues)
          var createColumnValuesObject = {};
          var multipleDateArrayField = [];
          labelData.map((item, index) => {
            multipleDateArrayField[index] = [];
            item.forEach((element, i) => {
              multipleDateArrayField[index][i] = {};
              console.log(element, i);
              multipleDateArrayField[index]["" + i]["ColumnName"] =
                element.ColumnName;
              multipleDateArrayField[index]["" + i]["Position"] =
                element.Position;
              multipleDateArrayField[index]["" + i]["ColumnType"] =
                element.ColumnType;
              multipleDateArrayField[index]["" + i]["CalculationType"] =
                element.CalculationType;
              multipleDateArrayField[index]["" + i]["CalculationKey"] =
                element.CalculationKey;
              multipleDateArrayField[index]["" + i]["CalculationFormula"] =
                element.CalculationFormula;
              multipleDateArrayField[index]["" + i]["IsDisable"] =
                element.IsDisable;
              multipleDateArrayField[index]["" + i]["ColumnValue"] = "";
              multipleDateArrayField[index]["" + i]["RelatedTable"] =
                element.RelatedTable;
              multipleDateArrayField[index]["" + i]["PageId"] = element.PageId;
              if (element.ColumnType == "datetime") {
                const newDate = new Date();
                var year = newDate.toLocaleString("default", {
                  year: "numeric",
                });
                var month = newDate.toLocaleString("default", {
                  month: "2-digit",
                });
                var day = newDate.toLocaleString("default", {
                  day: "2-digit",
                });
                var formattedDate = year + "-" + month + "-" + day;
                multipleDateArrayField[index]["" + i]["ColumnValue"] =
                  formattedDate;
              }
              createColumnValuesObject[element.ColumnName] = "";
              if (element.ColumnType == "datetime") {
                twoDimensionData[0][i] = new Date();
              }
            });
          });
          var multipleDateArrayFieldcopy = [];
          labelDataCopy.map((item, index) => {
            multipleDateArrayFieldcopy[index] = [];
            item.forEach((element, i) => {
              multipleDateArrayFieldcopy[index][i] = {};
              multipleDateArrayFieldcopy[index]["" + i]["ColumnName"] =
                element.ColumnName;
              multipleDateArrayField[index]["" + i]["Position"] =
                element.Position;
              multipleDateArrayFieldcopy[index]["" + i]["ColumnType"] =
                element.ColumnType;
              multipleDateArrayFieldcopy[index]["" + i]["ColumnValue"] = "";
              multipleDateArrayFieldcopy[index]["" + i]["CalculationType"] =
                element.CalculationType;
              multipleDateArrayFieldcopy[index]["" + i]["CalculationKey"] =
                element.CalculationKey;
              multipleDateArrayFieldcopy[index]["" + i]["CalculationFormula"] =
                element.CalculationFormula;
              multipleDateArrayFieldcopy[index]["" + i]["IsDisable"] =
                element.IsDisable;
              multipleDateArrayFieldcopy[index]["" + i]["RelatedTable"] =
                element.RelatedTable;
              multipleDateArrayField[index]["" + i]["PageId"] = element.PageId;
              if (element.ColumnType == "datetime") {
                const newDate = new Date();
                var year = newDate.toLocaleString("default", {
                  year: "numeric",
                });
                var month = newDate.toLocaleString("default", {
                  month: "2-digit",
                });
                var day = newDate.toLocaleString("default", {
                  day: "2-digit",
                });
                var formattedDate = year + "-" + month + "-" + day;
                multipleDateArrayFieldcopy[index]["" + i]["ColumnValue"] =
                  formattedDate;
              }
              createColumnValuesObject[element.ColumnName] = "";

              if (element.ColumnType == "datetime") {
                twoDimensionData[0][i] = new Date();
              }
              if (element.RelatedTable != "") {
                var dataTable = [];
                for (var modelArrayPosition in allModelDataTable)
                  dataTable.push([
                    modelArrayPosition,
                    allModelDataTable[modelArrayPosition],
                  ]);
                var dataMenuArr = [];
                console.log(dataTable);
                dataTable.map((ele) => {
                  if (ele[1][0].title == element.RelatedTable) {
                    ele[1].map((member) => {
                      var dataMenuArrLength = dataMenuArr.length;
                      dataMenuArr[dataMenuArrLength] = {};
                      dataMenuArr[dataMenuArrLength]["label"] = member.label;
                      dataMenuArr[dataMenuArrLength]["value"] = member.value;
                    });
                  }
                });
                console.log(dataMenuArr);
                setSelectedOption((prev) => {
                  const temp__details = [...prev];
                  temp__details[i] = dataMenuArr;
                  return temp__details;
                });
              }
            });
          });

          setLabelData(multipleDateArrayField);
          setLabelDataCopy(multipleDateArrayFieldcopy);
          console.log(twoDimensionData);
          setTwoDimentionData(twoDimensionData);
          setGetDate([...getDate, new Date()]);
            setColumnValues([...columnValues, createColumnValuesObject]);
        } else {
          console.log(data);
        }
      });
  };
  const handleCalculation = (calculationFormula, i, countOfInput) => {
    var calculationValue1 = 0;
    var calculationValue = 0;
    var target = 0;
    const calculationFormulaField = JSON.parse(calculationFormula);
    const calculateFormulaField = calculationFormulaField.Formula;
    console.log(calculateFormulaField[0].Field1);

    labelData[i].map((item, pos) => {
      if (item.ColumnName == calculateFormulaField[0].Field1) {
        if (item.ColumnValue != "") calculationValue1 = item.ColumnValue;
      }
      if (item.ColumnName == calculateFormulaField[0].Field2) {
        if (item.ColumnValue != "") calculationValue = item.ColumnValue;
      }
      if (item.ColumnName == calculationFormulaField.Target) {
        target = pos;
      }
    });
    const result = parseFloat(calculationValue) * parseFloat(calculationValue1);
    labelData[i][target].ColumnValue = result;
  };

  const handleInputValue = (item, countOfInput, i) => {
    console.log(countOfInput, i);
  
    if (item.ColumnType == "textbox") {
      return (
        <td
          className={`dropTh${countOfInput} border`}
          draggable="false"
          // id={`item${randnum}${countOfInput}${i}`}
        >
          <div
            draggable="false"
          >
            {/* {replaceFunction("input", countOfInput)} */}
            <input
              type="text"
              draggable="false"
              id={`item${i}`}
              size="small"
              // disabled={
              //   labelData[i][countOfInput]["IsDisable"]?.toLowerCase?.() ===
              //   "true"
              // }
              name={`${i}input`}
              style={{ marginTop: "3px" }}
              value={labelData[i][countOfInput]["ColumnValue"]}
              className="getValue form-control"
              placeholder={item.ColumnName}
              onChange={(e) => {
                const { value } = e.target;
                columnValues[i][item.ColumnName] = value;

                setLabelData((prevArr) => {
                  const result = [...prevArr];
                  result[i][countOfInput].ColumnValue = value;
                  return result;
                });
                console.log(labelData);
                setColumnValues(columnValues);
                if (
                  labelData[i][countOfInput]["CalculationType"] == "dynamic"
                ) {
                  if (item.ColumnName == item.CalculationKey) {
                    const calculationFormula = item.CalculationFormula;
                    handleCalculation(calculationFormula, i, countOfInput);
                  } else {
                    console.log("hi");
                  }
                }
              }}
            />
          </div>
          <div
            className="droptarget1 border"
            style={{ display: "none" }}
            draggable="false"
          >
            Drop
          </div>
        </td>
      );
    }
    if (item.ColumnType == "dropdown") {
      return (
        <td
          className={`dropTh${countOfInput} border `}
          draggable="false" //change dragable true to work again
          // id={`item${randnum}${countOfInput}${i}`}
        >
          <div draggable="false">
            {/* {replaceFunction("dropdown", i)} */}
            {/* <Select
              id={`${i}drop`}
              name={`${i}drop`}
              className="form-select"
              class="w-[100%] "
              aria-label="Default select example"
              // placeholder={`${allDropValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
              options={selectedOption[countOfInput]}
              // value={selectedOption[countOfInput].find(
              //   (x) => x.value == labelData[i][countOfInput]["ColumnValue"]
              // )}
              onChange={(e) => {
                const { value } = e;
                columnValues[i][item?.ColumnName] = value;
                setLabelData((prevArr) => {
                  const result = [...prevArr];
                  console.log(i, countOfInput, labelData, result);
                  result[i][countOfInput].ColumnValue = value;
                  return result;
                });
                setColumnValues(columnValues);
              }}
            ></Select> */}
              <div className="w-100">
              <Select
                    class="form-select"
                    aria-label="Default select example"
                    name="groupId"
                    id="groupName"
                    placeholder="Select.."
                    options={selectedOption[countOfInput]}
              //       value={selectedOption[countOfInput].find(
              //   (x) => x.value == labelData[i][countOfInput]["ColumnValue"]
              // )}
                    onChange={(e) => {
                      // category.groupId = e.value;
                    }}
                  ></Select>
              </div>
          </div>
          <div
            className="droptarget1 border" // remove 1 for dragable work
            style={{ display: "none" }}
            draggable="false"
          >
            Drop
          </div>
        </td>
      );
    }
    if (item.ColumnType == "checkbox") {
      return (
        <td
          className={`dropTh${countOfInput} border  text-center`}
          draggable="false" //change dragable true to work again
          // id={`item${randnum}${countOfInput}${i}`}
        >
          <div draggable="false">
            {/* {replaceFunction("checkbox", i)} */}
            <FormGroup>
              <FormControlLabel
                name={`box${i}`}
                id={`check${i}`}
                style={{ marginTop: "3px",textAlign:'center' }}
                control={<Checkbox />}
                label="Label"
                checked={labelData[i][countOfInput]["ColumnValue"]}
                onChange={(e) => {
                  const { checked } = e.target;
                  console.log(checked);
                  if (checked) {
                    columnValues[i][item.ColumnName] = "true";
                    setLabelData((prevArr) => {
                      const result = [...prevArr];
                      console.log(i, countOfInput, labelData, result);
                      result[i][countOfInput].ColumnValue = true;
                      return result;
                    });
                    setColumnValues(columnValues);
                  } else {
                    columnValues[i][item.ColumnName] = "false";
                    setLabelData((prevArr) => {
                      const result = [...prevArr];
                      console.log(i, countOfInput, labelData, result);
                      result[i][countOfInput].ColumnValue = false;
                      return result;
                    });
                    setColumnValues(columnValues);
                  }
                  // const {value,name}=e.checked
                }}
              />
            </FormGroup>
          </div>
          <div
            className="droptarget1 border" // remove 1 for dragable work
            style={{ display: "none" }}
            draggable="false"
          >
            Drop
          </div>
        </td>
      );
    }
    if (item.ColumnType == "radiobutton") {
      return (
        <td
          className={`dropTh${countOfInput} border`}
          draggable="false"
          // id={`item${randnum}${countOfInput}${i}`}
        >
          <div
            draggable="false"
          >
            {/* {replaceFunction("input", countOfInput)} */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`radio`}
                id={`radio${i}`}
                checked={labelData[i][countOfInput]["ColumnValue"]}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  if (checked) {
                    columnValues[i][item.ColumnName] = "true";
                    labelData[i][countOfInput].ColumnValue = "true";
                    // setLabelData((prevArr) => {
                    //   const result = [...prevArr];
                    //   console.log(i,countOfInput,labelData,result);
                    //   result[i][countOfInput].ColumnValue = "true";
                    //   return result;
                    // });
                    setColumnValues(columnValues);
                    setLabelData(labelData);
                    columnValues.forEach((e, index) => {
                      if (index != i) {
                        columnValues[index][item.ColumnName] = "";

                        setColumnValues(columnValues);

                        labelData[index][countOfInput].ColumnValue = "";

                        setLabelData(labelData);
                      }
                    });
                    setLabelData((prevArr) => {
                      const result = [...prevArr];
                      return result;
                    });
                  }
                }}
              />
              <label className="form-check-label" for={`radio${i}`}>
                Radio
              </label>
            </div>
          </div>
          <div
            className="droptarget1 border"
            style={{ display: "none" }}
            draggable="false"
          >
            Drop
          </div>
        </td>
      );
    }
    if (item.ColumnType == "datetime") {
      return (
        <td
          className={`dropTh${countOfInput} border text-center`}
          draggable="false" //change dragable true to work again
          // id={`item${randnum}${countOfInput}${i}`}
        >
          <div draggable="false">
            {/* {replaceFunction("date", i)} */}

            <DatePicker
              dateFormat="yyyy-MM-dd"
              className="input text-center w-75"
              name={`date${i}`}
              id={`date${i}`}
              placeholderText="Click to select a date"
              value={labelData[i][countOfInput]["ColumnValue"]}
              selected={twoDimensionData[i][countOfInput]}
              onChange={(e) => {
                // const date_data = getDate[i];
                // setStartDate(startDate > new Date() ? new Date() : startDate);
                // if (startDate == startDate) {
                //   setIsDate(startDate ? false : true);
                // }
                // columnValues[i][item.ColumnName] =  formattedDate;
                // setColumnValues(columnValues)

                var multipleDateArrayField = [...twoDimensionData];
                multipleDateArrayField[i][countOfInput] = e;
                const newDate = multipleDateArrayField[i][countOfInput];
                var year = newDate.toLocaleString("default", {
                  year: "numeric",
                });
                var month = newDate.toLocaleString("default", {
                  month: "2-digit",
                });
                var day = newDate.toLocaleString("default", {
                  day: "2-digit",
                });
                var formattedDate = year + "-" + month + "-" + day;

                columnValues[i][item.ColumnName] = formattedDate;
                setLabelData((prevArr) => {
                  const result = [...prevArr];
                  console.log(i, countOfInput, labelData, result);
                  result[i][countOfInput].ColumnValue = formattedDate;
                  return result;
                });
                getDate.push(e);
                setTwoDimentionData(multipleDateArrayField);
                setColumnValues(columnValues);
              }}
            />
          </div>
          <div
            className="droptarget1 border" // remove 1 for dragable work
            style={{ display: "none" }}
            draggable="false"
          >
            Drop
          </div>
        </td>
      );
    }
  };

  const handleDropdownValue = (i) => {
   
    var radioName = document.querySelector(
      'input[name="dropValueField"]:checked'
    ).value;

    setSelectedListName(radioName);
    var dataTable = [];
    for (var modelArrayPosition in allModelDataTable)
      dataTable.push([
        modelArrayPosition,
        allModelDataTable[modelArrayPosition],
      ]);

    var dataMenuArr = [];
    dataTable.map((element) => {
      console.log(element);
      if (element[1][0].title == radioName) {
        element[1].map((member) => {
          var dataMenuArrLength = dataMenuArr.length;
          dataMenuArr[dataMenuArrLength] = {};
          dataMenuArr[dataMenuArrLength]["label"] = member.label;
          dataMenuArr[dataMenuArrLength]["value"] = member.value;
          var allDropValueDataLength = 0;
          if (allDropValueData != null) {
            allDropValueDataLength = Object.keys(allDropValueData).length;
          }
console.log( dataMenuArr )
          setAllDropValueData({
            ...allDropValueData,
            [allDropValueDataLength]: radioName,
          });
        });
      }
    });
    setSelectedOption((prev) => {
      const temp__details = [...prev];
      temp__details[i] = dataMenuArr;
      return temp__details;
    });
  };

  const handleSubmit = (e, i) => {
    e.preventDefault();
    const modelPurchase = {
      tableNameMaster: "TableXSingleInfo",
      tableNameChild: "TableYDetailsInfo",
      columnNamePrimary: "TableXId",
      columnNameForign: "TableXId",
      columnNameSerialNo: "",
      serialType: "",
      IsFlag: "",
      data: {
        TableXId: "",
        MakeDate: "2022-01-01",
        MakeBy: "Test",
        PageSingleInfoId: "Test",
      },
      details: [],
    };
    columnValues.map((item) => {
      modelPurchase.details.push(item);
    });
    console.log(modelPurchase);
  };

  document.ondragstart = function (event, i) {
    if (event.target.nodeName == "TH") {
      var allelement = document.querySelectorAll(".droptargettd");
      allelement.forEach((element) => {
        element.style.display = "block";
      });
      event.dataTransfer.setData("Text", event.target.className);
    } else {
      var allelement = document.querySelectorAll(".droptarget");
      allelement.forEach((element) => {
        element.style.display = "block";
      });

      event.dataTransfer.setData("Text", event.target.id);
    }
  };

  document.ondragover = function (event) {
    event.preventDefault();
  };

  document.ondrop = function (event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");

    if (
      document.getElementsByClassName(data).length != 0 &&
      document.getElementsByClassName(data)[0].nodeName == "TH"
    ) {
      if (event.target.className == "droptargettd border") {
        var allelement = document.querySelectorAll(".droptargettd");
        allelement.forEach((element) => {
          element.style.display = "none";
        });
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons
          .fire({
            title: "Position?",
            text: "Where to put the data?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Right",
            cancelButtonText: "Left",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              insertBeforeth(
                document.getElementsByClassName(data),
                event.target.parentElement.className
              );
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              insertAfterth(
                document.getElementsByClassName(data),
                event.target.parentElement.className
              );
            }
          });
      }
    } else {
      var allelement = document.querySelectorAll(".droptarget");
      allelement.forEach((element) => {
        element.style.display = "none";
      });
      if (event.target.className == "droptarget border") {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons
          .fire({
            title: "Position?",
            text: "Where to put the data?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Right",
            cancelButtonText: "Left",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              insertBefore(
                document.getElementById(data),
                event.target.parentElement.id
              );
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              insertAfter(
                document.getElementById(data),
                event.target.parentElement.id
              );
              console.log(event.target.parentElement.id);
            }
          });
      }

      document.getElementsByClassName("droptarget").className = "d-none";
    }
  };

  function insertBefore(newNode, refNode) {
    console.log(newNode);
    var getID = document.getElementById(refNode);
    document
      .getElementById(refNode)
      .parentNode.insertBefore(
        newNode,
        document.getElementById(refNode).nextSibling
      );
  }

  function insertAfter(newNode, refNode) {
    console.log(newNode, refNode);
    var fromthid = "";
    var fromthclass = "";
    var tothid = "";
    var tothclass = "";

    fromthid = newNode.id;
    fromthclass = newNode.className;
    tothid = refNode;
    tothclass = document.getElementById(refNode).className;

    console.log(fromthid, fromthclass, tothid, tothclass);

    document
      .getElementById(refNode)
      .parentNode.insertBefore(newNode, document.getElementById(refNode));

    document.getElementById(fromthid).setAttribute("id", tothid);
    //document.getElementById(tothid).setAttribute("id",fromthid);
  }

  function insertAfterth(newNode, refNode) {
    var allelement = document.getElementsByClassName(refNode);
    var arr = [...allelement];

    var fromNode = refNode.replace("dropTh", "");
    fromNode = fromNode.replace(" border", "");

    var frompositions = 0;
    var topositions = 0;

    var toNode = newNode[0].className.replace("dropTh", "");
    toNode = toNode.replace(" border", "");

    var b = document.getElementsByTagName("th");

    for (var index = 0; index < b.length; index++) {
      if (b[index].className == refNode) {
        topositions = index;
      } else if (index == toNode) {
        frompositions = index;
      }
    }
    console.log(frompositions, topositions);
    if (topositions < 0) {
      topositions = 0;
    }
    if (frompositions < 0) {
      frompositions = 0;
    }
    var multipleDateArrayField = [...labelData];
    multipleDateArrayField.map((item, index) => {
      const e = item.splice(frompositions, 1)[0];
      console.log(e); // ['css']
      item.splice(topositions, 0, e);

      multipleDateArrayField[index] = item;
    });

    console.log(multipleDateArrayField);
    setLabelData(multipleDateArrayField);

    var multipleDateArrayFieldcopy = [...labelDataCopy];
    multipleDateArrayFieldcopy.map((item, index) => {
      const e = item.splice(frompositions, 1)[0];
      console.log(e); // ['css']
      item.splice(topositions, 0, e);

      multipleDateArrayFieldcopy[index] = item;
    });

    console.log(multipleDateArrayField);
    setLabelDataCopy(multipleDateArrayFieldcopy);

    // labelData = multipleDateArrayField;

    var tempjson = [];
    console.log(labelData);
    labelData.map((item, index) => {
      tempjson[index] = {};
      item.map((e, i) => {
        var dataMenuArr = [];
        if (item.ColumnType == "datetime") {
          twoDimensionData[index][i] = item.ColumnValue;
        }
        console.log(e, tempjson, columnValues[index][e.ColumnName]);
        tempjson["" + index][e.ColumnName] = columnValues[index][e.ColumnName];
        console.log(item, index, i);
        if (item[i].RelatedTable != null) {
          var dataTable = [];
          for (var modelArrayPosition in allModelDataTable)
            dataTable.push([
              modelArrayPosition,
              allModelDataTable[modelArrayPosition],
            ]);

          console.log(dataTable);

          dataTable.map((ele) => {
            console.log(ele[1]);
            if (ele[1][0].title == item[i].RelatedTable) {
              ele[1].map((member) => {
                var dataMenuArrLength = dataMenuArr.length;
                console.log(member, dataMenuArrLength);
                dataMenuArr[dataMenuArrLength] = {};
                dataMenuArr[dataMenuArrLength]["label"] = member.label;
                dataMenuArr[dataMenuArrLength]["value"] = member.value;
              });
            }
          });
        }

        console.log(dataMenuArr);
        setSelectedOption((prev) => {
          const temp__details = [...prev];
          temp__details[i] = dataMenuArr;
          return temp__details;
        });
      });
    });
    setTwoDimentionData(twoDimensionData);
    setColumnValues(tempjson);
  }

  function insertBeforeth(newNode, refNode) {
    var allelement = document.getElementsByClassName(refNode);
    var arr = [...allelement];

    var fromNode = refNode.replace("dropTh", "");
    fromNode = fromNode.replace(" border", "");

    var frompositions = 0;
    var topositions = 0;

    var toNode = newNode[0].className.replace("dropTh", "");
    toNode = toNode.replace(" border", "");

    var b = document.getElementsByTagName("th");

    for (var index = 0; index < b.length; index++) {
      if (b[index].className == refNode) {
        topositions = index - 1;
      } else if (index == toNode) {
        frompositions = index;
      }
    }
    console.log(frompositions, topositions);
    if (topositions < 0) {
      topositions = 0;
    }
    if (frompositions < 0) {
      frompositions = 0;
    }
    var multipleDateArrayField = [...labelData]; //JSON.parse(JSON.stringify(labelData));
    multipleDateArrayField.map((item, index) => {
      const e = item.splice(frompositions, 1)[0];
      console.log(e); // ['css']
      item.splice(parseInt(topositions) + 1, 0, e);

      multipleDateArrayField[index] = item;
    });
    console.log(multipleDateArrayField);
    setLabelData(multipleDateArrayField);

    var multipleDateArrayFieldcopy = [...labelDataCopy];
    multipleDateArrayFieldcopy.map((item, index) => {
      const e = item.splice(frompositions, 1)[0];
      console.log(e); // ['css']
      item.splice(parseInt(topositions) + 1, 0, e);

      multipleDateArrayFieldcopy[index] = item;
    });

    console.log(multipleDateArrayField);
    setLabelDataCopy(multipleDateArrayFieldcopy);

    // labelData = multipleDateArrayField;

    var tempjson = [];
    labelData.map((item, index) => {
      tempjson[index] = {};
      item.map((e, i) => {
        if (item.ColumnType == "datetime") {
          twoDimensionData[index][i] = e.ColumnValue;
        }
        console.log(e, tempjson, columnValues[index][e.ColumnName], index, i);
        tempjson["" + index][e.ColumnName] = columnValues[index][e.ColumnName];

        labelData.map((item, index) => {
          tempjson[index] = {};
          item.map((e, i) => {
            var dataMenuArr = [];
            if (item.ColumnType == "datetime") {
              twoDimensionData[index][i] = item.ColumnValue;
            }
            console.log(e, tempjson, columnValues[index][e.ColumnName]);
            tempjson["" + index][e.ColumnName] =
              columnValues[index][e.ColumnName];
            console.log(item, index, i);
            if (item[i].RelatedTable != null) {
              var dataTable = [];
              for (var modelArrayPosition in allModelDataTable)
                dataTable.push([
                  modelArrayPosition,
                  allModelDataTable[modelArrayPosition],
                ]);

              console.log(dataTable);

              dataTable.map((ele) => {
                console.log(ele[1]);
                if (ele[1][0].title == item[i].RelatedTable) {
                  ele[1].map((member) => {
                    var dataMenuArrLength = dataMenuArr.length;
                    console.log(member, dataMenuArrLength);
                    dataMenuArr[dataMenuArrLength] = {};
                    dataMenuArr[dataMenuArrLength]["label"] = member.label;
                    dataMenuArr[dataMenuArrLength]["value"] = member.value;
                  });
                }
              });
            }

            console.log(dataMenuArr);
            setSelectedOption((prev) => {
              const temp__details = [...prev];
              temp__details[i] = dataMenuArr;
              return temp__details;
            });
          });
        });
      });
    });
    setTwoDimentionData(twoDimensionData);
    setColumnValues(tempjson);

    // arr.forEach((element, i) => {
    //   element.parentNode.insertBefore(newNode[i], element.nextSibling);
    // });
  }
 
  return (
    <Grid className="shadow-lg p-4">
      <Formik
        initialValues={{}}
        render={({ values, setFieldValue }) => {
          return (
            <form>
              <h2
                style={{
                  textAlign: "right",
                  fontSize: "32px",
                  color: "purple",
                }}
              >
                {allModelDataTable.MenuName}
              </h2>
              <div className="mt-2">
               {
                showTable ? "" : (
                  <Button
                  variant="contained"
                  type="button"
                  style={{ marginLeft: "5px", background: "#5A6691" }}
                  onClick={(e, index) => {
                    handleLabelField();
                  }}
                >
                  Show Data
                </Button>
                )
               }
                {showTable ? (
                  <>
                    <Button
                      variant="contained"
                      className="ms-2"
                      type="submit"
                      onClick={(e, index) => {
                        handleSubmit(e, index);
                      }}
                    >
                      Save
                    </Button>

                    <Button
                      type="button"
                      variant="contained"
                      style={{ marginLeft: "5px", background: "#66CBFF" }}
                      onClick={(e) => {
                        handleAddRow({
                          columnValues,
                          setGetDate,
                          getDate,
                          twoDimensionData,
                          setLabelData,
                          labelDataCopy,
                          setTwoDimentionData,
                        });
                      }}
                    >
                      Add row
                    </Button>

                    <Button
                      variant="contained"
                      type="button"
                      style={{ marginLeft: "5px", background: "red" }}
                      onClick={(e, index) => {
                        if (showDeleteIcon == false) {
                          setShowDeleteIcon(true);
                        } else {
                          setShowDeleteIcon(false);
                        }
                      }}
                    >
                      Delete Column
                    </Button>
                  </>
                ) : (
                  ""
                )}
              </div>
              <br />
              <FieldArray
                render={(arrayHelpers) => {
                  console.log(labelData)
                  return (
                    <div
                      div
                      className={`shadow-lg p-4`}
                      style={{ visibility: showTable ? "visible" : "hidden" }}
                    >
                      <SingleEntryList
                        token={token}
                        startDate={startDate}
                        labelData={labelData}
                        setLabelData={setLabelData}
                        setLabelDataCopy={setLabelDataCopy}
                        setLabelPosition={setLabelPosition}
                        showDeleteIcon={showDeleteIcon}
                        setColumnValues={setColumnValues}
                        columnValues={columnValues}
                        setShowDeleteIcon={setShowDeleteIcon}
                        setModalSpecificData={setModalSpecificData}
                        setOpenModal={setOpenModal}
                        labelDataCopy={labelDataCopy}
                        handleDropdownValue={handleDropdownValue}
                        handleInputValue={handleInputValue}
                        modalSpecificData={modalSpecificData}
                        labelPosition={labelPosition}
                        selectedListName={selectedListName}
                      ></SingleEntryList>
                    </div>
                  );
                }}
              ></FieldArray>
            </form>
          );
        }}
      ></Formik>
    </Grid>
  );
};

export default SingleEntryData;
