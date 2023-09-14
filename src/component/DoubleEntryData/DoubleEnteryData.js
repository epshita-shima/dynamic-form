import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
import DoubleEntryChildData from "./DoubleEntryChildData";

const DoubleEnteryData = ({
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
  const [inputValueDetails, setInputValueDetails] = useState("");
  const [inputValueDDFDetails, setInputValueDDFDetails] = useState("");
  const [inputValueCheckDetails, setInputValueCheckDetails] = useState("");
  const [inputValueDateDetails, setInputValueDateDetails] = useState("");
  const [inputValueTextAreaDetails, setInputValueTextAreaDetails] =
    useState("");
  const [inputValueImageDetails, setInputValueImageDetails] = useState("");
  const previousInputValue = useRef("");
  const previousInputValueDDF = useRef("");
  const previousInputValueCheck = useRef("");
  const previousInputValueDate = useRef("");
  const previousInputValueTextArea = useRef("");
  const previousInputValueImage = useRef("");
  const previousInputValueDetails = useRef("");
  const previousInputValueDDFDetails = useRef("");
  const previousInputValueCheckDetails = useRef("");
  const previousInputValueDateDetails = useRef("");
  const previousInputValueTextAreaDetails = useRef("");
  const previousInputValueImageDetails = useRef("");
  const [displayFormulaAuto, setDisplayFormulaAuto] = useState(false);
  const [displayFormulaAutoDetails, setDisplayFormulaAutoDetails] =
    useState(false);
  const [calculationType, setCalculationType] = useState("Manual");
  const [formulaTarget, setFormulaTarget] = useState("");
  const [calculationTypeDetails, setCalculationTypeDetails] =
    useState("Manual");
  const [formulaTargetDetails, setFormulaTargetDetails] = useState("");
  const [inputData, setInputData] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const [dateData, setDateData] = useState([]);
  const [textareaData, setTextareaData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [inputDataDetails, setInputDataDetails] = useState([]);
  const [dropdownDataDetails, setDropdownDataDetails] = useState([]);
  const [checkboxDataDetails, setCheckboxDataDetails] = useState([]);
  const [dateDataDetails, setDateDataDetails] = useState([]);
  const [textareaDataDetails, setTextareaDataDetails] = useState([]);
  const [imageDataDetails, setImageDataDetails] = useState([]);
  const [showDropDownModal, setShowDropDownModal] = useState(false);
  const [currentDropSelected, setCurrentDropSelected] = useState("0");
  const [showDropDownModalDetails, setShowDropDownModalDetails] =
    useState(false);
  const [currentDropSelectedDetails, setCurrentDropSelectedDetails] =
    useState("0");

  var arrayInput = [];
  var arrayDropdown = [];
  var arrayCheck = [];
  var arrayDate = [];
  var arrayTextArea = [];
  var arrayImage = [];
  var arrayInputDetails = [];
  var arrayDropdownDetails = [];
  var arrayCheckDetails = [];
  var arrayDateDetails = [];
  var arrayTextAreaDetails = [];
  var arrayImageDetails = [];
  const [allInputValueData, setAllInputValueData] = useState({});
  const [allDropValueData, setAllDropValueData] = useState({});
  const [allCheckValueData, setAllCheckValueData] = useState({});
  const [allDateValueData, setAllDateValueData] = useState({});
  const [allTextAreaValueData, setAllTextAreaValueData] = useState({});
  const [allImageValueData, setAllImageValueData] = useState({});
  const [inputSchema, setInputSchema] = useState(null);
  const [dropSchema, setDropSchema] = useState(null);
  const [dateSchema, setDateSchema] = useState(null);
  const [imageSchema, setImageSchema] = useState(null);
  const [textareaSchema, setTextareaSchema] = useState(null);
  const [pageSchema, setPageSchema] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessageString, setErrorMessageString] = useState("");
  const [allInputValueForFormulaData, setAllInputValueForFormulaData] =useState([]);
  const [pageFormula, setPageFormula] = useState([
    { Formula: [{ Field1: "", FormulaType: "", Field2: "" }], Target: {} },
  ]);
  const [pageFormulaDetails, setPageFormulaDetails] = useState([
    { Formula: [{ Field1: "", FormulaType: "", Field2: "" }], Target: {} },
  ]);
  const [allData, setAllData] = useState([]);
  const [selectedOptionParent, setSelectedOptionParent] = useState([]);
  const [modalSpecificData, setModalSpecificData] = useState([]);
  const [allModelDataTable, setAllModelDataTable] = useState([]);
  const [pageName, setPageName] = useState("");
  const [field1Validation, setField1Validation] = useState(2);
  const [field2Validation, setField2Validation] = useState(2);
  const [fieldTargetValidation, setFieldTargetValidation] = useState(2);
  const [fieldFormulaValidation, setFieldFormulaValidation] = useState(2);
  const [showCalculactionModal, setShowCalculactionModal] = useState(false);
  const [showCalculactionModalDetails, setShowCalculactionModalDetails] =useState(false);
  const [allInputValueDataDetails, setAllInputValueDataDetails] = useState({});
  const [allDropValueDataDetails, setAllDropValueDataDetails] = useState({});
  const [allCheckValueDataDetails, setAllCheckValueDataDetails] = useState({});
  const [allDateValueDataDetails, setAllDateValueDataDetails] = useState({});
  const [allTextAreaValueDataDetails, setAllTextAreaValueDataDetails] =
    useState({});
  const [allImageValueDataDetails, setAllImageValueDataDetails] = useState({});

  const [keyValue, setKeyValue] = useState([]);

  const handleClose = () => setShowCalculactionModal(false);
  const handleCloseDetails = () => setShowCalculactionModalDetails(false);
  const handleDropClose = () => setShowDropDownModal(false);
  const handleErrorClose = () => setShowErrorModal(false);
  const [errorsPage, setErrorsPage] = useState([]);
  const [errorsInput, setInputErrors] = useState([]);
  const [errorsDropDown, setErrorsDropDown] = useState([]);
  const [errorsDate, setErrorsDate] = useState([]);
  const [errorsTextAreaErrors, setErrorsTextAreaErrors] = useState([]);
  const [errorsImageErrors, setErrorsImageErrors] = useState([]);
  const [childMenu, setChildMenu] = useChildMenu([]);
  const [radioButton, setRadioButton] = useState([]);
  const [dropdownName, setDropdownName] = useState([]);
  const [menuId, setMenuId] = useState("");
  const [show2, setShow2] = useState(false);
  const [radioButton2, setRadioButton2] = useState([]);
  const [field1ValidationDetails, setField1ValidationDetails] = useState(2);
  const [field2ValidationDetails, setField2ValidationDetails] = useState(2);
  const [fieldTargetValidationDetails, setFieldTargetValidationDetails] =
    useState(2);
  const [fieldFormulaValidationDetails, setFieldFormulaValidationDetails] = useState(2);
  const [allInputValueForFormulaDataDetails,setAllInputValueForFormulaDataDetails] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [childModalTitle, setChildModalTitle] = useState("");
  const [inputSchemaDetails, setInputSchemaDetails] = useState(null);
  const [dropSchemaDetails, setDropSchemaDetails] = useState(null);
  const [checkSchemaDetails, setCheckSchemaDetails] = useState(null);
  const [dateSchemaDetails, setDateSchemaDetails] = useState(null);
  const [textareaSchemaDetails, setTextareaSchemaDetails] = useState(null);
  const [imageSchemaDetails, setImageSchemaDetails] = useState(null);
  const [pageSchemaDetails, setPageSchemaDetails] = useState(null);
  const [pageNameDetails, setPageNameDetails] = useState("");
  const [errorsPageDetails, setErrorsPageDetails] = useState([]);
  const [errorsInputDetails, setInputErrorsDetails] = useState([]);
  const [errorsDropDownDetails, setErrorsDropDownDetails] = useState([]);
  const [errorsDateDetails, setErrorsDateDetails] = useState([]);
  const [errorsCheckDetails, setErrorsCheckDetails] = useState([]);
  const [errorsTextareaDetails, setErrorsTextareaDetails] = useState([]);
  const [errorsImageDetails, setErrorsImageDetails] = useState([]);

  var tableInputData = [];
  var tableDropData = [];
  var tableTextareaData = [];
  var tableImageData = [];
  console.log(radioButton, radioButton2);
  const token = Token.token;
  const tableName = childMenuName.SubMenuName;
  let newString = tableName.replace("-", "_");
  const spaceRemove = newString.split(" ").join("");
  const tableNameLowerCase = spaceRemove.toLowerCase();
  console.log(keyValue);
  useEffect(() => {
    const modelKeyData = {
      procedureName: "",
      parameters: {},
    };
    modelKeyData.procedureName = "prc_getInitialData";
    fetch("https://localhost:44372/api/GetData/GetInitialData", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(modelKeyData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == true) {
          const allKeyData = JSON.parse(data.data);
          setKeyValue(allKeyData.Tables1);
        } else {
          console.log(data);
        }
      });
  }, []);
  var inputLowerCaseData = [];
  Object.entries(allInputValueData).forEach((entry) => {
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowecaseInput = convertLowerCase;
    var tableCreateDataInput =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableInputData.push(tableCreateDataInput);
    inputLowerCaseData.push(lowecaseInput);
  });

  var dropLowerCaseData = [];
  Object.entries(allDropValueData).forEach((entry) => {
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowercaseDrop = convertLowerCase;
    let tableCreateDataDrop =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableDropData.push(tableCreateDataDrop);
    dropLowerCaseData.push(lowercaseDrop);
  });

  var tableDateData = [];
  var dateLowerCaseData = [];
  Object.entries(allDateValueData).forEach((entry) => {
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowercaseDate = convertLowerCase;
    let tableCreateDataDate =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableDateData.push(tableCreateDataDate);
    dateLowerCaseData.push(lowercaseDate);
  });

  var textareaLowerCaseData = [];
  Object.entries(allTextAreaValueData).forEach((entry) => {
    console.log(entry);
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowercaseTextarea = convertLowerCase;
    let tableCreateDataTextarea =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableTextareaData.push(tableCreateDataTextarea);
    textareaLowerCaseData.push(lowercaseTextarea);
  });

  var imageLowerCaseData = [];
  Object.entries(allImageValueData).forEach((entry) => {
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowercaseImage = convertLowerCase;
    let tableCreateDataImage =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableImageData.push(tableCreateDataImage);
    imageLowerCaseData.push(lowercaseImage);
  });

  var allLowercaseData = "";
  tableInputData.forEach((element) => {
    allLowercaseData += element;
  });
  tableDropData.forEach((element) => {
    allLowercaseData += element;
  });
  tableDateData.forEach((element) => {
    allLowercaseData += element;
  });
  tableTextareaData.forEach((element) => {
    allLowercaseData += element;
  });
  tableImageData.forEach((element) => {
    allLowercaseData += element;
  });

  var tableCreateDataDetailsInput = [];
  var inputDetailsLowerCaseSata = [];
  Object.entries(allInputValueDataDetails).forEach((entry) => {
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowercaseInputDetails = convertLowerCase;
    let tableCreateInput =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableCreateDataDetailsInput.push(tableCreateInput);
    inputDetailsLowerCaseSata.push(lowercaseInputDetails);
  });

  var tableCreateDataDetailsDrop = [];
  var dropDetailsLowerCaseSata = [];
  Object.entries(allDropValueDataDetails).forEach((entry) => {
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowercaseDropDetails = convertLowerCase;
    let tableCreateDrop =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableCreateDataDetailsDrop.push(tableCreateDrop);
    dropDetailsLowerCaseSata.push(lowercaseDropDetails);
  });

  var tableCreateDataDetailsCheck = [];
  var checkboxLowerCaseData = [];
  Object.entries(allCheckValueDataDetails).forEach((entry) => {
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowercaseCheckbox = convertLowerCase;
    let tableCreateCheck =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableCreateDataDetailsCheck.push(tableCreateCheck);
    checkboxLowerCaseData.push(lowercaseCheckbox);
  });

  var tableCreateDataDetailsDate = [];
  var dateDetailsLowerCaseData = [];
  Object.entries(allDateValueDataDetails).forEach((entry) => {
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowercaseDateDetails = convertLowerCase;
    let tableCreateDate =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableCreateDataDetailsDate.push(tableCreateDate);
    dateDetailsLowerCaseData.push(lowercaseDateDetails);
  });

  var tableCreateDataDetailsTextArea = [];
  var textareaDetailsLowerCaseData = [];
  Object.entries(allTextAreaValueDataDetails).forEach((entry) => {
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowercaseTexareaDetails = convertLowerCase;
    let tableCreateTextarea =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableCreateDataDetailsTextArea.push(tableCreateTextarea);
    textareaDetailsLowerCaseData.push(lowercaseTexareaDetails);
  });

  var tableCreateDataDetailsImage = [];
  var imageDetailsLowerCaseData = [];
  Object.entries(allImageValueDataDetails).forEach((entry) => {
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowercaseImageDetails = convertLowerCase;
    let tableCreateImage =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableCreateDataDetailsImage.push(tableCreateImage);
    imageDetailsLowerCaseData.push(lowercaseImageDetails);
  });
  console.log(tableCreateDataDetailsInput);
  var allLowercaseDataDetails = "";
  tableCreateDataDetailsInput.forEach((element) => {
    allLowercaseDataDetails += element;
  });
  tableCreateDataDetailsDrop.forEach((element) => {
    allLowercaseDataDetails += element;
  });
  tableCreateDataDetailsCheck.forEach((element) => {
    allLowercaseDataDetails += element;
  });
  tableCreateDataDetailsDate.forEach((element) => {
    allLowercaseDataDetails += element;
  });
  tableCreateDataDetailsTextArea.forEach((element) => {
    allLowercaseDataDetails += element;
  });
  tableCreateDataDetailsImage.forEach((element) => {
    allLowercaseDataDetails += element;
  });

  console.log(allLowercaseDataDetails);

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
    for (let i = 0; i < inputValueTextArea; i++) {
      arrayTextArea.push(i);
    }
    for (let i = 0; i < inputValueImage; i++) {
      arrayImage.push(i);
    }

    useEffect(() => {
      setInputData(arrayInput);
      setDropdownData(arrayDropdown);
      setDateData(arrayDate);
      setTextareaData(arrayTextArea);
      setImageData(arrayImage);
    }, [
      inputValue,
      inputValueDDF,
      inputValueCheck,
      inputValueDate,
      inputValueTextArea,
      inputValueImage,
    ]);
  }

  useEffect(() => {
    previousInputValue.current = inputValue;
    previousInputValueDDF.current = inputValueDDF;
    previousInputValueCheck.current = inputValueCheck;
    previousInputValueDate.current = inputValueDate;
    previousInputValueTextArea.current = inputValueTextArea;
    previousInputValueImage.current = inputValueImage;
  }, [
    inputValue,
    inputValueDDF,
    inputValueCheck,
    inputValueDate,
    inputValueTextArea,
  ]);

  const submitForm = () => {
    const modelCreatePageSingle = {
      procedureName: "",
      parameters: {},
    };
    const modelCreatePageDetails = {
      procedureName: "",
      parameters: {},
    };

    console.log(modelCreatePageSingle);
    console.log(modelCreatePageDetails);
    if (parentMenuName.MenuName == "" || childMenuName.SubMenuName == "") {
      console.log(pageEntry.pageEntry);
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
        if ((pageEntry.pageEntry = "singleEnrtyPage")) {
          console.log(pageEntry.pageEntry);
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
            allTextareaValueDataLength =
              Object.keys(allTextAreaValueData).length;
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
              ColumnName: inputLowerCaseData[allInputValueDataCount],
              ColumnNameWithSpace: allInputValueData[allInputValueDataCount],
              ColumnType: "textbox",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: calculationType,
              CalculationKey: inputLowerCaseData[allInputValueDataCount],
              CalculationFormula: JSON.stringify(pageFormula),
              RelatedTable: "",
              Position: orderPosition,
              IsDisable:
                formulaTarget == allInputValueData[allInputValueDataCount]
                  ? "1"
                  : "0",
            };
            console.log(allInputValueData[allInputValueDataCount]);
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
              ColumnName: dateLowerCaseData[allDateValueDataCount],
              ColumnNameWithSpace: allDateValueData[allDateValueDataCount],
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
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName: dropLowerCaseData[allDropValueDataCount],
              ColumnNameWithSpace: allDropValueData[allDropValueDataCount],
              ColumnType: "dropdown",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: allDropValueData[allDropValueDataCount],
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelData.detailsData.push(tabledataparams);
          }
          for (
            let allTextAreaValueDataCount = 0;
            allTextAreaValueDataCount < allTextareaValueDataLength;
            allTextAreaValueDataCount++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName: textareaLowerCaseData[allTextAreaValueDataCount],
              ColumnNameWithSpace:
                allTextAreaValueData[allTextAreaValueDataCount],
              ColumnType: "textarea",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: allTextAreaValueData[allTextAreaValueDataCount],
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
              ColumnName: imageLowerCaseData[allImageValueDataCount],
              ColumnNameWithSpace: allImageValueData[allImageValueDataCount],
              ColumnType: "image",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: allImageValueData[allImageValueDataCount],
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelData.detailsData.push(tabledataparams);
          }
        }
        if ((pageEntry.pageEntry = "doubleEntryPage")) {
          console.log(pageEntry.pageEntry);
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
            allTextareaValueDataLength =
              Object.keys(allTextAreaValueData).length;
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
            console.log(allInputValueData);
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName: inputLowerCaseData[allInputValueDataCount],
              ColumnNameWithSpace: allInputValueData[allInputValueDataCount],
              ColumnType: "textbox",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: calculationType,
              CalculationKey: inputLowerCaseData[allInputValueDataCount],
              CalculationFormula: JSON.stringify(pageFormula),
              RelatedTable: "",
              ColumnValueField: "",
              Position: orderPosition,
              IsDisable:
                formulaTarget == allInputValueData[allInputValueDataCount]
                  ? "1"
                  : "0",
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
              ColumnName: dateLowerCaseData[allDateValueDataCount],
              ColumnNameWithSpace: allDateValueData[allDateValueDataCount],
              ColumnType: "datetime",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: "",
              ColumnValueField: "",
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
            console.log(allDropValueData[allDropValueDataCount]);
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName: dropLowerCaseData[allDropValueDataCount],
              ColumnNameWithSpace: allDropValueData[allDropValueDataCount],
              ColumnType: "dropdown",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: allDropValueData[allDropValueDataCount],
              ColumnValueField: radioButton[allDropValueDataCount],
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelData.detailsData.push(tabledataparams);
          }
          for (
            let allTextAreaValueDataCount = 0;
            allTextAreaValueDataCount < allTextareaValueDataLength;
            allTextAreaValueDataCount++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName: textareaLowerCaseData[allTextAreaValueDataCount],
              ColumnNameWithSpace:
                allTextAreaValueData[allTextAreaValueDataCount],
              ColumnType: "textarea",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: allTextAreaValueData[allTextAreaValueDataCount],
              ColumnValueField: "",
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
              ColumnName: imageLowerCaseData[allImageValueDataCount],
              ColumnNameWithSpace: allImageValueData[allImageValueDataCount],
              ColumnType: "image",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: allImageValueData[allImageValueDataCount],
              ColumnValueField: "",
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelData.detailsData.push(tabledataparams);
          }
          var tableModelDataDetails = {
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
          tableModelDataDetails.detailsData = [];
          tableModelDataDetails.tableNameChild = "PageInfo";

          var allInputValueDataLengthDetails = 0;
          if (allInputValueDataDetails != null) {
            allInputValueDataLengthDetails = Object.keys(
              allInputValueDataDetails
            ).length;
          }

          var allCheckValueDataLengthDetails = 0;
          if (allCheckValueDataDetails != null) {
            allCheckValueDataLengthDetails = Object.keys(
              allCheckValueDataDetails
            ).length;
          }

          var allDateValueDataLengthDetails = 0;
          if (allDateValueDataDetails != null) {
            allDateValueDataLengthDetails = Object.keys(
              allDateValueDataDetails
            ).length;
          }

          var allDropValueDataLengthDetails = 0;
          if (allDropValueDataDetails != null) {
            allDropValueDataLengthDetails = Object.keys(
              allDropValueDataDetails
            ).length;
          }
          var allTextareaValueDataLengthDetails = 0;
          if (allTextAreaValueDataDetails != null) {
            allTextareaValueDataLengthDetails = Object.keys(
              allTextAreaValueDataDetails
            ).length;
          }
          var allImageValueDataLengthDetails = 0;
          if (allImageValueDataDetails != null) {
            allImageValueDataLengthDetails = Object.keys(
              allImageValueDataDetails
            ).length;
          }
          var orderPosition = 0;

          for (
            let allInputValueDataCountDetails = 0;
            allInputValueDataCountDetails < allInputValueDataLengthDetails;
            allInputValueDataCountDetails++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName:
                inputDetailsLowerCaseSata[allInputValueDataCountDetails],
              ColumnNameWithSpace:
                allInputValueDataDetails[allInputValueDataCountDetails],
              ColumnType: "textbox",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: calculationTypeDetails,
              CalculationKey:
                allInputValueDataDetails[allInputValueDataCountDetails],
              CalculationFormula: JSON.stringify(pageFormulaDetails),
              RelatedTable: "",
              ColumnValueField: "",
              Position: orderPosition,
              IsDisable:
                formulaTargetDetails ==
                allInputValueDataDetails[allInputValueDataCountDetails]
                  ? "1"
                  : "0",
            };
            tableModelDataDetails.detailsData.push(tabledataparams);
          }

          for (
            let allCheckValueDataCountDetails = 0;
            allCheckValueDataCountDetails < allCheckValueDataLengthDetails;
            allCheckValueDataCountDetails++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName: checkboxLowerCaseData[allCheckValueDataCountDetails],
              ColumnNameWithSpace:
                allCheckValueDataDetails[allCheckValueDataCountDetails],
              ColumnType: "checkbox",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: "",
              ColumnValueField: "",
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelDataDetails.detailsData.push(tabledataparams);
          }

          for (
            let allDateValueDataCountDetails = 0;
            allDateValueDataCountDetails < allDateValueDataLengthDetails;
            allDateValueDataCountDetails++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName:
                dateDetailsLowerCaseData[allDateValueDataCountDetails],
              ColumnNameWithSpace:
                allDateValueDataDetails[allDateValueDataCountDetails],
              ColumnType: "datetime",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: "",
              ColumnValueField: "",
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelDataDetails.detailsData.push(tabledataparams);
          }

          for (
            let allDropValueDataCountDetails = 0;
            allDropValueDataCountDetails < allDropValueDataLengthDetails;
            allDropValueDataCountDetails++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName:
                dropDetailsLowerCaseSata[allDropValueDataCountDetails],
              ColumnNameWithSpace:
                allDropValueDataDetails[allDropValueDataCountDetails],
              ColumnType: "dropdown",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable:
                allDropValueDataDetails[allDropValueDataCountDetails],
              ColumnValueField: radioButton2[allDropValueDataCountDetails],
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelDataDetails.detailsData.push(tabledataparams);
          }
          for (
            let allTeaxtAreaValueDataCountDetails = 0;
            allTeaxtAreaValueDataCountDetails <
            allTextareaValueDataLengthDetails;
            allTeaxtAreaValueDataCountDetails++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName:
                textareaDetailsLowerCaseData[allTeaxtAreaValueDataCountDetails],
              ColumnNameWithSpace:
                allTextAreaValueDataDetails[allTeaxtAreaValueDataCountDetails],
              ColumnType: "textarea",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable:
                allTextAreaValueDataDetails[allTeaxtAreaValueDataCountDetails],
              ColumnValueField: "",
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelDataDetails.detailsData.push(tabledataparams);
          }
          for (
            let allImageValueDataCountDetails = 0;
            allImageValueDataCountDetails < allImageValueDataLengthDetails;
            allImageValueDataCountDetails++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName:
                imageDetailsLowerCaseData[allImageValueDataCountDetails],
              ColumnNameWithSpace:
                allImageValueDataDetails[allImageValueDataCountDetails],
              ColumnType: "image",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable:
                allImageValueDataDetails[allImageValueDataCountDetails],
              ColumnValueField: "",
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelDataDetails.detailsData.push(tabledataparams);
          }
        }
        console.log(tableModelDataDetails);
        if (pageEntry.pageEntry == "singleEnrtyPage") {
          modelCreatePageDetails.procedureName = "createChildPage";
          modelCreatePageDetails.parameters = {
            childPageName: childMenuName.SubMenuName,
            childPageNameWithoutSpace: tableNameLowerCase,
            tableColumn: `ID varchar(128),${allLowercaseData} Makedate datetime,MakeBy varchar(128)`,
            makeBy: "shima",
            parentMenu: parentMenuName.MenuName,
            menuLogo: "no logo",
            pageType: pageEntry.pageEntry,
            pageInfoJson: tableModelData.detailsData,
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
                body: JSON.stringify(modelCreatePageDetails),
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

        if (pageEntry.pageEntry == "doubleEntryPage") {
          modelCreatePageSingle.procedureName = "createChildPageDouble";
          modelCreatePageSingle.parameters = {
            childPageName: childMenuName.SubMenuName,
            childPageNameWithoutSpace: tableNameLowerCase,
            tableColumn: `ID varchar(128),${allLowercaseData} Makedate datetime,MakeBy varchar(128), InsertTime datetime`,
            makeBy: "shima",
            parentMenu: parentMenuName.MenuName,
            menuLogo: "no logo",
            pageType: pageEntry.pageEntry,
            pageInfoJson: tableModelData.detailsData,
            pageInfoDetailsJson: tableModelDataDetails.detailsData,
            childPageNameDetailsWithoutSpace: tableNameLowerCase + "details",
            tableColumnDetails: `DetailsId varchar(128),ID varchar(128),${allLowercaseDataDetails} Makedate datetime,MakeBy varchar(128), InsertTime datetime`,
          };
          console.log(JSON.stringify(modelCreatePageSingle));
          const fatchGetDataById = async () => {
            const response = await fetch(
              "https://localhost:44372/api/GetData/GetDataById",
              {
                method: "POST",
                headers: {
                  authorization: `Bearer ${token}`,
                  "content-type": "application/json",
                },
                body: JSON.stringify(modelCreatePageSingle),
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
        console.log(
          modelCreatePageDetails,
          JSON.stringify(modelCreatePageSingle)
        );
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
          console.log(allModalData);
          setModalSpecificData(allModalData.Tables2);
        } else {
          console.log(data);
        }
      });
  };
  const handleDropdownValue = (i) => {
    console.log(i);

    console.log(document.querySelector('input[name="dropValueField"]:checked'));
    var radioName = 0;
    console.log(radioName);
    if (
      document.querySelector('input[name="dropValueField"]:checked') != null
    ) {
      radioName = document.querySelector(
        'input[name="dropValueField"]:checked'
      ).value;
    }
    console.log(radioName);
    setModalTitle(radioName);
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
          setAllModelDataTable(allModalData);

          setAllDropValueData({
            ...allDropValueData,
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
          setDropdownName(showSingleData.Tables1);
        }
      });
    setShowDropDownModal(false);
  };
  const handleDropdown = (i) => {
    console.log(i);
    let radioName = 0;
    if (
      document.querySelector('input[name="dropValueFieldCheck"]:checked') !=
      null
    ) {
      radioName = document.querySelector(
        'input[name="dropValueFieldCheck"]:checked'
      ).value;
    }
    console.log(radioName);
    setRadioButton([...radioButton, radioName]);
    var dataTable = [];
    console.log(allModelDataTable);
    for (var modelArrayPosition in allModelDataTable)
      dataTable.push([
        modelArrayPosition,
        allModelDataTable[modelArrayPosition],
      ]);
    console.log(dataTable, allModelDataTable);
    var dataMenuArr = [];
    dataTable.map((element) => {
      console.log(element);

      // if (element[1][0].title == radioName) {
      element.map((member) => {
        for (var key in member) {
          if (member.hasOwnProperty(key)) {
            if (key != "0") {
              if (key == radioName) {
                var dataMenuArrLength = dataMenuArr.length;
                dataMenuArr[dataMenuArrLength] = {};
                dataMenuArr[dataMenuArrLength]["value"] = member.ID;
                var val = member[key];
                dataMenuArr[dataMenuArrLength]["label"] = val;
              }
            }
          }
        }
        console.log(dataMenuArr);
        var allDropValueDataLength = 0;
        if (allDropValueData != null) {
          allDropValueDataLength = Object.keys(allDropValueData).length;
          console.log(allDropValueDataLength);
        }
      });
      // }
    });
    setSelectedOptionParent((prev) => {
      console.log(prev);
      const temp__details = [...prev];
      temp__details[i] = dataMenuArr;
      return temp__details;
    });
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
      console.log(schemaForDrop);
      setDropSchema(schemaForDrop);
      validateDropFields(schemaForDrop);
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
    var allTestAreaValueDataLength = 0;
    if (allTextAreaValueData != null) {
      allTestAreaValueDataLength = Object.keys(allTextAreaValueData).length;
    }
    if (allTestAreaValueDataLength > 0) {
      var schemaForTextArea =createDynamicSchemaForTextarea(allTextAreaValueData);
      setTextareaSchema(schemaForTextArea);
      validateTextAreaFields(schemaForTextArea);
    }
    var allImageValueDataLength = 0;
    if (allImageValueData != null) {
      allImageValueDataLength = Object.keys(allImageValueData).length;
    }
    if (allImageValueDataLength > 0) {
      var schemaForImage = createDynamicSchemaForImage(allImageValueData);
      setImageSchema(schemaForImage);
      validateDateImageFields(schemaForImage);
    }

   
    var allInputValueDataLengthDetails = 0;
    if (allInputValueDataDetails != null) {
      allInputValueDataLengthDetails = Object.keys(
        allInputValueDataDetails
      ).length;
    }
    if (allInputValueDataLengthDetails > 0) {
      var schemaForInputDetails = createDynamicSchemaDetails(allInputValueDataDetails);
      setInputSchemaDetails(schemaForInputDetails);
      validateInputFieldsDetails(schemaForInputDetails);
    }

    var schemaForPageDetails = createPageSchemaDetails(pageNameDetails);
    setPageSchemaDetails(schemaForPageDetails);
    validatePageNameFieldsDetails(schemaForPageDetails);

    var allDropValueDataLengthDetails = 0;
    if (allDropValueDataDetails != null) {
      allDropValueDataLengthDetails = Object.keys(
        allDropValueDataDetails
      ).length;
    }
    if (allDropValueDataLengthDetails > 0) {
      var schemaForDropDetails = createDynamicSchemaForDropDetails(allDropValueDataDetails);
      setDropSchemaDetails(schemaForDropDetails);
      validateDropFieldsDetails(schemaForDropDetails);
    }
    var allCheckValueDataLengthDetails = 0;
    if (allCheckValueDataDetails != null) {
      allCheckValueDataLengthDetails = Object.keys(
        allCheckValueDataDetails
      ).length;
    }
    if (allCheckValueDataLengthDetails > 0) {
      var schemaForCheck = createDynamicSchemaForCheckDetails(
        allCheckValueDataDetails
      );
      setCheckSchemaDetails(schemaForCheck);
      validateCheckFieldsDetails(schemaForCheck);
    }

    var allDateValueDataLengthDetails = 0;
    if (allDateValueDataDetails != null) {
      allDateValueDataLengthDetails = Object.keys(
        allDateValueDataDetails
      ).length;
    }
    if (allDateValueDataLengthDetails > 0) {
      var schemaForDateDetails = createDynamicSchemaForDateDetails(allDateValueDataDetails);
      setDateSchemaDetails(schemaForDateDetails);
      validateDateFieldsDetails(schemaForDateDetails);
    }

    var allTextareaValueDataLengthDetails = 0;
    if (allTextAreaValueDataDetails != null) {
      allTextareaValueDataLengthDetails = Object.keys(
        allTextAreaValueDataDetails
      ).length;
    }
    if (allTextareaValueDataLengthDetails > 0) {
      var schemaForTextareaDetails = createDynamicSchemaForTextareaDetails(allTextAreaValueDataDetails);
      setTextareaSchemaDetails(schemaForTextareaDetails);
      validateTextareaFieldsDetails(schemaForTextareaDetails);
    }
    var allImageValueDataLengthDetails = 0;
    if (allImageValueDataDetails != null) {
      allImageValueDataLengthDetails = Object.keys(
        allImageValueDataDetails
      ).length;
    }
    if (allImageValueDataLengthDetails > 0) {
      var schemaForImageDetails = createDynamicSchemaForTextareaDetails(allImageValueDataDetails);
      setImageSchemaDetails(schemaForImageDetails);
      validateImageFieldsDetails(schemaForImageDetails);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    validationOutsideSchema();
    var foundKey = 0;
    var foundChildKey = 0;
    var foundEmpty = 0;
    var allInputValueDataLength = 0;
    if (inputValue != "") {
      allInputValueDataLength = inputValue;
    }
    var allInputValueDataLengthDetails = 0;
    if (inputValueDetails != "") {
      allInputValueDataLengthDetails = inputValueDetails;
    }

    var allCheckValueDataLength = 0;
    if (inputValueCheck != "") {
      allCheckValueDataLength = inputValueCheck;
    }
    var allCheckValueDataLengthDetails = 0;
    if (inputValueCheckDetails != "") {
      allCheckValueDataLengthDetails = inputValueCheckDetails;
    }

    var allDateValueDataLength = 0;
    if (inputValueDate != "") {
      allDateValueDataLength = inputValueDate;
    }
    var allDateValueDataLengthDetails = 0;
    if (inputValueDateDetails != "") {
      allDateValueDataLengthDetails = inputValueDateDetails;
    }

    var allDropValueDataLength = 0;
    if (inputValueDDF != "") {
      allDropValueDataLength = inputValueDDF;
    }
    var allDropValueDataLengthDetails = 0;
    if (inputValueDDFDetails != "") {
      allDropValueDataLengthDetails = inputValueDDFDetails;
    }
    var totalField =
      allCheckValueDataLength +
      allInputValueDataLength +
      allDateValueDataLength +
      allDropValueDataLength;

    var totalFieldDetails =
      allCheckValueDataLengthDetails +
      allInputValueDataLengthDetails +
      allDateValueDataLengthDetails +
      allDropValueDataLengthDetails;

    if (totalField > 12) {
      setErrorMessageString("There cannot be more than 12 input");
      setShowErrorModal(true);
    } else if (totalField == 0) {
      setErrorMessageString("There need to be more than 0 input");
      setShowErrorModal(true);
    } else {
      var totalValueField = 0;
      console.log(allDropValueData);
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

      // var allCheckValueDataLength = 0;
      // if (allCheckValueData != null) {
      //   allCheckValueDataLength = Object.keys(allCheckValueData).length;
      // }
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
        if (inputValue > 2 || inputValueDetails > 2) {
          console.log(
            keyValue,
            allInputValueData,
            allInputValueDataDetails,
            allInputValueDataLength,
            allInputValueDataLengthDetails
          );
          for (
            let countKeyValue = 0;
            countKeyValue < allInputValueDataLength;
            countKeyValue++
          ) {
            if (
              keyValue.some(
                (item) =>
                  item.KeyValue.toLowerCase() ===
                  allInputValueData[countKeyValue].toLowerCase()
              )
            ) {
              foundKey = 1;
            }
          }

          for (
            let countKeyValue = 0;
            countKeyValue < allInputValueDataLengthDetails;
            countKeyValue++
          ) {
            if (
              keyValue.some(
                (item) =>
                  item.KeyValue.toLowerCase() ===
                  allInputValueDataDetails[countKeyValue].toLowerCase()
              )
            ) {
              foundChildKey = 1;
            }
          }
          alert(foundKey);
          if (foundKey == 1 && foundChildKey == 0) {
            setShowCalculactionModal(true);
          } else if (foundKey == 0 && foundChildKey == 1) {
            setShowCalculactionModalDetails(true);
          } else {
            submitForm();
          }
        } else {
          submitForm();
        }
      }
    }
    if (totalFieldDetails > 12) {
      setErrorMessageString("There cannot be more than 12 input");
      setShowErrorModal(true);
    } else if (totalFieldDetails == 0) {
      setErrorMessageString("There need to be more than 0 input");
      setShowErrorModal(true);
    } else {
      var totalValueField = 0;
      console.log(allDropValueData);
      var errorstatus = 0;
      var allInputValueDataLengthDEtails = 0;
      if (allInputValueDataDetails != null) {
        allInputValueDataLengthDetails = Object.keys(allInputValueDataDetails).length;
      }
      for (
        var allInputCountDetails = 0;
        allInputCountDetails < allInputValueDataLengthDetails;
        allInputCountDetails++
      ) {
        if (allInputValueDataDetails[allInputCountDetails] == "") {
          foundEmpty = 1;
        }
      }

  
      for (
        var allInputCountDetails = 0;
        allInputCountDetails < allInputValueDataLengthDetails;
        allInputCountDetails++
      ) {
        if (allInputValueDataDetails[allInputCountDetails] == "") {
          foundEmpty = 1;
        }
      }

      var allDropValueDataLengthDetails = 0;
      if (allDropValueDataDetails != null) {
        allDropValueDataLengthDetails = Object.keys(allDropValueDataDetails).length;
      }
      for (
        var allDropCountDetails = 0;
        allDropCountDetails < allDropValueDataLengthDetails;
        allDropCountDetails++
      ) {
        console.log(allDropValueDataDetails[allDropCountDetails]);
        if (allDropValueDataDetails[allDropCountDetails] == "") {
          foundEmpty = 1;
        }
      }

      var allDateValueDataLengthDetails = 0;
      if (allDateValueDataDetails != null) {
        allDateValueDataLengthDetails = Object.keys(allDateValueDataDetails).length;
      }
      for (
        var allDateCountDetails = 0;
        allDateCountDetails < allDateValueDataLengthDetails;
        allDateCountDetails++
      ) {
        if (allDateValueDataDetails[allDateCountDetails] == "") {
          foundEmpty = 1;
        }
      }
      if (foundEmpty == 1) {
      } else {
        if ( inputValueDetails > 2) {
          console.log(
            keyValue,
            allInputValueData,
            allInputValueDataDetails,
            allInputValueDataLength,
            allInputValueDataLengthDetails
          );

          for (
            let countKeyValue = 0;
            countKeyValue < allInputValueDataLengthDetails;
            countKeyValue++
          ) {
            if (
              keyValue.some(
                (item) =>
                  item.KeyValue.toLowerCase() ===
                  allInputValueDataDetails[countKeyValue].toLowerCase()
              )
            ) {
              foundChildKey = 1;
            }
          }
          alert(foundKey);
          if (foundKey == 1 && foundChildKey == 0) {
            setShowCalculactionModal(true);
          } else if (foundKey == 0 && foundChildKey == 1) {
            setShowCalculactionModalDetails(true);
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
    return Yup.string().required();
  };
  const createDynamicSchema = (fields) => {
    const schemaFields = {};

    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
    return Yup.object().shape(schemaFields);
  };

  const createDynamicSchemaForDrop = (fields) => {
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
    return Yup.object().shape(schemaFields);
  };
  const createDynamicSchemaForTextarea = (fields) => {
    const schemaFields = {};
    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
    return Yup.object().shape(schemaFields);
  };
  const createDynamicSchemaForImage = (fields) => {
    const schemaFields = {};
    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
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
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };

  const validateDropFields = async (schema) => {
    try {
      await schema.validate(allDropValueData, { abortEarly: false });

      // All fields passed validation
      setErrorsDropDown([]);
    } catch (validationErrors) {
      console.log(validationErrors);
      setErrorsDropDown(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };

  const validateDateFields = async (schema) => {
    console.log(allDateValueData);
    try {
      await schema.validate(allDateValueData, { abortEarly: false });

      // All fields passed validation
      setErrorsDate([]);
    } catch (validationErrors) {
      // Some fields failed validation
      console.log(validationErrors);
      setErrorsDate(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };
  const validateTextAreaFields = async (schema) => {
    console.log(allTextAreaValueData);
    try {
      await schema.validate(allTextAreaValueData, { abortEarly: false });

      // All fields passed validation
      setErrorsTextAreaErrors([]);
    } catch (validationErrors) {
      // Some fields failed validation
      console.log(validationErrors);
      setErrorsTextAreaErrors(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };
  const validateDateImageFields = async (schema) => {
    console.log(allImageValueData);
    try {
      await schema.validate(allImageValueData, { abortEarly: false });

      // All fields passed validation
      setErrorsImageErrors([]);
    } catch (validationErrors) {
      // Some fields failed validation
      console.log(validationErrors);
      setErrorsImageErrors(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };
 
  const createPageSchemaDetails = (fields) => {
    return Yup.string().required();
  };
  const createDynamicSchemaDetails = (fields) => {
    const schemaFields = {};

    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
 
    return Yup.object().shape(schemaFields);
  };

  const createDynamicSchemaForDropDetails = (fields) => {
    const schemaFields = {};
    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
    return Yup.object().shape(schemaFields);
  };

  const createDynamicSchemaForCheckDetails = (fields) => {
    const schemaFields = {};
    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
    return Yup.object().shape(schemaFields);
  };

  const createDynamicSchemaForDateDetails = (fields) => {
    const schemaFields = {};
    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
    return Yup.object().shape(schemaFields);
  };
  const createDynamicSchemaForTextareaDetails = (fields) => {
    const schemaFields = {};
    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
    return Yup.object().shape(schemaFields);
  };
  const createDynamicSchemaForImageDetails = (fields) => {
    const schemaFields = {};
    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
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
  const validatePageNameFieldsDetails = async (schema) => {
    try {
      await schema.validate(pageNameDetails, { abortEarly: false });

      // All fields passed validation
      setErrorsPageDetails([]);
    } catch (validationErrors) {
      // Some fields failed validation

      setErrorsPageDetails(
        validationErrors.inner.map((err) => ({
          index: 0,
          message: err.message,
        }))
      );
    }
  };
  const validateInputFieldsDetails = async (schema) => {
    try {
      console.log(schema);
      await schema.validate(allInputValueDataDetails, { abortEarly: false });

      // All fields passed validation
      setInputErrorsDetails([]);
    } catch (validationErrors) {
      // Some fields failed validation
      console.log(validationErrors);
      setInputErrorsDetails(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };

  const validateDropFieldsDetails = async (schema) => {
    try {
      console.log(allDropValueDataDetails);
      await schema.validate(allDropValueDataDetails, { abortEarly: false });

      // All fields passed validation
      setErrorsDropDownDetails([]);
    } catch (validationErrors) {
      console.log(validationErrors);
      setErrorsDropDownDetails(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };

  const validateCheckFieldsDetails = async (schema) => {
    try {
      console.log(allCheckValueDataDetails);
      await schema.validate(allCheckValueDataDetails, { abortEarly: false });

      // All fields passed validation
      setErrorsCheckDetails([]);
    } catch (validationErrors) {
      // Some fields failed validation
      console.log(validationErrors);
      setErrorsCheckDetails(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };

  const validateDateFieldsDetails = async (schema) => {
    try {
      await schema.validate(allDateValueDataDetails, { abortEarly: false });

      // All fields passed validation
      setErrorsDateDetails([]);
    } catch (validationErrors) {
      // Some fields failed validation
      setErrorsDateDetails(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };
  const validateTextareaFieldsDetails = async (schema) => {
    try {
      await schema.validate(allTextAreaValueDataDetails, { abortEarly: false });

      // All fields passed validation
      setErrorsTextareaDetails([]);
    } catch (validationErrors) {
      setErrorsTextareaDetails(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };
  const validateImageFieldsDetails = async (schema) => {
    try {
      await schema.validate(allImageValueDataDetails, { abortEarly: false });

      // All fields passed validation
      setErrorsImageDetails([]);
    } catch (validationErrors) {
      setErrorsImageDetails(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };

  return (
    <>
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
              onClick={() => {
                setChildMenuName({ SubMenuName: "" });
                setInputValue("");
                setInputValueDDF("");
                setInputValueDate("");
                setInputValueTextArea("");
                setInputValueImage("");
                setInputValueDetails("");
                setInputValueDDFDetails("");
                setInputValueCheckDetails("");
                setInputValueDateDetails("");
                setInputValueTextAreaDetails("");
                setInputValueImageDetails("");

                setAllInputValueData("");
                setAllDropValueData("");
                setAllDateValueData("");
                setAllTextAreaValueData("");
                setAllImageValueData("");
                setAllInputValueDataDetails("");
                setAllDropValueDataDetails("");
                setAllCheckValueDataDetails("");
                setAllDateValueDataDetails("");
                setAllTextAreaValueDataDetails("");
                setAllImageValueDataDetails("");
              }}
            >
              Clear
            </button>
          </Grid>
          <div class="container-fluid mt-4">
            <h2 className="fs-4 fw-bold" style={{ color: "#3AAFA9" }}>
              Parent Field
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
                  Image Field
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
                          options={selectedOptionParent[name]}
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
                      {errorsTextAreaErrors
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
                      {errorsImageErrors
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
                      let fieldName = e.value;
                      let newString = fieldName.replace("-", "_");
                      const spaceRemove = newString.split(" ").join("");
                      const fieldNameLowerCase = spaceRemove.toLowerCase();
                      console.log(e.value, pageFormula);
                      if (
                        pageFormula[0]["Formula"][0]["Field2"] ==
                        fieldNameLowerCase
                      ) {
                        setField1Validation(0);
                      } else if (
                        pageFormula[0]["Target"] == fieldNameLowerCase
                      ) {
                        setField1Validation(0);
                      } else {
                        setField1Validation(1);
                        pageFormula[0]["Formula"][0]["Field1"] =
                          fieldNameLowerCase;
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
                      let fieldName = e.value;
                      let newString = fieldName.replace("-", "_");
                      const spaceRemove = newString.split(" ").join("");
                      const fieldNameLowerCase = spaceRemove.toLowerCase();
                      console.log(fieldNameLowerCase);
                      console.log(e.value, pageFormula);
                      console.log(e.value);
                      if (
                        pageFormula[0]["Formula"][0]["Field1"] ==
                        fieldNameLowerCase
                      ) {
                        setField2Validation(0);
                      } else if (
                        pageFormula[0]["Target"] == fieldNameLowerCase
                      ) {
                        setField2Validation(0);
                      } else {
                        setField2Validation(1);
                        pageFormula[0]["Formula"][0]["Field2"] =
                          fieldNameLowerCase;
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
                      let fieldName = e.value;
                      let newString = fieldName.replace("-", "_");
                      const spaceRemove = newString.split(" ").join("");
                      const fieldNameLowerCase = spaceRemove.toLowerCase();
                      console.log(fieldNameLowerCase);
                      if (
                        pageFormula[0]["Formula"][0]["Field1"] ==
                        fieldNameLowerCase
                      ) {
                        setFieldTargetValidation(0);
                      } else if (
                        pageFormula[0]["Formula"][0]["Field2"] ==
                        fieldNameLowerCase
                      ) {
                        setFieldTargetValidation(0);
                      } else {
                        console.log(e.value);
                        setFormulaTarget(fieldNameLowerCase);
                        setFieldTargetValidation(1);
                        pageFormula[0]["Target"] = fieldNameLowerCase;
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
                  handleDropdownValue(currentDropSelected);
                  setShow2(true);
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
          <Modal show={show2} onHide={() => setShow2(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{modalTitle}</Modal.Title>
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
                      <h4 className="text-black ms-2 fs-5">
                        {item.ColumnName}
                      </h4>
                    </div>
                  </>
                );
              })}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={(e) => {
                  handleDropdown(currentDropSelected);
                  setShow2(false);
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showCalculactionModalDetails}
            onHide={handleCloseDetails}
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
                onClick={handleCloseDetails}
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
                    setCalculationTypeDetails(e.value);
                    if (e.value == "Auto") {
                      setDisplayFormulaAutoDetails(true);
                    } else {
                      setDisplayFormulaAutoDetails(false);
                    }
                  }}
                ></Select>
              </div>
              <div
                className={`d-flex justify-content-between ${
                  displayFormulaAutoDetails ? "d-visible" : "d-hidden"
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
                    options={allInputValueForFormulaDataDetails}
                    id={`dropValueField1`}
                    onChange={(e) => {
                      console.log(e.value, pageFormulaDetails);
                      if (
                        pageFormulaDetails[0]["Formula"][0]["Field2"] == e.value
                      ) {
                        setField1ValidationDetails(0);
                      } else if (pageFormulaDetails[0]["Target"] == e.value) {
                        setField1ValidationDetails(0);
                      } else {
                        setField1ValidationDetails(1);
                        pageFormulaDetails[0]["Formula"][0]["Field1"] = e.value;
                      }
                    }}
                  ></Select>

                  {field1ValidationDetails == 0 ? (
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
                      pageFormulaDetails[0]["Formula"][0]["FormulaType"] =
                        e.value;
                      if (e.value != "") {
                        setFieldFormulaValidationDetails(1);
                      } else {
                        setFieldFormulaValidationDetails(0);
                      }
                    }}
                  ></Select>

                  {fieldFormulaValidationDetails == 0 ? (
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
                    options={allInputValueForFormulaDataDetails}
                    id={`dropValueField2`}
                    onChange={(e) => {
                      console.log(e.value);
                      if (
                        pageFormulaDetails[0]["Formula"][0]["Field1"] == e.value
                      ) {
                        setField2ValidationDetails(0);
                      } else if (pageFormulaDetails[0]["Target"] == e.value) {
                        setField2ValidationDetails(0);
                      } else {
                        setField2ValidationDetails(1);
                        pageFormulaDetails[0]["Formula"][0]["Field2"] = e.value;
                      }
                    }}
                  ></Select>
                  {field2ValidationDetails == 0 ? (
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
                    options={allInputValueForFormulaDataDetails}
                    id={`dropValueFieldTarget`}
                    onChange={(e) => {
                      if (
                        pageFormulaDetails[0]["Formula"][0]["Field1"] == e.value
                      ) {
                        setFieldTargetValidationDetails(0);
                      } else if (
                        pageFormulaDetails[0]["Formula"][0]["Field2"] == e.value
                      ) {
                        setFieldTargetValidationDetails(0);
                      } else {
                        console.log(e.value);
                        setFormulaTargetDetails(e.value);
                        setFieldTargetValidationDetails(1);
                        pageFormulaDetails[0]["Target"] = e.value;
                      }
                    }}
                  ></Select>
                  {fieldTargetValidationDetails == 0 ? (
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
                  if (
                    pageFormulaDetails[0]["Formula"][0]["FormulaType"] == ""
                  ) {
                    setFieldFormulaValidationDetails(0);
                  }
                  if (pageFormulaDetails[0]["Formula"][0]["Field2"] == "") {
                    setField2ValidationDetails(0);
                  }
                  if (pageFormulaDetails[0]["Formula"][0]["Field1"] == "") {
                    setField1ValidationDetails(0);
                  }
                  if (
                    pageFormulaDetails[0]["Formula"][0]["FormulaType"] == ""
                  ) {
                    setFieldFormulaValidationDetails(0);
                  }
                  if (pageFormulaDetails[0]["Formula"][0]["Target"] == "") {
                    setFieldTargetValidationDetails(0);
                  }
                  if (
                    field1ValidationDetails != 1 ||
                    field2ValidationDetails != 1 ||
                    fieldFormulaValidationDetails != 1 ||
                    fieldTargetValidationDetails != 1
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
          <DoubleEntryChildData
            parentMenuName={parentMenuName}
            childMenuName={childMenuName}
            pageEntry={pageEntry}
            setParentMenuName={setParentMenuName}
            setChildMenuName={setChildMenuName}
            setPageEntry={setPageEntry}
            setExist={setExist}
            allInputValueDataDetails={allInputValueDataDetails}
            setAllInputValueDataDetails={setAllInputValueDataDetails}
            allDropValueDataDetails={allDropValueDataDetails}
            setAllDropValueDataDetails={setAllDropValueDataDetails}
            allCheckValueDataDetails={allCheckValueDataDetails}
            setAllCheckValueDataDetails={setAllCheckValueDataDetails}
            allDateValueDataDetails={allDateValueDataDetails}
            setAllDateValueDataDetails={setAllDateValueDataDetails}
            allTextAreaValueDataDetails={allTextAreaValueDataDetails}
            setAllTextAreaValueDataDetails={setAllTextAreaValueDataDetails}
            allImageValueDataDetails={allImageValueDataDetails}
            setAllImageValueDataDetails={setAllImageValueDataDetails}
            inputValueDetails={inputValueDetails}
            setInputValueDetails={setInputValueDetails}
            inputValueDDFDetails={inputValueDDFDetails}
            setInputValueDDFDetails={setInputValueDDFDetails}
            inputValueCheckDetails={inputValueCheckDetails}
            setInputValueCheckDetails={setInputValueCheckDetails}
            inputValueDateDetails={inputValueDateDetails}
            setInputValueDateDetails={setInputValueDateDetails}
            inputValueTextAreaDetails={inputValueTextAreaDetails}
            setInputValueTextAreaDetails={setInputValueTextAreaDetails}
            inputValueImageDetails={inputValueImageDetails}
            setInputValueImageDetails={setInputValueImageDetails}
            previousInputValueDetails={previousInputValueDetails}
            previousInputValueDDFDetails={previousInputValueDDFDetails}
            previousInputValueCheckDetails={previousInputValueCheckDetails}
            previousInputValueDateDetails={previousInputValueDateDetails}
            previousInputValueTextAreaDetails={
              previousInputValueTextAreaDetails
            }
            previousInputValueImageDetails={previousInputValueImageDetails}
            displayFormulaAutoDetails={displayFormulaAutoDetails}
            setDisplayFormulaAutoDetails={setDisplayFormulaAutoDetails}
            setCalculationTypeDetails={setCalculationTypeDetails}
            setFormulaTargetDetails={setFormulaTargetDetails}
            inputDataDetails={inputDataDetails}
            setInputDataDetails={setInputDataDetails}
            dropdownDataDetails={dropdownDataDetails}
            setDropdownDataDetails={setDropdownDataDetails}
            checkboxDataDetails={checkboxDataDetails}
            setCheckboxDataDetails={setCheckboxDataDetails}
            dateDataDetails={dateDataDetails}
            setDateDataDetails={setDateDataDetails}
            textareaDataDetails={textareaDataDetails}
            setTextareaDataDetails={setTextareaDataDetails}
            imageDataDetails={imageDataDetails}
            setImageDataDetails={setImageDataDetails}
            showDropDownModalDetails={showDropDownModalDetails}
            setShowDropDownModalDetails={setShowDropDownModalDetails}
            currentDropSelectedDetails={currentDropSelectedDetails}
            setCurrentDropSelectedDetails={setCurrentDropSelectedDetails}
            arrayInputDetails={arrayInputDetails}
            arrayDropdownDetails={arrayDropdownDetails}
            arrayCheckDetails={arrayCheckDetails}
            arrayDateDetails={arrayDateDetails}
            arrayTextAreaDetails={arrayTextAreaDetails}
            arrayImageDetails={arrayImageDetails}
            pageFormulaDetails={pageFormulaDetails}
            setPageFormulaDetails={setPageFormulaDetails}
            radioButton2={radioButton2}
            setRadioButton2={setRadioButton2}
            keyValue={keyValue}
            setKeyValue={setKeyValue}
            showCalculactionModalDetails={showCalculactionModalDetails}
            setShowCalculactionModalDetails={setShowCalculactionModalDetails}
            allInputValueForFormulaDataDetails={
              allInputValueForFormulaDataDetails
            }
            setAllInputValueForFormulaDataDetails={
              setAllInputValueForFormulaDataDetails
            }
            childModalTitle={childModalTitle}
            setChildModalTitle={setChildModalTitle}
            inputSchemaDetails={inputSchemaDetails} 
            setInputSchemaDetails={setInputSchemaDetails}
            dropSchemaDetails={dropSchemaDetails} 
            setDropSchemaDetails={setDropSchemaDetails}
            checkSchemaDetails={checkSchemaDetails} 
            setCheckSchemaDetails={setCheckSchemaDetails}
            dateSchemaDetails={dateSchemaDetails} 
            setDateSchemaDetails={setDateSchemaDetails}
            pageSchemaDetails={pageSchemaDetails}
            pageNameDetails={pageNameDetails}
            setPageNameDetails={setPageNameDetails}
            errorsPageDetails={errorsPageDetails}
            errorsInputDetails={errorsInputDetails}
            errorsDropDownDetails={errorsDropDownDetails}
            errorsDateDetails={errorsDateDetails}
            errorsCheckDetails={errorsCheckDetails}
            errorsTextareaDetails={errorsTextareaDetails}
              errorsImageDetails={errorsImageDetails}
          ></DoubleEntryChildData>
        </Grid>
      </form>
    </>
  );
};

export default DoubleEnteryData;
