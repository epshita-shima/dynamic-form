import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import "./SingleEntryForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";
import { json, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import Token from "../common/Token";
import useParentMenu from "../customHooks/useParentMenu";
import useParentDropdown from "../customHooks/useParentDropdown";

const SingleEntryForm = ({ opens, setOpens, setOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputValueDDF, setInputValueDDF] = useState("");
  const [inputValueCheck, setInputValueCheck] = useState("");
  const [inputValueDate, setInputValueDate] = useState("");
  const previousInputValue = useRef("");
  const previousInputValueDDF = useRef("");
  const previousInputValueCheck = useRef("");
  const previousInputValueDate = useRef("");
  const [displayFormulaAuto, setDisplayFormulaAuto] = useState(false);
  const [calculationType, setCalculationType] = useState("Manual");
  const [formulaTarget, setFormulaTarget] = useState("");
  const [inputData, setInputData] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const [checkboxData, setCheckboxData] = useState([]);
  const [dateData, setDateData] = useState([]);
  const [showDropDownModal, setShowDropDownModal] = useState(false);
  const [currentDropSelected, setCurrentDropSelected] = useState("0");
  var arrayInput = [];
  var arrayDropdown = [];
  var arrayCheck = [];
  var arrayDate = [];
  const [allInputValueData, setAllInputValueData] = useState({});
  const [allDropValueData, setAllDropValueData] = useState({});
  const [allCheckValueData, setAllCheckValueData] = useState({});
  const [allDateValueData, setAllDateValueData] = useState({});
  const [inputSchema, setInputSchema] = useState(null);
  const [dropSchema, setDropSchema] = useState(null);
  const [checkSchema, setCheckSchema] = useState(null);
  const [dateSchema, setDateSchema] = useState(null);
  const [pageSchema, setPageSchema] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessageString, setErrorMessageString] = useState("");
  const [allInputValueForFormulaData, setAllInputValueForFormulaData] =
    useState([]);
  const [pageFormula, setPageFormula] = useState([
    { Formula: [{ Field1: "", FormulaType: "", Field2: "" }], Target: {} },
  ]);
  const [allData, setAllData] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [modalSpecificData, setModalSpecificData] = useState([]);
  const [allModelDataTable, setAllModelDataTable] = useState([]);
  const [pageName, setPageName] = useState("");
  const [field1Validation, setField1Validation] = useState(2);
  const [field2Validation, setField2Validation] = useState(2);
  const [fieldTargetValidation, setFieldTargetValidation] = useState(2);
  const [fieldFormulaValidation, setFieldFormulaValidation] = useState(2);
  const [openModal, setOpenModal] = useState(true);
  const [showCalculactionModal, setShowCalculactionModal] = useState(false);
  const [keyValue, setKeyValue] = useState([
    {
      key: "qty",
      type: "calcField",
    },
    {
      key: "rate",
      type: "calcField",
    },
    {
      key: "amount",
      type: "targetField",
    },
  ]);
  const [selectedListName, setSelectedListName] = useState([]);
  const handleClose = () => setShowCalculactionModal(false);
  const handleDropClose = () => setShowDropDownModal(false);
  const handleErrorClose = () => setShowErrorModal(false);
  const [errorsPage, setErrorsPage] = useState([]);
  const [errorsInput, setInputErrors] = useState([]);
  const [errorsDropDown, setErrorsDropDown] = useState([]);
  const [errorsDate, setErrorsDate] = useState([]);
  const [errorsCheck, setErrorsCheck] = useState([]);
  const [parentDropdownMenu, setParentDropdownMenu] = useParentDropdown([]);
  const token = Token.token;
  const navigate = useNavigate();
  console.log(inputData);
  const modelData = {
    procedureName: "prc_GetPageInfo",
    parameters: {
      MenuId: "1",
    },
  };

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
    for (let i = 0; i < inputValue; i++) {
      arrayInput.push([i]);
    }
    for (let i = 0; i < inputValueDDF; i++) {
      arrayDropdown.push([i]);
    }
    for (let i = 0; i < inputValueCheck; i++) {
      arrayCheck.push([i]);
    }
    for (let i = 0; i < inputValueDate; i++) {
      arrayDate.push([i]);
    }

    useEffect(() => {
      setInputData(arrayInput);
      setDropdownData(arrayDropdown);
      setCheckboxData(arrayCheck);
      setDateData(arrayDate);
    }, [inputValue, inputValueDDF, inputValueCheck, inputValueDate]);
  }

  function submitForm() {
    const modelDataLabel = {
      procedureName: "",
      parameters: {},
    };
    modelDataLabel.procedureName = "InsertDynamicMenuTable";
    modelDataLabel.parameters = {
      DBName: "DynamicDemo",
      TableName: "tblMenu",
      ColumnData:
        "MenuName, SubMenuName, UiLink, isActive, ysnParent, OrderBy, MakeDate, MenuLogo, TableName",
      ValueData:
        "'Master Entry','" +
        pageName +
        "','/" +
        pageName.replace(" ", "-") +
        "','1','0','12',getdate(),'','" +
        pageName.replace(/ /g, "") +
        "'",
    };

    fetch("https://localhost:44372/api/GetData/GetDataById", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(modelDataLabel),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        if (data.status == true) {
          const tableData = JSON.parse(data.data);
          var menuId = tableData[0]?.Column1;

          var tableModelData = {
            tableNameMaster: "",
            tableNameChild: null,
            columnNamePrimary: null,
            columnNameForign: null,
            serialType: null,
            columnNameSerialNo: null,
            isFlag: null,
            data: "",
            detailsData: [],
            whereParams: null,
          };
          tableModelData.detailsData = [];
          tableModelData.tableNameChild = "PageInfo";

          var allInputValueDataLength = 0;
          if (allInputValueData != null) {
            allInputValueDataLength = Object.keys(allInputValueData).length;
          }

          var allCheckValueDataLength = 0;
          if (allCheckValueData != null) {
            allCheckValueDataLength = Object.keys(allCheckValueData).length;
          }

          var allDateValueDataLength = 0;
          if (allDateValueData != null) {
            allDateValueDataLength = Object.keys(allDateValueData).length;
          }

          var allDropValueDataLength = 0;
          if (allDropValueData != null) {
            allDropValueDataLength = Object.keys(allDropValueData).length;
          }
          var orderPosition = 0;

          for (
            let allInputValueDataCount = 0;
            allInputValueDataCount < allInputValueDataLength;
            allInputValueDataCount++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "newid()",
              MenuId: menuId,
              ColumnName: allInputValueData[allInputValueDataCount],
              ColumnType: "textbox",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: calculationType,
              CalculationKey: allInputValueData[allInputValueDataCount],
              CalculationFormula: JSON.stringify(pageFormula),
              RelatedTable: "",
              Position: orderPosition,
              IsDisable:
                formulaTarget == allInputValueData[allInputValueDataCount]
                  ? "1"
                  : "0",
            };
            tableModelData.detailsData.push(tabledataparams);
          }

          for (
            let allCheckValueDataCount = 0;
            allCheckValueDataCount < allCheckValueDataLength;
            allCheckValueDataCount++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "newid()",
              MenuId: menuId,
              ColumnName: allCheckValueData[allCheckValueDataCount],
              ColumnType: "checkbox",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: "",
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelData.detailsData.push(tabledataparams);
          }

          for (
            let allDateValueDataCount = 0;
            allDateValueDataCount < allDateValueDataLength;
            allDateValueDataCount++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "newid()",
              MenuId: menuId,
              ColumnName: allDateValueData[allDateValueDataCount],
              ColumnType: "datetime",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: "",
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelData.detailsData.push(tabledataparams);
          }

          for (
            let allDropValueDataCount = 0;
            allDropValueDataCount < allDropValueDataLength;
            allDropValueDataCount++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "newid()",
              MenuId: menuId,
              ColumnName: allDropValueData[allDropValueDataCount],
              ColumnType: "dropdown",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: "",
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelData.detailsData.push(tabledataparams);
          }

          console.log(
            allCheckValueData,
            allDropValueData,
            allDateValueData,
            allData
          );
          fetch(
            "https://localhost:44372/api/DoubleMasterEntry/InsertListData",
            {
              method: "POST",
              headers: {
                authorization: `Bearer ${token}`,
                "content-type": "application/json",
              },
              body: JSON.stringify(tableModelData),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.status == true) {
                navigate("/single-entry-data");
              } else {
                console.log(data);
              }
            });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
          setModalSpecificData(allModalData.Tables1);
        } else {
          console.log(data);
        }
      });
  };
  const handleDropdownValue = (i) => {
    console.log(document.querySelector('input[name="dropValueField"]:checked'));
    var radioName = 0;
    if (
      document.querySelector('input[name="dropValueField"]:checked') != null
    ) {
      radioName = document.querySelector(
        'input[name="dropValueField"]:checked'
      ).value;
    }
    console.log(radioName);
    setSelectedListName(radioName);
    var dataTable = [];
    for (var modelArrayPosition in allModelDataTable)
      dataTable.push([
        modelArrayPosition,
        allModelDataTable[modelArrayPosition],
      ]);
    console.log(allModelDataTable);
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
          setAllDropValueData({
            ...allDropValueData,
            [i]: radioName,
          });
        });
      }
    });
    setSelectedOption((prev) => {
      const temp__details = [...prev];
      temp__details[i] = dataMenuArr;
      return temp__details;
    });
    setShowDropDownModal(false);
  };
  var dropData = [
    {
      value: "1",
      label: "test1",
    },
    {
      value: "2",
      label: "test2",
    },
  ];

  useEffect(() => {
    previousInputValue.current = inputValue;
    previousInputValueDDF.current = inputValueDDF;
    previousInputValueCheck.current = inputValueCheck;
    previousInputValueDate.current = inputValueDate;
  }, [inputValue, inputValueDDF, inputValueCheck, inputValueDate]);

  function validationOutsideSchema() {
    var allInputValueDataLength = 0;
    if (allInputValueData != null) {
      allInputValueDataLength = Object.keys(allInputValueData).length;
    }
    if (allInputValueDataLength > 0) {
      var schemaForInput = createDynamicSchema(allInputValueData);
      setInputSchema(schemaForInput);
      validateInputFields(schemaForInput);
    }

    var schemaForPage = createPageSchema(pageName);
    setPageSchema(schemaForPage);
    validatePageNameFields(schemaForPage);

    var allDropValueDataLength = 0;
    if (allDropValueData != null) {
      allDropValueDataLength = Object.keys(allDropValueData).length;
    }
    if (allDropValueDataLength > 0) {
      var schemaForDrop = createDynamicSchemaForDrop(allDropValueData);
      setDropSchema(schemaForDrop);
      validateDropFields(schemaForDrop);
    }
    var allCheckValueDataLength = 0;
    if (allCheckValueData != null) {
      allCheckValueDataLength = Object.keys(allCheckValueData).length;
    }
    if (allCheckValueDataLength > 0) {
      var schemaForCheck = createDynamicSchemaForCheck(allCheckValueData);
      setCheckSchema(schemaForCheck);
      validateCheckFields(schemaForCheck);
    }

    var allDateValueDataLength = 0;
    if (allDateValueData != null) {
      allDateValueDataLength = Object.keys(allDateValueData).length;
    }
    if (allDateValueDataLength > 0) {
      var schemaForDate = createDynamicSchemaForDate(allDateValueData);
      setDateSchema(schemaForDate);
      validateDateFields(schemaForDate);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    validationOutsideSchema();
    var foundKey = 0;
    var foundEmpty = 0;
    console.log(allInputValueData);
    var allInputValueDataLength = 0;
    if (inputValue != "") {
      allInputValueDataLength = inputValue;
    }
    var allCheckValueDataLength = 0;
    if (inputValueCheck != "") {
      allCheckValueDataLength = inputValueCheck;
    }

    var allDateValueDataLength = 0;
    if (inputValueDate != "") {
      allDateValueDataLength = inputValueDate;
    }

    var allDropValueDataLength = 0;
    if (inputValueDDF != "") {
      allDropValueDataLength = inputValueDDF;
    }
    var totalField =
      allCheckValueDataLength +
      allInputValueDataLength +
      allDateValueDataLength +
      allDropValueDataLength;

    if (pageName != "") {
      console.log(totalField);
      if (totalField > 12) {
        setErrorMessageString("There cannot be more than 12 input");
        showErrorModal(true);
      } else if (totalField == 0) {
        setErrorMessageString("There need to be more than 0 input");
        setShowErrorModal(true);
      } else {
        var totalValueField = 0;

        var errorstatus = 0;
        var allInputValueDataLength = 0;
        if (allInputValueData != null) {
          allInputValueDataLength = Object.keys(allInputValueData).length;
        }
        for (
          var allInputCount = 0;
          allInputCount < allInputValueDataLength;
          allInputCount++
        ) {
          if (allInputValueData[allInputCount] == "") {
            foundEmpty = 1;
          }
        }

        var allCheckValueDataLength = 0;
        if (allCheckValueData != null) {
          allCheckValueDataLength = Object.keys(allCheckValueData).length;
        }
        for (
          var allInputCount = 0;
          allInputCount < allInputValueDataLength;
          allInputCount++
        ) {
          if (allInputValueData[allInputCount] == "") {
            foundEmpty = 1;
          }
        }

        var allDropValueDataLength = 0;
        if (allDropValueData != null) {
          allDropValueDataLength = Object.keys(allDropValueData).length;
        }
        for (
          var allDropCount = 0;
          allDropCount < allDropValueDataLength;
          allDropCount++
        ) {
          console.log(allDropValueData[allDropCount]);
          if (allDropValueData[allDropCount] == "") {
            foundEmpty = 1;
          }
        }

        var allDateValueDataLength = 0;
        if (allDateValueData != null) {
          allDateValueDataLength = Object.keys(allDateValueData).length;
        }
        for (
          var allDateCount = 0;
          allDateCount < allDateValueDataLength;
          allDateCount++
        ) {
          if (allDateValueData[allDateCount] == "") {
            foundEmpty = 1;
          }
        }
        if (foundEmpty == 1) {
        } else {
          if (inputValue > 2) {
            for (
              let countKeyValue = 0;
              countKeyValue < allInputValueDataLength;
              countKeyValue++
            ) {
              if (
                keyValue.some(
                  (item) => item.key === allInputValueData[countKeyValue]
                )
              ) {
                foundKey = 1;
              }
            }
            if (foundKey == 1) {
              setShowCalculactionModal(true);
            } else {
              submitForm();
            }
          } else {
            submitForm();
          }
        }
      }
    } else {
    }
  }
  const createPageSchema = (fields) => {
    const schemaFields = {};

    // schemaFields =  Yup.string().required();
    // console.log(schemaFields);
    return Yup.string().required();
  };
  const createDynamicSchema = (fields) => {
    const schemaFields = {};

    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
    console.log(schemaFields);
    return Yup.object().shape(schemaFields);
  };

  const createDynamicSchemaForDrop = (fields) => {
    const schemaFields = {};
    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
    console.log(schemaFields);
    return Yup.object().shape(schemaFields);
  };

  const createDynamicSchemaForCheck = (fields) => {
    const schemaFields = {};
    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
    return Yup.object().shape(schemaFields);
  };

  const createDynamicSchemaForDate = (fields) => {
    const schemaFields = {};
    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
    console.log(schemaFields);
    return Yup.object().shape(schemaFields);
  };

  // const validateField = async (field,index) => {
  //   console.log(field);
  //   try {

  //     await Yup.object().shape({
  //       inputData: field({
  //         value: Yup.string().required(),
  //       }),
  //     }).validate(field, { abortEarly: false });

  //     setErrors((prevErrors) => prevErrors.filter((err) => err.index !== index));
  //   } catch (validationErrors) {
  //     // Validation failed for the field
  //     console.log(validationErrors)
  //     setErrors((prevErrors) => [
  //       "value cannot be empty"
  //     ]);
  //   }
  // };
  const validatePageNameFields = async (schema) => {
    try {
      await schema.validate(pageName, { abortEarly: false });

      // All fields passed validation
      setErrorsPage([]);
    } catch (validationErrors) {
      // Some fields failed validation

      setErrorsPage(
        validationErrors.inner.map((err) => ({
          index: 0,
          message: err.message,
        }))
      );
    }
  };
  const validateInputFields = async (schema) => {
    try {
      console.log(schema);
      await schema.validate(allInputValueData, { abortEarly: false });

      // All fields passed validation
      setInputErrors([]);
    } catch (validationErrors) {
      // Some fields failed validation
      console.log(validationErrors);
      setInputErrors(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path, 9) : -1,
          message: err.message,
        }))
      );
    }
  };

  const validateDropFields = async (schema) => {
    try {
      console.log(allDropValueData);
      await schema.validate(allDropValueData, { abortEarly: false });

      // All fields passed validation
      setErrorsDropDown([]);
    } catch (validationErrors) {
      console.log(validationErrors);
      setErrorsDropDown(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path, 9) : -1,
          message: err.message,
        }))
      );
    }
  };

  const validateCheckFields = async (schema) => {
    try {
      await schema.validate(allCheckValueData, { abortEarly: false });

      // All fields passed validation
      setErrorsCheck([]);
    } catch (validationErrors) {
      // Some fields failed validation
      console.log(validationErrors);
      setErrorsCheck(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path, 9) : -1,
          message: err.message,
        }))
      );
    }
  };

  const validateDateFields = async (schema) => {
    try {
      await schema.validate(allDateValueData, { abortEarly: false });

      // All fields passed validation
      setErrorsDate([]);
    } catch (validationErrors) {
      // Some fields failed validation
      console.log(validationErrors);
      setErrorsDate(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path, 9) : -1,
          message: err.message,
        }))
      );
    }
  };

  return (
    <form
      name="myForms"
      noValidate
      class="bg-white shadow-lg  p-5 mt-4"
      onSubmit={(e) => handleSubmit(e)}
       
    >
      <Grid>
      
        <Grid className="single-entry-form">
                    <Grid>
                      <label htmlFor="" className="text-style">
                        Text Field
                      </label>
                      <br></br>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        type="number"
                        size="small"
                        defaultValue="0"
                        value={inputValue}
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
                          setAllInputValueData((prev) => {
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
                          setInputValue(targetValue);
                        }}
                      />
                      <Grid className="d-flex align-items-center">
                        <Grid>
                          {inputData?.map((item, name) => {
                            return (
                              <div style={{ marginLeft: "20px" }}>
                                <input
                                  type="text"
                                  name={`input${name}`}
                                  id={name}
                                  className="getInputValue mt-2"
                                  required
                                  onChange={(e) => {
                                    // setAllData(e.target.value, labelType, labelName);
                                    // setAllData({
                                    //   ...allData,
                                    //   [labelName]: e.target.value,
                                    //   [labelType]: e.target.type,
                                    // });
                                    // if(e.target.value==""){
                                    //   document.getElementsByName(`input${name}`)[0].style.borderColor="red";
                                    //   document.getElementsByName(`input${name}validity`)[0].style.display="block";
                                    // }
                                    // else{
                                    //   document.getElementsByName(`input${name}`)[0].style.borderColor="black";
                                    //   document.getElementsByName(`input${name}validity`)[0].style.display="none";
                                    // }

                                    setAllInputValueData({
                                      ...allInputValueData,
                                      [name]: e.target.value,
                                    });
                                    var tempValue = {
                                      label: e.target.value,
                                      value: e.target.value,
                                    };
                                    allInputValueForFormulaData[name] =
                                      tempValue;
                                    setAllInputValueForFormulaData((prev) => {
                                      const temp__details = [...prev];
                                      return temp__details;
                                    });
                                    console.log(allInputValueForFormulaData);
                                  }}
                                />
                                {errorsInput
                                  .filter((err) => err.index === name)
                                  .map((err, i) => (
                                    <div style={{ color: "#FF0000" }} key={i}>
                                      This Field is required
                                    </div>
                                  ))}
                              </div>
                            );
                          })}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid style={{ marginLeft: "5px" }}>
                      <label htmlFor="" className="text-style">
                        DropDown Field
                      </label>
                      <br></br>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        type="number"
                        size="small"
                        defaultValue="0"
                        value={inputValueDDF}
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

                          setAllDropValueData((prev) => {
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
                          setInputValueDDF(targetValue);
                        }}
                      />
                      <Grid className="d-flex align-items-center">
                        <Grid>
                          {dropdownData.map((item, name) => {
                            return (
                              <div className="ps-5 d-flex align-items-center ">
                                <div>
                                  <Select
                                    class="form-select w-100"
                                    className="w-[100%] mt-2"
                                    name={`drop${name}`}
                                    aria-label="Default select example"
                                    options={selectedOption[name]}
                                    id={`dropValue${name}`}
                                    onChange={(e) => {}}
                                    required
                                  ></Select>
                                  {errorsDropDown
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
                                    className="text-white"
                                    data-toggle="modal"
                                    data-target={`#exampleModal${name}`}
                                    data-id={name}
                                    onClick={() => {
                                      handleModalMenu();
                                      setCurrentDropSelected(name);
                                      setShowDropDownModal(true);
                                    }}
                                  ></FontAwesomeIcon>
                                </div>
                              </div>
                            );
                          })}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid style={{ marginLeft: "5px" }}>
                      <label htmlFor="" className="text-style">
                        Checkbox Field
                      </label>
                      <br></br>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        type="number"
                        size="small"
                        defaultValue="0"
                        value={inputValueCheck}
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
                          setAllCheckValueData((prev) => {
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
                          setInputValueCheck(targetValue);
                        }}
                      />
                      <Grid className="d-flex align-items-center">
                        <Grid>
                          {checkboxData.map((item, name) => {
                            return (
                              <div className="">
                                <input
                                  type="text"
                                  name=""
                                  id=""
                                  className="getInputValue mt-2"
                                  onChange={(e) => {
                                    setAllData({
                                      ...allData,
                                      [allData.length]: e.target.value,
                                    });
                                    setAllCheckValueData({
                                      ...allCheckValueData,
                                      [name]: e.target.value,
                                    });
                                  }}
                                />
                                {errorsCheck
                                  .filter((err) => err.index === name)
                                  .map((err, i) => (
                                    <div style={{ color: "#FF0000" }} key={i}>
                                      This Field is required
                                    </div>
                                  ))}
                              </div>
                            );
                          })}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid style={{ marginLeft: "5px" }}>
                      <label htmlFor="" className="text-style">
                        Date Field
                      </label>
                      <br></br>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        type="number"
                        size="small"
                        defaultValue="0"
                        value={inputValueDate}
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
                          setAllCheckValueData((prev) => {
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
                          setInputValueDate(targetValue);
                        }}
                      />
                      <br />
                      <Grid className="d-flex  align-items-center">
                        <Grid>
                          {dateData.map((item, name) => {
                            return (
                              <div className="">
                                <input
                                  type="text"
                                  name=""
                                  id=""
                                  className="getInputValue mt-2"
                                  onChange={(e) => {
                                    setAllData({
                                      ...allData,
                                      [allData.length]: e.target.value,
                                    });
                                    setAllDateValueData({
                                      ...allDateValueData,
                                      [name]: e.target.value,
                                    });
                                  }}
                                />
                                {errorsDate
                                  .filter((err) => err.index === name)
                                  .map((err, i) => (
                                    <div style={{ color: "#FF0000" }} key={i}>
                                      This Field is required
                                    </div>
                                  ))}
                              </div>
                            );
                          })}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid>
                      <Button
                        type="submit"
                        variant="contained"
                        style={{ marginLeft: "20px", marginTop: "20px" }}

                        // data-toggle="modal"
                        // data-target={`#exampleModalFormula`}
                      >
                        Enter
                      </Button>
                    </Grid>
                  </Grid>
                  
          {/* <div className="header">
           
            <div className="inner-header flex p-5">
            

              {openModal ? (
                <Grid>
                  <Grid className="single-entry-form">
                    <Grid className="justify-content-start">
                      <Grid className="d-flex justify-content-between">
                        <label htmlFor="" className="text-style">
                         Parent Menu
                        </label>
                        <Grid className="d-flex align-items-center">
                        <div className="w-100">
                          <Select
                            class="form-select text-white"
                            className="w-100 text-white"
                            name={`drop`}
                            aria-label="Default select example"
                            options={parentDropdownMenu}
                            id={`dropValue}`}
                            onChange={(e) => {}}
                            required
                          ></Select>
                        </div>
                        <FontAwesomeIcon icon={faPlusCircle} className="fs-4 ms-1"></FontAwesomeIcon>
                        </Grid>
                      </Grid>
                      <Grid className="d-flex justify-content-between  mt-2">
                      <label htmlFor="" className="text-style">Page Name</label>
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          type="text"
                          required
                          value={pageName}
                          inputProps={{
                            style: {
                              height: "5px",
                            },
                          }}
                          class="peer border border-slate-400 ms-2"
                          onChange={(e) => {
                            setPageName(e.target.value);
                          }}
                        />
                        {errorsPage
                          .filter((err) => err.index === 0)
                          .map((err, i) => (
                            <div style={{ color: "#FF0000" }} key={i}>
                              This Field is required
                            </div>
                          ))}
                      </Grid>
                    </Grid>
                  </Grid>

                  
                  <Grid className="d-flex  align-items-center"></Grid>
                </Grid>
              ) : (
                ""
              )}
            </div>
          
            <div>
              <svg
                className="waves"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
                shapeRendering="auto"
              >
                <defs>
                  <path
                    id="gentle-wave"
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                  />
                </defs>
                <g className="parallax">
                  <use
                    xlinkHref="#gentle-wave"
                    x={48}
                    y={0}
                    fill="rgba(255,255,255,0.7"
                  />
                  <use
                    xlinkHref="#gentle-wave"
                    x={48}
                    y={3}
                    fill="rgba(255,255,255,0.5)"
                  />
                  <use
                    xlinkHref="#gentle-wave"
                    x={48}
                    y={5}
                    fill="rgba(255,255,255,0.3)"
                  />
                  <use xlinkHref="#gentle-wave" x={48} y={7} fill="#fff" />
                </g>
              </svg>
            </div>
     
          </div> */}
      
         
      

        {/* {showCalculactionModal ? (
          <div
            style={{
              display: showCalculactionModal ? "none !important" : "block",
            }}
            class="modal fade"
            id="exampleModalFormula"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalFormulaLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalFormulaLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setShowCalculactionModal(false);
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  ...
                  
                </div>
                <div class="modal-footer">
                  
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )} */}

        <Modal
          show={showCalculactionModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="w-50">
              <label className="fw-bold" htmlFor="">
                Calculation Type
              </label>
              <Select
                class="form-select"
                className="w-[100%] mt-2"
                aria-label="Default select example"
                // placeholder={`${allDropValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
                options={[
                  {
                    label: "Manual",
                    value: "Manual",
                  },
                  {
                    label: "Auto",
                    value: "Auto",
                  },
                ]}
                id={`dropValue`}
                onChange={(e) => {
                  console.log(e.value);
                  setCalculationType(e.value);
                  if (e.value == "Auto") {
                    setDisplayFormulaAuto(true);
                  } else {
                    setDisplayFormulaAuto(false);
                  }
                }}
              ></Select>
            </div>
            <div
              className={`d-flex justify-content-between ${
                displayFormulaAuto ? "d-visible" : "d-hidden"
              } mt-4`}
            >
              <div className="w-100">
                <label className="fw-bold" htmlFor="">
                  Field1
                </label>
                <Select
                  class="form-select"
                  className="w-[100%] mt-2"
                  aria-label="Default select example"
                  // placeholder={`${allDropValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
                  options={allInputValueForFormulaData}
                  id={`dropValueField1`}
                  onChange={(e) => {
                    console.log(e.value, pageFormula);
                    if (pageFormula[0]["Formula"][0]["Field2"] == e.value) {
                      setField1Validation(0);
                    } else if (pageFormula[0]["Target"] == e.value) {
                      setField1Validation(0);
                    } else {
                      setField1Validation(1);
                      pageFormula[0]["Formula"][0]["Field1"] = e.value;
                    }
                  }}
                ></Select>

                {field1Validation == 0 ? (
                  <label className="" style={{ color: "red" }}>
                    Value can not be same as Field2 or Target
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="w-100 ms-2">
                <label className="fw-bold" htmlFor="">
                  Formula
                </label>
                <Select
                  class="form-select"
                  className="w-[100%] mt-2"
                  aria-label="Default select example"
                  // placeholder={`${allDropValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
                  options={[
                    {
                      label: "+",
                      value: "+",
                    },
                    {
                      label: "-",
                      value: "-",
                    },
                    {
                      label: "*",
                      value: "*",
                    },
                    {
                      label: "/",
                      value: "/",
                    },
                  ]}
                  id={`dropValueFormula`}
                  onChange={(e) => {
                    console.log(e.value);
                    pageFormula[0]["Formula"][0]["FormulaType"] = e.value;
                    if (e.value != "") {
                      setFieldFormulaValidation(1);
                    } else {
                      setFieldFormulaValidation(0);
                    }
                  }}
                ></Select>

                {fieldFormulaValidation == 0 ? (
                  <label className="" style={{ color: "red" }}>
                    Value can not be empty
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="w-100 ms-2">
                <label className="fw-bold" htmlFor="">
                  Field2
                </label>
                <Select
                  class="form-select"
                  className="w-[100%] mt-2"
                  aria-label="Default select example"
                  // placeholder={`${allDropValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
                  options={allInputValueForFormulaData}
                  id={`dropValueField2`}
                  onChange={(e) => {
                    console.log(e.value);
                    if (pageFormula[0]["Formula"][0]["Field1"] == e.value) {
                      setField2Validation(0);
                    } else if (pageFormula[0]["Target"] == e.value) {
                      setField2Validation(0);
                    } else {
                      setField2Validation(1);
                      pageFormula[0]["Formula"][0]["Field2"] = e.value;
                    }
                  }}
                ></Select>
                {field2Validation == 0 ? (
                  <label className="" style={{ color: "red" }}>
                    Value can not be same as Field1 or Target
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="w-100 ms-2">
                <label className="fw-bold" htmlFor="">
                  Target
                </label>
                <Select
                  class="form-select"
                  className="w-[100%] mt-2"
                  aria-label="Default select example"
                  // placeholder={`${allDropValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
                  options={allInputValueForFormulaData}
                  id={`dropValueFieldTarget`}
                  onChange={(e) => {
                    if (pageFormula[0]["Formula"][0]["Field1"] == e.value) {
                      setFieldTargetValidation(0);
                    } else if (
                      pageFormula[0]["Formula"][0]["Field2"] == e.value
                    ) {
                      setFieldTargetValidation(0);
                    } else {
                      console.log(e.value);
                      setFormulaTarget(e.value);
                      setFieldTargetValidation(1);
                      pageFormula[0]["Target"] = e.value;
                    }
                  }}
                ></Select>
                {fieldTargetValidation == 0 ? (
                  <label className="" style={{ color: "red" }}>
                    Value can not be same as Field1 or Field2
                  </label>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              class="btn btn-secondary"
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>

            <button
              type="button"
              class="btn btn-primary"
              onClick={() => {
                if (pageFormula[0]["Formula"][0]["FormulaType"] == "") {
                  setFieldFormulaValidation(0);
                }
                if (pageFormula[0]["Formula"][0]["Field2"] == "") {
                  setField1Validation(0);
                }
                if (pageFormula[0]["Formula"][0]["Field1"] == "") {
                  setField1Validation(0);
                }
                if (pageFormula[0]["Formula"][0]["FormulaType"] == "") {
                  setFieldFormulaValidation(0);
                }
                if (pageFormula[0]["Formula"][0]["Target"] == "") {
                  setFieldTargetValidation(0);
                }
                if (
                  field1Validation != 1 ||
                  field2Validation != 1 ||
                  fieldFormulaValidation != 1 ||
                  fieldTargetValidation != 1
                ) {
                } else {
                  // addList();
                  submitForm();
                }
              }}
            >
              Save changes
            </button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showDropDownModal}
          onHide={handleDropClose}
          backdrop="true"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title className="text-teal">Select Menu</Modal.Title>
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
            {modalSpecificData
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
                        onClick={(e) => {}}
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
              style={{ backgroundColor: "#0A9DBF" }}
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              aria-label="Close"
              onClick={(e) => {
                handleDropdownValue(currentDropSelected);
              }}
            >
              Save changes
            </button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showErrorModal}
          onHide={handleErrorClose}
          backdrop="true"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h5>Warning!</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>{errorMessageString}</label>
          </Modal.Body>
        </Modal>
      </Grid>
    </form>
  );
};

export default SingleEntryForm;
