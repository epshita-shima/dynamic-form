import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import { FieldArray, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import Token from "../common/Token";
import { useLocation } from "react-router-dom";
import "./SingleEntryData.css";
import SingleEntryList from "./SingleEntryList";
import { handleAddRow } from "./SingleEntyAddRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import useChildMenu from "../customHooks/useChildMenu";
import swal from "sweetalert";
const SingleEntryData = ({ showTable, setShowTable }) => {
  const [labelDataSingle, setLabelDataSingle] = useState([]);
  const [openModal, setOpenModal] = useState(true);
  const [labelPosition, setLabelPosition] = useState([]);
  const [selectedListName, setSelectedListName] = useState([]);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [labelData, setLabelData] = useState([]);
  const [columnValues, setColumnValues] = useState([]);
  const [columnValuesSingle, setColumnValuesSingle] = useState([]);
  const [labelDataCopy, setLabelDataCopy] = useState([]);
  const [twoDimensionData, setTwoDimentionData] = useState([[]]);
  const [allModelDataTable, setAllModelDataTable] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedOptionParent, setSelectedOptionParent] = useState([]);
  const [getDate, setGetDate] = useState([]);
  const [allInputValueData, setAllInputValueData] = useState(null);
  const [allDropValueData, setAllDropValueData] = useState(null);
  const [allCheckValueData, setAllCheckValueData] = useState(null);
  const [allDateValueData, setAllDateValueData] = useState(null);
  const [modalSpecificData, setModalSpecificData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [labelCount, setLabelCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState([[]]);
  const [selectedImageSingle, setSelectedImageSingle] = useState([]);
  const [selectImagePopupSingle, setSelectedImagePopupSingle] = useState(null);
  const [selectImagePopup, setSelectedImagePopup] = useState(null);
  const [childPageType, setChildPageType] = useState([]);
  const [parentTableName, setParentTableName] = useState("");
  const [childTableName, setChildTableName] = useState("");
  const [childMenu, setChildMenu] = useChildMenu([]);
const [totalAmount,setTotalAmount]=useState('')
const [totalAmountSingle,setTotalAmountSingle]=useState("")
const [childModalTitle,setChildModalTitle]=useState('')
console.log(totalAmount)
  console.log(labelData)
  const token = Token.token;
  const search = useLocation();
  const link = search.pathname.split("/");
  let id = link[2];
 const childTable=link[1]
console.log({childTableName},{parentTableName})
  console.log(columnValues)
  useEffect(() => {
    const modelDataLabel = {
      procedureName: "",
      parameters: {
        TableName: "",
      },
    };

    modelDataLabel.procedureName = "prc_GetMasterInfoList";
    modelDataLabel.parameters.TableName = childTable;
    console.log(modelDataLabel)
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
  const modelDataDetails = {
    procedureName: "prc_GetPageInfoDetails",
    parameters: {
      MenuId: id,
    },
  };

  const handleLabelField = () => {

    setShowTable(true);
    const findPageType = childMenu.find((item) => item.MenuId == id);
    setChildPageType(findPageType);
    if (findPageType?.PageType == "doubleEntryPage") {
      fetch(`https://localhost:44372/api/GetData/GetMultipleDataByParam`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(modelDataDetails),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == true) {
            const showSingleData = JSON.parse(data.data);
         console.log(showSingleData)
         const getParentTableName=showSingleData.Tables3
         const tableName=getParentTableName[0].TableName
         setParentTableName(tableName)
         const childName=tableName+"details"
         setChildTableName(childName)
         console.log(getParentTableName)
            labelDataSingle[0] = showSingleData.Tables1;
            setLabelDataSingle(labelDataSingle);
            var createColumnValuesObjectSingle = {};
            labelDataSingle.map((item) => {
              return item.map((items) => {
                return (createColumnValuesObjectSingle[items.ColumnName] = "");
              });
            });
            labelDataSingle.map((elem) => {
              console.log(elem)
              elem.forEach((element, i) => {
                if (element.RelatedTable != "") {
                  const modelDataLabel = {
                    procedureName: "",
                    parameters: {
                      TableName: "",
                    },
                  };
                  modelDataLabel.procedureName = "prc_GetMasterInfoList";
                  modelDataLabel.parameters.TableName = `${element.ColumnName}`;
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
                      if (data.status == true) {
                        const allModalData = JSON.parse(data.data);
                        var dataTable = [];
                        for (var modelArrayPosition in allModalData)
                          dataTable.push([
                            modelArrayPosition,
                            allModalData[modelArrayPosition],
                          ]);
                       
                        var dataMenuArr = [];
                        dataTable.map((elements) => {
                          elements.map((member) => {
                            for (var key in member) {
                              if (member.hasOwnProperty(key)) {
                                if (key != "0") {
                                  if (key == element.ColumnValueField) {
                                    var dataMenuArrLength = dataMenuArr.length;
                                    dataMenuArr[dataMenuArrLength] = {};
                                    dataMenuArr[dataMenuArrLength]["value"] =
                                      member.ID;
                                    var val = member[key];
                                    dataMenuArr[dataMenuArrLength]["label"] =
                                      val;
                                  }
                                }
                              }
                            }
                            var allDropValueDataLength = 0;
                            if (allDropValueData != null) {
                              allDropValueDataLength =
                                Object.keys(allDropValueData).length;
                            }
                          });
                          // }
                          setSelectedOptionParent((prev) => {
                            const temp__details = [...prev];
                            temp__details[i] = dataMenuArr;
                            return temp__details;
                          });
                        });
                       
                      } else {
                        console.log(data);
                      }
                    });
            
                }
              });
            });
            columnValues.forEach((item, i) => {
              delete columnValues[i];
              setColumnValues(columnValues);
            });
            if (labelData.length == 0) {
              console.log(showSingleData.Tables2);
              labelDataCopy[0] = showSingleData.Tables2;
              labelData[0] = showSingleData.Tables2;
              // columnValues.forEach((item, i) => {
              //   delete columnValues[i];
              //   setColumnValues(columnValues);
              // });
            } else {
              labelData.forEach((item, i) => {
                delete labelData[i];
                setLabelDataCopy(labelData);
              });
              labelDataCopy[0] = showSingleData.Tables2;
              labelData[0] = showSingleData.Tables2;
              columnValues.forEach((item, i) => {
                delete columnValues[i];
                setColumnValues(columnValues);
              });
            }
            var createColumnValuesObject = {DetailsId:"newID()",ID:""};
            var multipleDateArrayField = [];
            labelData.map((item, index) => {
              multipleDateArrayField[index] = [];
              item.forEach((element, i) => {
                setLabelCount(i + 2);
                multipleDateArrayField[index][i] = {};

                multipleDateArrayField[index]["" + i]["DetailsId"] =
                 "newID()";
                multipleDateArrayField[index]["" + i]["ID"] =
                 "";
                multipleDateArrayField[index]["" + i]["ColumnName"] =
                  element.ColumnName;
                multipleDateArrayField[index]["" + i]["ColumnNameWithSpace"] =
                  element.ColumnNameWithSpace;
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
                  multipleDateArrayField[index]["" + i]["ColumnValueField"] =
                  element?.ColumnValueField;
                multipleDateArrayField[index]["" + i]["PageId"] =
                  element.PageId;
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
                if (element.RelatedTable != "") {
                  const modelDataLabel = {
                    procedureName: "",
                    parameters: {
                      TableName: "",
                    },
                  };
                  modelDataLabel.procedureName = "prc_GetMasterInfoList";
                  modelDataLabel.parameters.TableName = `${element.ColumnName}`;
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
                      if (data.status == true) {
                        const allModalData = JSON.parse(data.data);
                        var dataTable = [];
                        for (var modelArrayPosition in allModalData)
                          dataTable.push([
                            modelArrayPosition,
                            allModalData[modelArrayPosition],
                          ]);
                          console.log(dataTable)
                        var dataMenuArr = [];
                        dataTable.map((elements) => {
                          console.log(elements)
                          elements.map((member) => {
                            console.log(member)
                            for (var key in member) {
                              if (member.hasOwnProperty(key)) {
                                if (key != "0") {
                                  console.log(element.ColumnValueField)
                                  if (key == element.ColumnValueField) {
                                    var dataMenuArrLength = dataMenuArr.length;
                                    dataMenuArr[dataMenuArrLength] = {};
                                    dataMenuArr[dataMenuArrLength]["value"] =
                                      member.ID;
                                    var val = member[key];
                                    dataMenuArr[dataMenuArrLength]["label"] =
                                      val;
                                  }
                                }
                              }
                            }
                            var allDropValueDataLength = 0;
                            if (allDropValueData != null) {
                              allDropValueDataLength =
                                Object.keys(allDropValueData).length;
                            }
                          });
                          // }
                          console.log(dataMenuArr)
                          setSelectedOption((prev) => {
                            console.log(prev)
                            const temp__details = [...prev];
                            temp__details[i] = dataMenuArr;
                            return temp__details;
                          });
                        });
                       
                      
                      } else {
                        console.log(data);
                      }
                    });
            
                }
              });
            });
            var multipleDateArrayFieldcopy = [];
            labelDataCopy.map((item, index) => {
              multipleDateArrayFieldcopy[index] = [];
              item.forEach((element, i) => {
                multipleDateArrayFieldcopy[index][i] = {};
                multipleDateArrayFieldcopy[index]["" + i]["DetailsId"] =
                 "newID()";
                multipleDateArrayFieldcopy[index]["" + i]["ID"] =
                 "";
                multipleDateArrayFieldcopy[index]["" + i]["ColumnName"] =
                  element.ColumnName;
                multipleDateArrayField[index]["" + i]["ColumnNameWithSpace"] =
                  element.ColumnNameWithSpace;
                multipleDateArrayField[index]["" + i]["Position"] =
                  element.Position;
                multipleDateArrayFieldcopy[index]["" + i]["ColumnType"] =
                  element.ColumnType;
                multipleDateArrayFieldcopy[index]["" + i]["ColumnValue"] = "";
                multipleDateArrayFieldcopy[index]["" + i]["CalculationType"] =
                  element.CalculationType;
                multipleDateArrayFieldcopy[index]["" + i]["CalculationKey"] =
                  element.CalculationKey;
                multipleDateArrayFieldcopy[index]["" + i][
                  "CalculationFormula"
                ] = element.CalculationFormula;
                multipleDateArrayFieldcopy[index]["" + i]["IsDisable"] =
                  element.IsDisable;
                multipleDateArrayFieldcopy[index]["" + i]["RelatedTable"] =
                  element.RelatedTable;
                  multipleDateArrayField[index]["" + i]["ColumnValueField"] =
                  element?.ColumnValueField;
                multipleDateArrayField[index]["" + i]["PageId"] =
                  element.PageId;
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
                  const modelDataLabel = {
                    procedureName: "",
                    parameters: {
                      TableName: "",
                    },
                  };
                  modelDataLabel.procedureName = "prc_GetMasterInfoList";
                  modelDataLabel.parameters.TableName = `${element.ColumnName}`;
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
                      if (data.status == true) {
                        const allModalData = JSON.parse(data.data);
                        var dataTable = [];
                        for (var modelArrayPosition in allModalData)
                          dataTable.push([
                            modelArrayPosition,
                            allModalData[modelArrayPosition],
                          ]);
                        var dataMenuArr = [];
                        dataTable.map((elements) => {
                          elements.map((member) => {
                            for (var key in member) {
                              if (member.hasOwnProperty(key)) {
                                if (key != "0") {
                                  if (key == element.ColumnValueField) {
                                    var dataMenuArrLength = dataMenuArr.length;
                                    dataMenuArr[dataMenuArrLength] = {};
                                    dataMenuArr[dataMenuArrLength]["value"] =
                                      member.ID;
                                    var val = member[key];
                                    dataMenuArr[dataMenuArrLength]["label"] =
                                      val;
                                  }
                                }
                              }
                            }
                            var allDropValueDataLength = 0;
                            if (allDropValueData != null) {
                              allDropValueDataLength =
                                Object.keys(allDropValueData).length;
                            }
                          });
                          // }
                        });
                        setSelectedOption((prev) => {
                          const temp__details = [...prev];
                          temp__details[i] = dataMenuArr;
                          return temp__details;
                        });
                      } else {
                        console.log(data);
                      }
                    });
            
                }
              });
            });

            setLabelData(multipleDateArrayField);
            setLabelDataCopy(multipleDateArrayFieldcopy);
            setTwoDimentionData(twoDimensionData);
            setGetDate([...getDate, new Date()]);
            setColumnValues([...columnValues, createColumnValuesObject]);
            setColumnValuesSingle([
              ...columnValuesSingle,
              createColumnValuesObjectSingle,
            ]);
          } else {
            console.log(data);
          }
        });
    }
    if (findPageType?.PageType == "singleEntryPage") {
      console.log('singlepage')
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
            const allData = JSON.parse(data.data);
            console.log(allData)
            const allLabelData = allData.Tables1;
            const getTableName = allData.Tables2;
            console.log(allLabelData )
            const childTableData = getTableName[0].TableName;
            setChildTableName(childTableData);
            if (labelData.length == 0) {
              labelDataCopy[0] = allLabelData;
              labelData[0] = allLabelData;
              // columnValues.forEach((item, i) => {
              //   delete columnValues[i];
              //   setColumnValues(columnValues);
              // });
            } else {
              labelData.forEach((item, i) => {
                delete labelData[i];
                setLabelDataCopy(labelData);
              });
              labelDataCopy[0] = allLabelData;
              labelData[0] = allLabelData;
              columnValues.forEach((item, i) => {
                delete columnValues[i];
                setColumnValues(columnValues);
              });
            }
            var createColumnValuesObject = {ID:"newID()"};

     
            var multipleDateArrayField = [];
            labelData.map((item, index) => {
              multipleDateArrayField[index] = [];
              item.forEach((element, i) => {
                console.log(element)
                setLabelCount(i + 2);
                multipleDateArrayField[index][i] = {};
                multipleDateArrayField[index]["" + i]["ID"] =
                  'newID()';
                multipleDateArrayField[index]["" + i]["ColumnName"] =
                  element.ColumnName;
                multipleDateArrayField[index]["" + i]["ColumnNameWithSpace"] =
                  element.ColumnNameWithSpace;
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
                multipleDateArrayField[index]["" + i]["ColumnValueField"] =
                  element?.ColumnValueField;
                multipleDateArrayField[index]["" + i]["PageId"] =
                  element.PageId;
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
                if (element.RelatedTable != "") {
                  const modelDataLabel = {
                    procedureName: "",
                    parameters: {
                      TableName: "",
                    },
                  };
                  modelDataLabel.procedureName = "prc_GetMasterInfoList";
                  modelDataLabel.parameters.TableName = `${element.ColumnName}`;
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
                      if (data.status == true) {
                        const allModalData = JSON.parse(data.data);
                        var dataTable = [];
                        for (var modelArrayPosition in allModalData)
                          dataTable.push([
                            modelArrayPosition,
                            allModalData[modelArrayPosition],
                          ]);
                       
                        var dataMenuArr = [];
                        dataTable.map((elements) => {
                          elements.map((member) => {
                            for (var key in member) {
                              if (member.hasOwnProperty(key)) {
                                if (key != "0") {
                                  if (key == element.ColumnValueField) {
                                    var dataMenuArrLength = dataMenuArr.length;
                                    dataMenuArr[dataMenuArrLength] = {};
                                    dataMenuArr[dataMenuArrLength]["value"] =
                                      member.ID;
                                    var val = member[key];
                                    dataMenuArr[dataMenuArrLength]["label"] =
                                      val;
                                  }
                                }
                              }
                            }
                            var allDropValueDataLength = 0;
                            if (allDropValueData != null) {
                              allDropValueDataLength =
                                Object.keys(allDropValueData).length;
                            }
                          });
                          // }
                        });
                      
                        setSelectedOption((prev) => {
                          const temp__details = [...prev];
                          temp__details[i] = dataMenuArr;
                          return temp__details;
                        });
                        
            console.log(columnValues);
                      } else {
                        console.log(data);
                      }
                    });
            
                }
              });
            });
            var multipleDateArrayFieldcopy = [];
            labelDataCopy.map((item, index) => {
              multipleDateArrayFieldcopy[index] = [];
              item.forEach((element, i) => {
                multipleDateArrayFieldcopy[index][i] = {};
                multipleDateArrayFieldcopy[index]["" + i]["ID"] =
                  "newID()";
                multipleDateArrayFieldcopy[index]["" + i]["ColumnName"] =
                  element.ColumnName;
                multipleDateArrayField[index]["" + i]["ColumnNameWithSpace"] =
                  element.ColumnNameWithSpace;
                multipleDateArrayField[index]["" + i]["Position"] =
                  element.Position;
                multipleDateArrayFieldcopy[index]["" + i]["ColumnType"] =
                  element.ColumnType;
                multipleDateArrayFieldcopy[index]["" + i]["ColumnValue"] = "";
                multipleDateArrayFieldcopy[index]["" + i]["CalculationType"] =
                  element.CalculationType;
                multipleDateArrayFieldcopy[index]["" + i]["CalculationKey"] =
                  element.CalculationKey;
                multipleDateArrayFieldcopy[index]["" + i][
                  "CalculationFormula"
                ] = element.CalculationFormula;
                multipleDateArrayFieldcopy[index]["" + i]["IsDisable"] =
                  element.IsDisable;
                multipleDateArrayFieldcopy[index]["" + i]["RelatedTable"] =
                  element.RelatedTable;
                multipleDateArrayFieldcopy[index]["" + i]["ColumnValueField"] =
                  element.ColumnValueField;
                multipleDateArrayFieldcopy[index]["" + i]["PageId"] =
                  element.PageId;
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
                  const modelDataLabel = {
                    procedureName: "",
                    parameters: {
                      TableName: "",
                    },
                  };
                  modelDataLabel.procedureName = "prc_GetMasterInfoList";
                  modelDataLabel.parameters.TableName = `${element.ColumnName}`;
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
                      if (data.status == true) {
                        const allModalData = JSON.parse(data.data);
                        setAllModelDataTable(allModalData);
                        var dataTable = [];
                        for (var modelArrayPosition in allModalData)
                          dataTable.push([
                            modelArrayPosition,
                            allModalData[modelArrayPosition],
                          ]);
                      
                        var dataMenuArr = [];
                        dataTable.map((elements) => {
                          elements.map((member) => {
                            for (var key in member) {
                              if (member.hasOwnProperty(key)) {
                                if (key != "0") {
                                  if (key == element.ColumnValueField) {
                                    var dataMenuArrLength = dataMenuArr.length;
                                    dataMenuArr[dataMenuArrLength] = {};
                                    dataMenuArr[dataMenuArrLength]["value"] =
                                      member.ID;
                                    var val = member[key];
                                    dataMenuArr[dataMenuArrLength]["label"] =
                                      val;
                                  }
                                }
                              }
                            }
                         
                            var allDropValueDataLength = 0;
                            if (allDropValueData != null) {
                              allDropValueDataLength =
                                Object.keys(allDropValueData).length;
                             
                            }
                          });
                          // }
                        });
                        
                        setSelectedOption((prev) => {
                          const temp__details = [...prev];
                          temp__details[i] = dataMenuArr;
                          return temp__details;
                        });
                      } else {
                        console.log(data);
                      }
                    });
            
                }
              });
            });

            setLabelData(multipleDateArrayField);
            setLabelDataCopy(multipleDateArrayFieldcopy);
            setTwoDimentionData(twoDimensionData);
            setGetDate([...getDate, new Date()]);
            setColumnValues([...columnValues, createColumnValuesObject]);
          } else {
            console.log(data);
          }
        });
    }
  };

  const handleSingleCalculation=(calculationFormula, i)=>{
    console.log(calculationFormula, i)
    var calculationValue1 = 0;
    var calculationValue = 0;
    var target = 0;
    const calculationFormulaField = JSON.parse(calculationFormula);
    const calculateFormulaField = calculationFormulaField[0].Formula;
    console.log(calculateFormulaField,calculationFormulaField[0]);

    labelDataSingle.map((items) => {
      items.map((item,pos)=>{
        console.log(item)
        console.log(item.ColumnName,item?.ColumnValue,calculateFormulaField[0],calculationFormulaField.Target);
        if (item.ColumnName.toUpperCase() == calculateFormulaField[0].Field1.toUpperCase()) {
          if (item?.ColumnValue != "") calculationValue1 = item.ColumnValue;
          console.log(item.ColumnValue)
        }
        if (item?.ColumnName.toUpperCase() == calculateFormulaField[0].Field2.toUpperCase()) {
          console.log(item?.ColumnValue)
          if (item?.ColumnValue != "") calculationValue = item?.ColumnValue;
        }
        if (item.ColumnName.toUpperCase() == calculationFormulaField[0].Target.toUpperCase()) {
          target = pos;
        }
       
      })
    });
    console.log(columnValues,i,target,calculationFormulaField[0].Target.toUpperCase())
    console.log(calculationValue,calculationValue1)
    if(calculationValue !=undefined && calculationValue1 !=undefined){
      const result = parseFloat(calculationValue) * parseFloat(calculationValue1);
      console.log(result)
      setTotalAmountSingle(result)
      labelDataSingle[0][target].ColumnValue = result;
      
      Object.entries(columnValues[0]).forEach((entry) => {
        const [key, value] = entry;
        console.log(value,key);
        if(key.toUpperCase()==calculationFormulaField[0].Target.toUpperCase()){
          entry[value] = result;
          columnValues[0][key] = result;
        }
      });
    }
    else{
      setTotalAmountSingle(0)
      labelDataSingle[0][target].ColumnValue = 0
    }

  }
  const handleCalculation = (calculationFormula, i, countOfInput) => {
    console.log('hi')
    var calculationValue1 = 0;
    var calculationValue = 0;
    var target = 0;
    const calculationFormulaField = JSON.parse(calculationFormula);
    const calculateFormulaField = calculationFormulaField[0].Formula;
    console.log(calculateFormulaField,calculationFormulaField[0]);

    labelData[i].map((item, pos) => {
      console.log(labelData,item.ColumnName,item.ColumnValue,calculateFormulaField[0],calculationFormulaField.Target);
      if (item.ColumnName.toUpperCase() == calculateFormulaField[0].Field1.toUpperCase()) {
       
        if (item.ColumnValue != "") calculationValue1 = item.ColumnValue;
      }
      if (item.ColumnName.toUpperCase() == calculateFormulaField[0].Field2.toUpperCase()) {
        console.log(item.ColumnValue)
        if (item.ColumnValue != "") calculationValue = item.ColumnValue;
      }
      if (item.ColumnName.toUpperCase() == calculationFormulaField[0].Target.toUpperCase()) {
        target = pos;
      }
     
    });
    console.log(columnValues,i,target,calculationFormulaField[0].Target.toUpperCase())
    console.log(calculationValue,calculationValue1)
    const result = parseFloat(calculationValue) * parseFloat(calculationValue1);
    console.log(result)
    setTotalAmount(result)
    
    labelData[i][target].ColumnValue = result;
    
    Object.entries(columnValues[i]).forEach((entry) => {
      const [key, value] = entry;
      console.log(value,key);
      if(key.toUpperCase()==calculationFormulaField[0].Target.toUpperCase()){
        entry[value] = result;
        columnValues[i][key] = result;
      }
    });
    // columnValues[i][target].ColumnName= result;
    
  };
  // const   handleImageFile=(item, countOfInput, i)=>{
  //    const filteredArr = [];
  //     columnValues.forEach((item) => {
  //       if (item !== undefined) {
  //         filteredArr.push(item);
  //       }
  //     });

  //     filteredArr[i][item?.ColumnName] = selectedImage;

  //     setLabelData((prevArr) => {
  //       const result = [...prevArr];
  //       result[i][countOfInput].ColumnValue =selectedImage;
  //       return result;
  //     });

  //     setColumnValues(filteredArr);
  // }
  // dataURLToBlob() {
  //   let arr = dataurl.split(',');
  //   let mime = arr[0].match(/:(.*?);/)[1];
  //   let bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   let u8arr = new Uint8Array(n);
  //   while (n--) {
  //       u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new Blob([u8arr], { type: mime });
  // }
  const handleSingleData = (item, i) => {
    const str = item?.ColumnNameWithSpace;
    let str2 = str.split(" ");
    for (let i = 0; i < str2.length; i++) {
      str2[i] = str2[i][0]?.toUpperCase() + str2[i].substr(1);
    }
    const handleImageSingleChange = (event) => {
      const files = event.target.files[0];
      console.log(files);
      const resultFile = URL.createObjectURL(files);
      var multipleDateArrayField = [...selectedImageSingle];
      multipleDateArrayField[i] = resultFile;
    
      setSelectedImageSingle(multipleDateArrayField);
      const filteredArr = [];
      columnValuesSingle.forEach((item) => {
        if (item !== undefined) {
          filteredArr.push(item);
        }
      });

      filteredArr[0][item?.ColumnName] = resultFile;
      setLabelDataSingle((prevArr) => {
        const result = [...prevArr];
        result[0][i].ColumnValue = resultFile;
        return result;
      });
      setColumnValuesSingle(filteredArr);
    };

    const handleImageSingleClick = (image) => {
      setSelectedImagePopupSingle(image);
    };

    const handleClosePopup = () => {
      setSelectedImagePopupSingle(null);
    };

    if (item?.ColumnType == "textbox") {
      return (
        <div className="col-md-3 mb-2">
          <label htmlFor="">{str2.join(" ")}</label>
          <input
            type="text"
            draggable="false"
            id={`item${i}`}
            size="small"
            name={`${i}input`}
            style={{ marginTop: "3px" }}
            disabled={
              labelDataSingle[0][i]["IsDisable"].toLowerCase?.() ===
              "false"
            }
            value={labelDataSingle[0][i]["ColumnValue"]}
            className="getValue form-control"
            placeholder={item?.ColumnName}
            onChange={(e) => {
             console.log()
              const { value } = e.target;
              const filteredArr = [];
              columnValuesSingle.forEach((item) => {
                if (item !== undefined) {
                  filteredArr.push(item);
                }
              });
            
              if( labelDataSingle[0][i]["IsDisable"]?.toLowerCase?.() ===
              "false"){
                filteredArr['amount']= totalAmountSingle;
                labelData[0][i].ColumnValue = totalAmountSingle;
              }
            
              filteredArr[0][item?.ColumnName] = value;
              labelDataSingle[0][i].ColumnValue = value;
              setLabelDataSingle((prevArr) => {
                console.log(prevArr)
                const result = [...prevArr];
                result[0][i].ColumnValue = value;
                return result;
              });
              setColumnValuesSingle(filteredArr);
              if (
                labelDataSingle[0][i]["CalculationType"] == "Auto"
              ) {
                console.log(item?.ColumnName,item?.CalculationKey)
                if (item?.ColumnName.toUpperCase() == item?.CalculationKey.toUpperCase()) {
                  const calculationFormula = item?.CalculationFormula;
                  console.log(calculationFormula)
                  handleSingleCalculation(calculationFormula, i);
                } else {
                  console.log("hi");
                }
              }
              
            }}
          />
        </div>
      );
    }

    if (item?.ColumnType == "datetime") {
      return (
        <div className="col-md-3 mb-2">
          <label htmlFor="">{str2.join(" ")}</label>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            className="input text-center sindle-date w-100 mt-1"
            name={`date${i}`}
            id={`date${i}`}
            placeholderText="Click to select a date"
            // value={labelDataSingle[i]["ColumnValue"]}
            selected={startDate}
            onChange={(e) => {
              
              const newDate = e;
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
              let filteredArr = [];
              columnValuesSingle.forEach((item) => {
                if (item !== undefined) {
                  filteredArr.push(item);
                }
              });
              filteredArr[0][item.ColumnName] = formattedDate;
              setLabelDataSingle((prevArr) => {
                const result = [...prevArr];
                result[0][i].ColumnValue = formattedDate;
                return result;
              });
              console.log(formattedDate)
              setStartDate(e)
              // getDate.push(e);
              // setTwoDimentionData(multipleDateArrayField);
              setColumnValuesSingle(filteredArr);
            }}
          />
        </div>
      );
    }
    if (item?.ColumnType == "dropdown") {
      return (
        <div className="col-md-3 mb-2">
          <label htmlFor="">{str2.join(" ")}</label>
          <div className="w-100">
            <Select
              class="form-select"
              aria-label="Default select example"
              name="groupId"
              id="groupName"
              placeholder="Select.."
              options={selectedOptionParent[i]}
              //       value={selectedOption[i].find(
              //   (x) => x.value == labelDataSingle[i]["ColumnValue"]
              // )}
              onChange={(e) => {
                const filteredArr = [];
                columnValuesSingle.forEach((item) => {
                  if (item !== undefined) {
                    filteredArr.push(item);
                  }
                });

                filteredArr[0][item?.ColumnName] = e.value;
                setLabelDataSingle((prevArr) => {
                  const result = [...prevArr];
                  result[0][i].ColumnValue = e.value;
                  return result;
                });
                setColumnValuesSingle(filteredArr);
              }}
            ></Select>
          </div>
        </div>
      );
    }
    // if (item?.ColumnType == "checkbox") {
    //   return (
    //     <div className="col-md-4 mb-2">
    //      <label htmlFor="">{item.ColumnName}</label>
    //      <FormGroup>
    //             <FormControlLabel
    //               name={`box${i}`}
    //               id={`check${i}`}
    //               style={{ marginTop: "3px", textAlign: "center" }}
    //               control={<Checkbox />}
    //               label="Label"
    //               checked={labelData[i]["ColumnValue"]}
    //               onChange={(e) => {
    //                 const { checked } = e.target;
    //                 console.log(checked);
    //                 if (checked) {
    //                   let filteredArr = [];
    //                   columnValues.forEach((item) => {
    //                     if (item !== undefined) {
    //                       filteredArr.push(item);
    //                     }
    //                   });

    //                   filteredArr[i][item.ColumnName] = "true";
    //                   //  filteredArr[i][item?.ColumnName] = value;
    //                   setLabelDataSingle((prevArr) => {
    //                     const result = [...prevArr];

    //                     result[i].ColumnValue = true;
    //                     return result;
    //                   });
    //                   setColumnValues(filteredArr);
    //                 } else {
    //                   let filteredArr = [];
    //                   columnValues.forEach((item) => {
    //                     if (item !== undefined) {
    //                       filteredArr.push(item);
    //                     }
    //                   });
    //                   filteredArr[i][item.ColumnName] = "false";
    //                   setLabelDataSingle((prevArr) => {
    //                     const result = [...prevArr];

    //                     result[i].ColumnValue = false;
    //                     return result;
    //                   });
    //                   setColumnValues(filteredArr);
    //                 }
    //                 // const {value,name}=e.checked
    //               }}
    //             />
    //           </FormGroup>
    //      </div>
    //   );
    // }
    if (item.ColumnType == "textarea") {
      return (
        <div className="col-md-3 mb-2">
          <label htmlFor="">{str2.join(" ")}</label>
          <textarea
            class="form-control "
            // value={labelData[i]["ColumnValue"]}
            id="exampleFormControlTextarea1"
            rows="2"
            onChange={(e) => {
              const { value } = e.target;
              const filteredArr = [];
              columnValuesSingle.forEach((item) => {
                if (item !== undefined) {
                  filteredArr.push(item);
                }
              });

              filteredArr[0][item?.ColumnName] = value;
              setLabelDataSingle((prevArr) => {
                const result = [...prevArr];
                result[0][i].ColumnValue = value;
                return result;
              });
              setColumnValuesSingle(filteredArr);
            }}
          ></textarea>
        </div>
      );
    }
    if (item.ColumnType == "image") {
      return (
        <div className="col-md-3 mb-2">
          <label htmlFor="">{str2.join(" ")}</label>
          <div className="d-flex align-items-center">
            {selectedImageSingle[i] ? (
              <>
                <img
                  src={selectedImageSingle[i]}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50px",
                    border: "1px solid gray",
                    marginRight: "10px",
                  }}
                  onClick={() => handleImageSingleClick(selectedImageSingle[i])}
                  alt={i}
                ></img>
                {selectImagePopupSingle ? (
                  <div className="popup-overlay" onClick={handleClosePopup}>
                    <div className="popup-content">
                      <img src={selectImagePopupSingle} alt="Selected Image" />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
            <input
              class="form-control"
              type="file"
              id="formFile"
              onChange={handleImageSingleChange}
            />
          </div>
        </div>
      );
    }
  };

  const handleInputValue = (item, countOfInput, i) => {

    const handleImageChange = (event) => {
      const files = event.target.files[0];
      const resultFile = URL.createObjectURL(files);
      const filteredArr = [];
      columnValues.forEach((item) => {
        if (item !== undefined) {
          filteredArr.push(item);
        }
      });

      filteredArr[i][item?.ColumnName] = resultFile;

      setLabelData((prevArr) => {
        const result = [...prevArr];
        result[i][countOfInput].ColumnValue = resultFile;
        return result;
      });
      var multipleDateArrayField = [...selectedImage];
      multipleDateArrayField[i][countOfInput] = resultFile;
      // setSelectedImage((prevArr) => {
      //   const result = [...prevArr];
      //   result.push(resultFile);
      //   return result;
      // });
      setSelectedImage(multipleDateArrayField);
    };

    const handleImageClick = (image) => {
      setSelectedImagePopup(image);
    };

    const handleClosePopup = () => {
      setSelectedImagePopup(null);
    };

    if (item?.ColumnType == "textbox") {
      return (
        <td
          className={`dropTh${countOfInput} align-middle `}
          draggable="false"
          // id={`item${randnum}${countOfInput}${i}`}
          style={{ border: "2px solid gray" }}
        >
          <div draggable="false">
            {/* {replaceFunction("input", countOfInput)} */}
            <input
              type="text"
              draggable="false"
              autoComplete="false"
              required
              id={`item${i}`}
              size="small"
              disabled={
                labelData[i][countOfInput]["IsDisable"]?.toLowerCase?.() ===
                "false"
              }
              name={`${i}input`}
              style={{ marginTop: "3px" }}
              value={labelData[i][countOfInput]["ColumnValue"]}
              className="getValue form-control"
              placeholder={item?.ColumnName}
              onChange={(e) => {
                console.log(labelData)
                console.log(e.target.value)
                const { value } = e.target;
                const filteredArr = [];
                columnValues.forEach((item) => {
                  console.log(item)
                  if (item !== undefined) {
                    filteredArr.push(item);
                  }
                });

                if( labelData[i][countOfInput]["IsDisable"]?.toLowerCase?.() ===
                "false"){
                  filteredArr['amount']= totalAmount;
                  labelData[i][countOfInput].ColumnValue = totalAmount;
                }
                filteredArr[i][item?.ColumnName] = value;
                
                // filteredArr[i][item?.ColumnValue] = totalAmount;
                // setLabelData((prevArr) => {
                //   const result = [...prevArr];
                labelData[i][countOfInput].ColumnValue = value;
                // labelData[i][target].ColumnValue = result;
                //   return result;
                // });
                console.log(filteredArr)
                setColumnValues(filteredArr);
                console.log(item.ColumnName,item?.CalculationKey,labelData[i][countOfInput]["CalculationType"]);
                if (
                  labelData[i][countOfInput]["CalculationType"] == "Auto"
                ) {
                  console.log(item?.ColumnName,item?.CalculationKey)
                  if (item?.ColumnName.toUpperCase() == item?.CalculationKey.toUpperCase()) {
                    const calculationFormula = item?.CalculationFormula;
                    console.log(calculationFormula)
                    handleCalculation(calculationFormula, i, countOfInput);
                  } else {
                    console.log("hi");
                  }
                }
              }}
            />
          </div>
          <div
            className="droptarget1"
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
          className={`dropTh${countOfInput}  align-middle `}
          draggable="false" //change dragable true to work again
          // id={`item${randnum}${countOfInput}${i}`}
          style={{ border: "2px solid gray" }}
        >
          <div draggable="false">
            <div className="w-100">
              <Select
                class="form-select"
                aria-label="Default select example"
                name="groupId"
                id="groupName"
                required
                placeholder="Select.."
                options={selectedOption[countOfInput]}
                // value={selectedOption[countOfInput].find(
                //   (x) => x.value == labelData[i][countOfInput]["ColumnValue"]
                // )}
                onChange={(e) => {
                  const filteredArr = [];
                  columnValues.forEach((item) => {
                    if (item !== undefined) {
                      filteredArr.push(item);
                    }
                  });

                  filteredArr[i][item?.ColumnName] = e.value;
                  setLabelData((prevArr) => {
                    const result = [...prevArr];
                    result[i].ColumnValue = e.value;
                    return result;
                  });
                  setColumnValues(filteredArr);
                }}
              ></Select>
            </div>
          </div>
          <div
            className="droptarget1" // remove 1 for dragable work
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
          className={`dropTh${countOfInput}  text-center `}
          draggable="false" //change dragable true to work again
          // id={`item${randnum}${countOfInput}${i}`}
          style={{ border: "2px solid gray" }}
        >
          <div draggable="false">
            {/* {replaceFunction("checkbox", i)} */}
            <FormGroup>
              <FormControlLabel
                name={`box${i}`}
                id={`check${i}`}
                required
                style={{ marginTop: "3px", textAlign: "center" }}
                control={<Checkbox />}
                label="Label"
                checked={labelData[i][countOfInput]["ColumnValue"]}
                onChange={(e) => {
                  const { checked } = e.target;
                  if (checked) {
                    let filteredArr = [];
                    columnValues.forEach((item) => {
                      if (item !== undefined) {
                        filteredArr.push(item);
                      }
                    });

                    filteredArr[i][item.ColumnName] = "true";
                    //  filteredArr[i][item?.ColumnName] = value;
                    setLabelData((prevArr) => {
                      const result = [...prevArr];
                      result[i][countOfInput].ColumnValue = true;
                      return result;
                    });
                    setColumnValues(filteredArr);
                  } else {
                    let filteredArr = [];
                    columnValues.forEach((item) => {
                      if (item !== undefined) {
                        filteredArr.push(item);
                      }
                    });
                    filteredArr[i][item.ColumnName] = "false";
                    setLabelData((prevArr) => {
                      const result = [...prevArr];
                      result[i][countOfInput].ColumnValue = false;
                      return result;
                    });
                    setColumnValues(filteredArr);
                  }
                  // const {value,name}=e.checked
                }}
              />
            </FormGroup>
          </div>
          <div
            className="droptarget1" // remove 1 for dragable work
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
          className={`dropTh${countOfInput} `}
          draggable="false"
          // id={`item${randnum}${countOfInput}${i}`}
          style={{ border: "2px solid gray" }}
        >
          <div draggable="false">
            {/* {replaceFunction("input", countOfInput)} */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`radio`}
                required
                id={`radio${i}`}
                checked={labelData[i][countOfInput]["ColumnValue"]}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  if (checked) {
                    let filteredArr = [];
                    columnValues.forEach((item) => {
                      if (item !== undefined) {
                        filteredArr.push(item);
                      }
                    });
                    filteredArr[i][item.ColumnName] = "true";
                    labelData[i][countOfInput].ColumnValue = "true";
                   
                    setColumnValues(filteredArr);
                    setLabelData(labelData);
                    columnValues.forEach((e, index) => {
                      if (index != i) {
                        let filteredArr = [];
                        columnValues.forEach((item) => {
                          if (item !== undefined) {
                            filteredArr.push(item);
                          }
                        });
                        filteredArr[index][item.ColumnName] = "";
                        setColumnValues(filteredArr);
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
            className="droptarget1"
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
          className={`dropTh${countOfInput}  text-center align-middle`}
          draggable="false" //change dragable true to work again
          // id={`item${randnum}${countOfInput}${i}`}
          style={{ border: "2px solid gray" }}
        >
          <div draggable="false">
            {/* {replaceFunction("date", i)} */}

            <DatePicker
              dateFormat="yyyy-MM-dd"
              className="input text-center w-75"
              name={`date${i}`}
              id={`date${i}`}
              required
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
                let filteredArr = [];
                columnValues.forEach((item) => {
                  if (item !== undefined) {
                    filteredArr.push(item);
                  }
                });
                filteredArr[i][item.ColumnName] = formattedDate;
                setLabelData((prevArr) => {
                  const result = [...prevArr];
                  result[i][countOfInput].ColumnValue = formattedDate;
                  return result;
                });
                getDate.push(e);
                setTwoDimentionData(multipleDateArrayField);
                setColumnValues(filteredArr);
              }}
            />
          </div>
          <div
            className="droptarget1" // remove 1 for dragable work
            style={{ display: "none" }}
            draggable="false"
          >
            Drop
          </div>
        </td>
      );
    }
    if (item.ColumnType == "textarea") {
      return (
        <td
          className={`dropTh${countOfInput} align-middle`}
          draggable="false"
          // id={`item${randnum}${countOfInput}${i}`}
          style={{ border: "2px solid gray" }}
        >
          <div draggable="false" clas>
            {/* {replaceFunction("input", countOfInput)} */}
            <textarea
              class="form-control "
              required
              value={labelData[i][countOfInput]["ColumnValue"]}
              id="exampleFormControlTextarea1"
              rows="1"
              onChange={(e) => {
                const { value } = e.target;
                const filteredArr = [];
                columnValues.forEach((item) => {
                  if (item !== undefined) {
                    filteredArr.push(item);
                  }
                });

                filteredArr[i][item?.ColumnName] = value;
                setLabelData((prevArr) => {
                  const result = [...prevArr];
                  result[i][countOfInput].ColumnValue = value;
                  return result;
                });

                setColumnValues(filteredArr);
              }}
            ></textarea>
          </div>
          <div
            className="droptarget1"
            style={{ display: "none" }}
            draggable="false"
          >
            Drop
          </div>
        </td>
      );
    }
    if (item.ColumnType == "image") {
      return (
        <td
          className={`dropTh${countOfInput} align-middle`}
          draggable="false"
          // id={`item${randnum}${countOfInput}${i}`}
          style={{ border: "2px solid gray" }}
        >
          <div
            draggable="false"
            className="d-flex justify-content-center align-items-center"
          >
            {selectedImage[i][countOfInput] ? (
              <>
                <img
                  src={selectedImage[i][countOfInput]}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50px",
                    border: "1px solid gray",
                  }}
                  onClick={() =>
                    handleImageClick(selectedImage[i][countOfInput])
                  }
                  alt={countOfInput}
                ></img>
                {selectImagePopup ? (
                  <div className="popup-overlay" onClick={handleClosePopup}>
                    <div className="popup-content">
                      <img src={selectImagePopup} alt="Selected Image" />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}

            {/* <label for="formFile" class="form-label">Default file input example</label> */}
            <input
              class="form-control ms-4 w-50"
              type="file"
              id="formFile"
              onChange={handleImageChange}
            />

            {/* <input
              type="file"
              name="file"
              // value={labelData[i][countOfInput]["ColumnValue"]}
              
              className="ms-4"
            /> */}
          </div>
          <div
            className="droptarget1"
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

    setSelectedOption((prev) => {
      const temp__details = [...prev];
      temp__details[i] = dataMenuArr;
      return temp__details;
    });
  };


  const handleSubmitData = (e, i) => {
 e.preventDefault();
    if (childPageType.PageType == "doubleEntryPage") {
      Object.keys(columnValuesSingle).map(function (object) {
        columnValuesSingle[object]["ID"] = "newID()";
      });
      const modelPurchase = {
        tableNameMaster: parentTableName,
        tableNameChild: childTableName,
        columnNamePrimary: "ID",
        columnNameForign: "ID",
        columnNameSerialNo: "",
        serialType: "",
        IsFlag: "",
        data: columnValuesSingle[0],
        detailsData: [],
      };

      columnValues.map((item) => {
        modelPurchase.detailsData.push(item)
      });
      fetch(`https://localhost:44372/api/DoubleMasterEntry/Insert`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(modelPurchase),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == true) {
            swal({
              title: "Data added successfully",
              icon: "success",
              button: "OK",
            });
          } else if (data.status == false) {
            console.log(data);
            swal({
              title: "Try again",
              text: "Something is worng",
              icon: "warning",
              button: "OK",
            });
          }
        });
      console.log(JSON.stringify(modelPurchase));
    }
    if (childPageType.PageType == "singleEntryPage") {
      console.log(columnValues)
      const modelSingleData = {
        tableNameMaster: null,
        tableNameChild: childTableName,
        columnNamePrimary: null,
        columnNameForign: null,
        serialType: null,
        columnNameSerialNo: null,
        isFlag: null,
        data: null,
        detailsData: [],
        whereParams: null,
      };
      columnValues.map((item) => {
        modelSingleData.detailsData.push(item);
      });

      fetch(`https://localhost:44372/api/DoubleMasterEntry/InsertListData`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(modelSingleData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == true) {
            swal({
              title: "Data added successfully",
              icon: "success",
              button: "OK",
            });
          } else if (data.status == false) {
            console.log(data);
            swal({
              title: "Try again",
              text: "Something is worng",
              icon: "warning",
              button: "OK",
            });
          }
        });
      console.log(JSON.stringify(modelSingleData));
    }
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
      if (event.target.className == "droptargettd") {
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
              insertRigthth(
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
              
            }
          });
      }

      document.getElementsByClassName("droptarget").className = "d-none";
    }
  };

  function insertBefore(newNode, refNode) {
    var getID = document.getElementById(refNode);
    document
      .getElementById(refNode)
      .parentNode.insertBefore(
        newNode,
        document.getElementById(refNode).nextSibling
      );
  }

  function insertAfter(newNode, refNode) {
    var fromthid = "";
    var fromthclass = "";
    var tothid = "";
    var tothclass = "";

    fromthid = newNode.id;
    fromthclass = newNode.className;
    tothid = refNode;
    tothclass = document.getElementById(refNode).className;

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
    fromNode = fromNode.replace(" borders", "");

    var frompositions = 0;
    var topositions = 0;

    var toNode = newNode[0].className.replace("dropTh", "");
    toNode = toNode.replace(" borders", "");

    var b = document.getElementsByTagName("th");
    for (var index = 0; index < b.length; index++) {
      if (b[index].className == refNode) {
        topositions = index;
      } else if (index == toNode) {
        frompositions = index;
      }
    }

    if (topositions < 0) {
      topositions = 0;
    }
    if (frompositions < 0) {
      frompositions = 0;
    }
    var multipleDateArrayField = [...labelData];
    multipleDateArrayField.map((item, index) => {
      const e = item.splice(frompositions, 1)[0];
      item.splice(parseInt(topositions)-2, 0, e);

      multipleDateArrayField[index] = item;
    });

    console.log(multipleDateArrayField);
    setLabelData(multipleDateArrayField);

    var multipleDateArrayFieldcopy = [...labelDataCopy];
    multipleDateArrayFieldcopy.map((item, index) => {
      const e = item.splice(frompositions, 1)[0];
      console.log(e); // ['css']
      item.splice(parseInt(topositions)-2, 0, e);
      multipleDateArrayFieldcopy[index] = item;
    });

    setLabelDataCopy(multipleDateArrayFieldcopy);

    // labelData = multipleDateArrayField;

    var tempjson = [];

    labelData.map((item, index) => {
      tempjson[index] = {};
      item.map((e, i) => {
        var dataMenuArr = [];
        if (item.ColumnType == "datetime") {
          twoDimensionData[index][i] = item.ColumnValue;
        }
        const findPageType = childMenu.find((item) => item.MenuId == id);
        if (findPageType.PageType == "doubleEntryPage"){
          tempjson[index] = {DetailsID:"newID()",ID:""};
        }
        if (findPageType.PageType == "singleEntryPage"){
          tempjson[index] = {ID:"newID()"};
        }

        tempjson["" + index][e.ColumnName] = columnValues[index][e.ColumnName];

        
        if (item[i].RelatedTable != null) {
          const modelDataLabel = {
            procedureName: "",
            parameters: {
              TableName: "",
            },
          };
          modelDataLabel.procedureName = "prc_GetMasterInfoList";
          modelDataLabel.parameters.TableName = `${item[i].ColumnName}`;
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
              if (data.status == true) {
                const allModalData = JSON.parse(data.data);
                var dataTable = [];
                for (var modelArrayPosition in allModalData)
                  dataTable.push([
                    modelArrayPosition,
                    allModalData[modelArrayPosition],
                  ]);
                var dataMenuArr = [];
                dataTable.map((elements) => {
                  elements.map((member) => {
                    for (var key in member) {
                      if (member.hasOwnProperty(key)) {
                        if (key != "0") {
                          if (key == item[i].ColumnValueField) {
                            var dataMenuArrLength = dataMenuArr.length;
                            dataMenuArr[dataMenuArrLength] = {};
                            dataMenuArr[dataMenuArrLength]["value"] =
                              member.ID;
                            var val = member[key];
                            dataMenuArr[dataMenuArrLength]["label"] =
                              val;
                          }
                        }
                      }
                    }
                   
                    var allDropValueDataLength = 0;
                    if (allDropValueData != null) {
                      allDropValueDataLength =
                        Object.keys(allDropValueData).length;
                  
                    }
                  });
                  // }
                });
                setSelectedOption((prev) => {
                  const temp__details = [...prev];
                  temp__details[i] = dataMenuArr;
                  return temp__details;
                });
              } else {
                console.log(data);
              }
            });
    
        }

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

  function insertRigthth(newNode, refNode) {
    var allelement = document.getElementsByClassName(refNode);
    var arr = [...allelement];

    var fromNode = refNode.replace("dropTh", "");
    fromNode = fromNode.replace("border", "");

    var frompositions = 0;
    var topositions = 0;

    var toNode = newNode[0].className.replace("dropTh", "");
    toNode = toNode.replace("border", "");

    var b = document.getElementsByTagName("th");
    for (var index = 0; index < b.length; index++) {
      if (b[index].className == refNode) {
        topositions = index - 1;
      } else if (index == toNode) {
        frompositions = index;
      }
    }

    if (topositions < 0) {
      topositions = 0;
    }
    if (frompositions < 0) {
      frompositions = 0;
    }
    var multipleDateArrayField = [...labelData]; //JSON.parse(JSON.stringify(labelData));
    multipleDateArrayField.map((item, index) => {
      console.log(item)
      const e = item.splice(frompositions, 1)[0];
      console.log(e); // ['css']
      item.splice(parseInt(topositions), 0, e);

      multipleDateArrayField[index] = item;
      console.log(multipleDateArrayField)
    });
    setLabelData(multipleDateArrayField);

    var multipleDateArrayFieldcopy = [...labelDataCopy];
    multipleDateArrayFieldcopy.map((item, index) => {

      console.log(item)
      const e = item.splice(frompositions, 1)[0];
      item.splice(parseInt(topositions), 0, e);

      multipleDateArrayFieldcopy[index] = item;
      console.log(multipleDateArrayFieldcopy)
    });
    setLabelDataCopy(multipleDateArrayFieldcopy);

    // labelData = multipleDateArrayField;

    var tempjson = [];
    labelData.map((item, index) => {
      console.log(item)
      tempjson[index] = {};
      item.map((e, i) => {
        if (item.ColumnType == "datetime") {
          twoDimensionData[index][i] = e.ColumnValue;
        }
        console.log(e, tempjson, columnValues[index][e.ColumnName], index, i);
        tempjson["" + index][e.ColumnName] = columnValues[index][e.ColumnName];

        labelData.map((item, index) => {
          const findPageType = childMenu.find((item) => item.MenuId == id);
          console.log(findPageType.PageType)
          if (findPageType.PageType == "doubleEntryPage"){

            tempjson[index] = {DetailsID:"newID()",ID:""};
          }
          if (findPageType.PageType == "singleEntryPage"){
            tempjson[index] = {ID:"newID()"};

          }

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
              const modelDataLabel = {
                procedureName: "",
                parameters: {
                  TableName: "",
                },
              };
              modelDataLabel.procedureName = "prc_GetMasterInfoList";
              modelDataLabel.parameters.TableName = `${item[i].ColumnName}`;
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
                  if (data.status == true) {
                    const allModalData = JSON.parse(data.data);
                    var dataTable = [];
                    for (var modelArrayPosition in allModalData)
                      dataTable.push([
                        modelArrayPosition,
                        allModalData[modelArrayPosition],
                      ]);
                    var dataMenuArr = [];
                    dataTable.map((elements) => {
                      elements.map((member) => {
                        for (var key in member) {
                          if (member.hasOwnProperty(key)) {
                            if (key != "0") {
                              if (key == item[i].ColumnValueField) {
                                var dataMenuArrLength = dataMenuArr.length;
                                dataMenuArr[dataMenuArrLength] = {};
                                dataMenuArr[dataMenuArrLength]["value"] =
                                  member.ID;
                                var val = member[key];
                                dataMenuArr[dataMenuArrLength]["label"] =
                                  val;
                              }
                            }
                          }
                        }
                        var allDropValueDataLength = 0;
                        if (allDropValueData != null) {
                          allDropValueDataLength =
                            Object.keys(allDropValueData).length;
                        }
                      });
                      // }
                    });
                    setSelectedOption((prev) => {
                      const temp__details = [...prev];
                      temp__details[i] = dataMenuArr;
                      return temp__details;
                    });
                  } else {
                    console.log(data);
                  }
                });
        
            }

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
    console.log(tempjson)
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
                {showTable ? (
                  ""
                ) : (
                  <Button
                    variant="contained"
                    type="button"
                    style={{ marginLeft: "5px", background: "#5A6691" }}
                    onClick={(e, index) => {
                      e.preventDefault();
                      handleLabelField();
                    }}
                  >
                    Show Data
                  </Button>
                )}
                {showTable ? (
                  <>
                    <Button
                      variant="contained"
                      className="ms-2"
                      type="submit"
                      onClick={(e, index) => {
                        handleSubmitData(e, index);
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
                          selectedImage,
                          setSelectedImage,
                          childPageType
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
                  return (
                    <div
                      div
                      className={`shadow-lg p-4`}
                      style={{ visibility: showTable ? "visible" : "hidden" }}
                    >
                      {childPageType?.PageType == "doubleEntryPage"
                        ? labelDataSingle?.map((items, i) => {
                            return (
                              <div className="row mb-4">
                                {items?.map((item, i) => {
                                  return handleSingleData(item, i);
                                })}
                              </div>
                            );
                          })
                        : ""}
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
                        labelCount={labelCount}
                        childModalTitle={childModalTitle}
                        setChildModalTitle={setChildModalTitle}
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
