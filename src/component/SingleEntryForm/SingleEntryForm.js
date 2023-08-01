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
import useChildMenu from "./../customHooks/useChildMenu";
const SingleEntryForm = ({
  setExist,
  parentMenuName,
  childMenuName,
  pageEntry,
  setParentMenuName,
  setChildMenuName,
  setPageEntry,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputValueDDF, setInputValueDDF] = useState("");
  const [inputValueCheck, setInputValueCheck] = useState("");
  const [inputValueDate, setInputValueDate] = useState("");
  const [inputValueTextArea, setInputValueTextArea] = useState("");
  const [inputValueImage, setInputValueImage] = useState("");
  const previousInputValue = useRef("");
  const previousInputValueDDF = useRef("");
  const previousInputValueCheck = useRef("");
  const previousInputValueDate = useRef("");
  const previousInputValueTextArea = useRef("");
  const previousInputValueImage = useRef("");
  const [displayFormulaAuto, setDisplayFormulaAuto] = useState(false);
  const [calculationType, setCalculationType] = useState("Manual");
  const [formulaTarget, setFormulaTarget] = useState("");
  const [inputData, setInputData] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const [checkboxData, setCheckboxData] = useState([]);
  const [dateData, setDateData] = useState([]);
  const [textareaData,setTextareaData]=useState([]);
  const [imageData,setImageData]=useState([])
  const [showDropDownModal, setShowDropDownModal] = useState(false);
  const [currentDropSelected, setCurrentDropSelected] = useState("0");
  var arrayInput = [];
  var arrayDropdown = [];
  var arrayCheck = [];
  var arrayDate = [];
  var arrayTextArea=[];
  var arrayImage=[];
  const [allInputValueData, setAllInputValueData] = useState({});
  const [allDropValueData, setAllDropValueData] = useState({});
  const [allCheckValueData, setAllCheckValueData] = useState({});
  const [allDateValueData, setAllDateValueData] = useState({});
  const [allTextAreaValueData, setAllTextAreaValueData] = useState({});
  const [allImageValueData, setAllImageValueData] = useState({});
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
  const [childMenu, setChildMenu] = useChildMenu([]);
  const token = Token.token;
  const tableName = childMenuName.SubMenuName;
  const spaceRemove = tableName.split(" ").join("");
  const tableNameLowerCase = spaceRemove.toLowerCase();

  var tableCreateData = "";
  Object.entries(allInputValueData).forEach((entry) => {
    const [key, value] = entry;
    console.log(key, value);
    const spaceRemove = value.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    tableCreateData =
      tableCreateData + convertLowerCase + " " + "varchar(250)" + ",";
  });
console.log(allData,allCheckValueData)
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
    for(let i=0;i<inputValueTextArea;i++){
      arrayTextArea.push(i)
    }
    for(let i=0;i<inputValueImage;i++){
      arrayImage.push(i)
    }

    useEffect(() => {
      setInputData(arrayInput);
      setDropdownData(arrayDropdown);
      setCheckboxData(arrayCheck);
      setDateData(arrayDate);
      setTextareaData(arrayTextArea)
      setImageData(arrayImage)
    }, [inputValue, inputValueDDF, inputValueCheck, inputValueDate,inputValueTextArea,inputValueImage]);
  }
  
  useEffect(() => {
    previousInputValue.current = inputValue;
    previousInputValueDDF.current = inputValueDDF;
    previousInputValueCheck.current = inputValueCheck;
    previousInputValueDate.current = inputValueDate;
    previousInputValueTextArea.current=inputValueTextArea;
    previousInputValueImage.current=inputValueImage
  }, [inputValue, inputValueDDF, inputValueCheck, inputValueDate,inputValueTextArea]);

  const submitForm = () => {
    const modelCreatePage = {
      procedureName: "",
      parameters: {},
    };

    if (parentMenuName.MenuName == "" || childMenuName.SubMenuName == "") {
      swal({
        title: "Try again",
        text: "Please take parent and child menu",
        icon: "warning",
        button: "OK",
      });
      return;
    } else {
      const exists = childMenu.find(
        (p) => p.SubMenuName === childMenuName.SubMenuName
      );
      console.log(exists);
      if (exists) {
        setExist(true);
        swal({
          title: "Try again",
          text: "Child manu already exist",
          icon: "warning",
          button: "OK",
        });
        return;
      } else if (exists === undefined) {
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
        var allTextareaValueDataLength = 0;
        if (allTextAreaValueData != null) {
          allTextareaValueDataLength = Object.keys(allTextAreaValueData).length;
        }
        var allImageValueDataLength = 0;
        if (allImageValueData != null) {
          allImageValueDataLength = Object.keys(allImageValueData).length;
        }
        var orderPosition = 0;

        for (
          let allInputValueDataCount = 0;
          allInputValueDataCount < allInputValueDataLength;
          allInputValueDataCount++
        ) {
          orderPosition++;
          var tabledataparams = {
            PageId: "PageID",
            MenuId: "MenuID",
            ColumnName: allInputValueData[allInputValueDataCount],
            ColumnType: "textbox",
            ColumnDataType: "",
            SiteName: "DynamicSite",
            CalculationType: calculationType,
            CalculationKey: allInputValueData[allInputValueDataCount],
            CalculationFormula: JSON.stringify(pageFormula),
            RelatedTable: '',
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
            PageId: "PageID",
            MenuId: "MenuID",
            ColumnName: allCheckValueData[allCheckValueDataCount],
            ColumnType: "checkbox",
            ColumnDataType: "",
            SiteName: "DynamicSite",
            CalculationType: "Manual",
            CalculationKey: "",
            CalculationFormula: "",
            RelatedTable: '',
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
            PageId: "PageID",
            MenuId: "MenuID",
            ColumnName: allDateValueData[allDateValueDataCount],
            ColumnType: "datetime",
            ColumnDataType: "",
            SiteName: "DynamicSite",
            CalculationType: "Manual",
            CalculationKey: "",
            CalculationFormula: "",
            RelatedTable:'',
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
            PageId: "PageID",
            MenuId: "MenuID",
            ColumnName: allDropValueData[allDropValueDataCount],
            ColumnType: "dropdown",
            ColumnDataType: "",
            SiteName: "DynamicSite",
            CalculationType: "Manual",
            CalculationKey: "",
            CalculationFormula: "",
            RelatedTable:allDropValueData[allDropValueDataCount],
            Position: orderPosition,
            IsDisable: "0",
          };
          tableModelData.detailsData.push(tabledataparams);
        }
        for (
          let allTeaxtAreaValueDataCount = 0;
          allTeaxtAreaValueDataCount < allTextareaValueDataLength;
          allTeaxtAreaValueDataCount++
        ) {
          orderPosition++;
          var tabledataparams = {
            PageId: "PageID",
            MenuId: "MenuID",
            ColumnName: allTextAreaValueData[allTeaxtAreaValueDataCount],
            ColumnType: "textarea",
            ColumnDataType: "",
            SiteName: "DynamicSite",
            CalculationType: "Manual",
            CalculationKey: "",
            CalculationFormula: "",
            RelatedTable:allTextAreaValueData[allTeaxtAreaValueDataCount],
            Position: orderPosition,
            IsDisable: "0",
          };
          tableModelData.detailsData.push(tabledataparams);
        }
        for (
          let allImageValueDataCount = 0;
          allImageValueDataCount < allImageValueDataLength;
          allImageValueDataCount++
        ) {
          orderPosition++;
          var tabledataparams = {
            PageId: "PageID",
            MenuId: "MenuID",
            ColumnName: allImageValueData[allImageValueDataCount],
            ColumnType: "image",
            ColumnDataType: "",
            SiteName: "DynamicSite",
            CalculationType: "Manual",
            CalculationKey: "",
            CalculationFormula: "",
            RelatedTable:allImageValueData[allImageValueDataCount],
            Position: orderPosition,
            IsDisable: "0",
          };
          tableModelData.detailsData.push(tabledataparams);
        }

        modelCreatePage.procedureName = "createChildPage";
        modelCreatePage.parameters = {
          childPageName: childMenuName.SubMenuName,
          childPageNameWithoutSpace: tableNameLowerCase,
          tableColumn: `ID varchar(128),${tableCreateData} Makedate datetime,MakeBy varchar(128)`,
          makeBy: "shima",
          parentMenu: parentMenuName.MenuName,
          menuLogo: "no logo",
          pageType: pageEntry.pageEntry,
          pageInfoJson: tableModelData.detailsData
        };
        const fatchGetDataById = async () => {
          const response = await fetch(
            "https://localhost:44372/api/GetData/GetDataById",
            {
              method: "POST",
              headers: {
                authorization: `Bearer ${token}`,
                "content-type": "application/json",
              },
              body: JSON.stringify(modelCreatePage),
            }
          );
          const data = await response.json();
          console.log(JSON.stringify(data));
          if (data.status == true) {
            swal({
              title: "Create page successfully",
              icon: "success",
              button: "OK",
            });
            
          }
        };

        fatchGetDataById();
      }
    }
  };

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
          setModalSpecificData(allModalData.Tables2);
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
    var dataTable = [];
    for (var modelArrayPosition in allModelDataTable)
      dataTable.push([
        modelArrayPosition,
        allModelDataTable[modelArrayPosition],
      ]);
      console.log(dataTable,allModelDataTable)
    var dataMenuArr = [];
    dataTable.map((element) => {
      if (element[1][0].title == radioName) {
        element[1].map((member) => {
          var dataMenuArrLength = dataMenuArr.length;
          dataMenuArr[dataMenuArrLength] = {};
          dataMenuArr[dataMenuArrLength]["label"] = member.label;
          dataMenuArr[dataMenuArrLength]["value"] = member.value;
          console.log(dataMenuArrLength)
          var allDropValueDataLength = 0;
          if (allDropValueData != null) {
            allDropValueDataLength = Object.keys(allDropValueData).length;
            console.log(allDropValueDataLength);
          }
          
          setAllDropValueData({
            ...allDropValueData,
            [i]: radioName,
          });
        });
      }
    });
    setSelectedOption((prev) => {
      console.log(prev)
      const temp__details = [...prev];
      temp__details[i] = dataMenuArr;
      return temp__details;
    });
    setShowDropDownModal(false);
  };

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

  const handleSubmit = (e) => {
    console.log(e);
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
          alert(foundKey);
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
  };
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
      console.log(allCheckValueData);
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
      class="bg-white shadow-lg  p-3 mt-4"
      onSubmit={handleSubmit}
    >
      <Grid>
        <Grid>
          <button
            type="submit"
            className="btn-createMenu"
            style={{ background: "#0A58CA" }}
          >
            Save
          </button>
          <button
            type="button"
            variant="contained"
            className="btn-createMenu"
            style={{ marginLeft: "10px", background: "#F06548" }}
            onClick={() => {}}
          >
            Clear
          </button>
        </Grid>
        <div class="container-fluid mt-4">
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
                  setAllDateValueData((prev) => {
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
                value={inputValueTextArea}
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
                  setAllTextAreaValueData((prev) => {
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
                  setInputValueTextArea(targetValue);
                }}
              />
            </div>
            <div class="col">
              <label htmlFor="" className="text-style d-block mx-auto">
               Take Image 
              </label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="number"
                size="small"
                defaultValue="0"
                value={inputValueImage}
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
                  setAllImageValueData((prev) => {
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
                  setInputValueImage(targetValue);
                }}
              />
            </div>
            <div class="w-100"></div>
            <div class="col">
              {inputData?.map((item, name) => {
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
                        setAllInputValueData({
                          ...allInputValueData,
                          [name]: e.target.value,
                        });
                        var tempValue = {
                          label: e.target.value,
                          value: e.target.value,
                        };
                        allInputValueForFormulaData[name] = tempValue;
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
            </div>
            <div class="col">
              {dropdownData.map((item, name) => {
                return (
                  <div className="d-flex align-items-center ">
                    <div className="w-100">
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
                        className="footerColor"
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
            </div>
            <div class="col">
              {checkboxData.map((item, name) => {
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
            </div>
            <div class="col">
              {dateData.map((item, name) => {
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
            </div>
            <div class="col">
              {textareaData.map((item, name) => {
                return (
                  <div >
                    <TextField
                      type="text"
                      name={`input${name}`}
                      id={name}
                      variant="outlined"
                      size="small"
                      placeholder="textarea field"
                      className="getInputValue mt-2"
                      onChange={(e) => {
                        setAllData({
                          ...allData,
                          [allData.length]: e.target.value,
                        });
                        setAllTextAreaValueData({
                          ...allTextAreaValueData,
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
            </div>
            <div class="col">
              {imageData.map((item, name) => {
                return (
                  <div >
                    <TextField
                      type="text"
                      name={`input${name}`}
                      id={name}
                      variant="outlined"
                      size="small"
                      placeholder="image field"
                      className="getInputValue mt-2"
                      onChange={(e) => {
                        setAllData({
                          ...allData,
                          [allData.length]: e.target.value,
                        });
                        setAllImageValueData({
                          ...allImageValueData,
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
            </div>
          </div>
        </div>


        <Modal
          show={showCalculactionModal}
          onHide={handleClose}
          size="lg"
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title style={{ color: "#000", fontWeight: "bold" }}>
              Calculation{" "}
            </Modal.Title>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              onClick={handleClose}
            >
              X
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className="w-50">
              <label className="fw-bold" style={{ color: "#000" }} htmlFor="">
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
            <button
              type="button"
              class="btn"
              style={{ backgroundColor: "#34C38F", color: "white" }}
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
            <Modal.Title className="text-black fw-bold">
              Select Menu
            </Modal.Title>
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
              style={{ backgroundColor: "#34C38F", border: "none" }}
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
            <label>{errorMessageString}</label>
          </Modal.Body>
        </Modal>
      </Grid>
    </form>
  );
};

export default SingleEntryForm;
