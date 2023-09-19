import { Grid, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import "./SingleEntryForm.css";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";
import * as Yup from "yup";
import Token from "../common/Token";
import useChildMenu from "./../customHooks/useChildMenu";
import CalculationModal from "../ModalStore/ChildModal/CalculationModalChild";
import WarningModal from "../ModalStore/ChildModal/WarningModal";
import ChildFormField from "../FormField/ChildFormField/ChildFormField";
import ShowModalForTableSelectionInTheDropDownForChild from './../ModalStore/ChildModal/ShowModalForTableSelectionInTheDropDownForChild';
import ShowModalForValueSelectionAfterTheTableModalSelectForChild from "../ModalStore/ChildModal/ShowModalForValueSelectionAfterTheTableModalSelectForChild";
import CalculationModalChild from "../ModalStore/ChildModal/CalculationModalChild";

const SingleEntryForm = ({
  setExist,
  parentMenuName,
  childMenuName,
  pageEntry,
  setChildMenuName,
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
  const [textareaData, setTextareaData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [showDropDownModal, setShowDropDownModal] = useState(false);
  const [currentDropSelected, setCurrentDropSelected] = useState("0");
  var arrayInput = [];
  var arrayDropdown = [];
  var arrayCheck = [];
  var arrayDate = [];
  var arrayTextArea = [];
  var arrayImage = [];
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
  const [textareaSchema, setTextareaSchema] = useState(null);
  const [imageSchema, setImageSchema] = useState(null);
  const [pageSchema, setPageSchema] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessageString, setErrorMessageString] = useState("");
  const [radioButton, setRadioButton] = useState([]);
  const [allInputValueForFormulaData, setAllInputValueForFormulaData] =
    useState([]);
  const [showChildModal2, setShowChildModal2] = useState(false);
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
  const [childKeyValue, setChildKeyValue] = useState([]);
  const [selectedListName, setSelectedListName] = useState([]);
  const handleClose = () => setShowCalculactionModal(false);
  const handleDropClose = () => setShowDropDownModal(false);
  const handleErrorClose = () => setShowErrorModal(false);
  const [errorsPage, setErrorsPage] = useState([]);
  const [errorsInput, setInputErrors] = useState([]);
  const [errorsDropDown, setErrorsDropDown] = useState([]);
  const [errorsDate, setErrorsDate] = useState([]);
  const [errorsCheck, setErrorsCheck] = useState([]);
  const [errorsImage, setErrorsImage] = useState([]);
  const [errorsTextarea, setErrorsTextarea] = useState([]);
 
  const [childMenu, setChildMenu] = useChildMenu([]);
  const [dropdownName, setDropdownName] = useState([]);
  const [childMenuId, setChildMenuId] = useState("");

  var tableInputData = [];
  var tableDropData = [];
  var tableCheckboxData = [];
  var tableTextareaData = [];
  var tableImageData = [];

  console.log(pageEntry.pageEntry)
  const token = Token.token;
  const tableName = childMenuName.SubMenuName;
  let newString = tableName.replace("-", "_");
  const spaceRemove = newString.split(" ").join("");
  const tableNameLowerCase = spaceRemove.toLowerCase();
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

  var checkboxLowerCaseData = [];
  Object.entries(allCheckValueData).forEach((entry) => {
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowercaseCheckbox = convertLowerCase;
    let tableCreateDataDrop =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableCheckboxData.push(tableCreateDataDrop);
    checkboxLowerCaseData.push(lowercaseCheckbox);
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
      setCheckboxData(arrayCheck);
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
            ColumnName: inputLowerCaseData[allInputValueDataCount],
            ColumnNameWithSpace: allInputValueData[allInputValueDataCount],
            ColumnType: "textbox",
            ColumnDataType: "",
            SiteName: "DynamicSite",
            CalculationType: calculationType,
            CalculationKey: allInputValueData[allInputValueDataCount],
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
          let allCheckValueDataCount = 0;
          allCheckValueDataCount < allCheckValueDataLength;
          allCheckValueDataCount++
        ) {
          orderPosition++;
          var tabledataparams = {
            PageId: "PageID",
            MenuId: "MenuID",
            ColumnName: checkboxLowerCaseData[allCheckValueDataCount],
            ColumnNameWithSpace: allCheckValueData[allCheckValueDataCount],
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
            ColumnValueField: radioButton[allDropValueDataCount],
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

        modelCreatePage.procedureName = "createChildPage";
        modelCreatePage.parameters = {
          childPageName: childMenuName.SubMenuName,
          childPageNameWithoutSpace: tableNameLowerCase,
          tableColumn: `ID varchar(128),${allLowercaseData} Makedate datetime,MakeBy varchar(128), inserttime datetime`,
          makeBy: "sunshine-01",
          parentMenu: parentMenuName.MenuName,
          menuLogo: "no logo",
          pageType: pageEntry.pageEntry,
          pageInfoJson: tableModelData.detailsData,
        };
        // const fatchGetDataById = async () => {
        //   const response = await fetch(
        //     "https://localhost:44372/api/GetData/GetDataById",
        //     {
        //       method: "POST",
        //       headers: {
        //         authorization: `Bearer ${token}`,
        //         "content-type": "application/json",
        //       },
        //       body: JSON.stringify(modelCreatePage),
        //     }
        //   );
        //   const data = await response.json();
        //   if (data.status == true) {
        //     swal({
        //       title: "Create page successfully",
        //       icon: "success",
        //       button: "OK",
        //     });
        //   }
        // };

        // fatchGetDataById();
      }
    }
  };

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
          setChildKeyValue(allKeyData.Tables1);
        } else {
          console.log(data);
        }
      });
  }, []);

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
    var allTextAreaValueDataLength = 0;
    if (allTextAreaValueData != null) {
      allDateValueDataLength = Object.keys(allTextAreaValueData).length;
    }
    if (allTextAreaValueDataLength > 0) {
      var schemaForTextArea = createDynamicSchemaForDate(allTextAreaValueData);
      setTextareaSchema(schemaForTextArea);
      validateTextareaFields(schemaForTextArea);
    }
    var allImageValueDataLength = 0;
    if (allImageValueData != null) {
      allImageValueDataLength = Object.keys(allImageValueData ).length;
    }
    if ( allImageValueDataLength > 0) {
      var schemaForImage = createDynamicSchemaForDate(allImageValueData );
      setImageSchema(schemaForImage);
      validateImageFields(schemaForImage);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(allInputValueData)
    validationOutsideSchema();
    var foundKey = 0;
    var foundEmpty = 0;
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

    if (totalField > 12) {
      setErrorMessageString("There cannot be more than 12 input");
      setShowErrorModal(true);
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
              childKeyValue.some(
                (item) =>
                  item.childKeyValue.toLowerCase() ===
                  allInputValueData[countKeyValue].toLowerCase()
              )
            ) {
              foundKey = 1;
            }
          }
          console.log(foundKey,allInputValueData,childKeyValue)
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
    return Yup.object().shape(schemaFields);
  };

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
      await schema.validate(allInputValueData, { abortEarly: false });

      // All fields passed validation
      setInputErrors([]);
    } catch (validationErrors) {
      // Some fields failed validation
      setInputErrors(
        validationErrors.inner.map((err) => {
          return {
            index: err.path != "" ? parseInt(err.path) : -1,
            message: err.message,
          };
        })
      );
    }
  };

  const validateDropFields = async (schema) => {
    try {
      await schema.validate(allDropValueData, { abortEarly: false });

      // All fields passed validation
      setErrorsDropDown([]);
    } catch (validationErrors) {
      setErrorsDropDown(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
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
      setErrorsCheck(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
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
      setErrorsDate(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };
  const validateTextareaFields = async (schema) => {
    try {
      await schema.validate(allTextAreaValueData, { abortEarly: false });

      // All fields passed validation
      setErrorsTextarea([]);
    } catch (validationErrors) {
      // Some fields failed validation
      setErrorsTextarea(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };
  const validateImageFields = async (schema) => {
    try {
      await schema.validate(allImageValueData, { abortEarly: false });

      // All fields passed validation
      setErrorsImage([]);
    } catch (validationErrors) {
      // Some fields failed validation
      setErrorsImage(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
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
            onClick={() => {
              setChildMenuName({ SubMenuName: "" });
              setInputValue("");
              setInputValueDDF("");
              setInputValueCheck("");
              setInputValueDate("");
              setInputValueTextArea("");
              setInputValueImage("");
              setAllInputValueData("");
              setAllDropValueData("");
              setAllCheckValueData("");
              setAllDateValueData("");
              setAllTextAreaValueData("");
              setAllImageValueData("");
            }}
          >
            Clear
          </button>
        </Grid>
        <div class="container-fluid mt-4">
          <h2 className="fs-4 fw-bold" style={{ color: "#3AAFA9" }}>
            Child Field
          </h2>
          
          <ChildFormField
          inputValue={inputValue}
          setAllInputValueData={setAllInputValueData}
          setInputValue={setInputValue}
          inputValueDDF={inputValueDDF}
          setAllDropValueData={setAllDropValueData}
          setInputValueDDF={setInputValueDDF}
          inputValueCheck={inputValueCheck}
          setAllCheckValueData={setAllCheckValueData}
          setInputValueCheck={setInputValueCheck}
          inputValueDate={inputValueDate}
          setAllDateValueData={setAllDateValueData}
          setInputValueDate={setInputValueDate}
          inputValueTextArea={inputValueTextArea}
          setAllTextAreaValueData={setAllTextAreaValueData}
          setInputValueTextArea={setInputValueTextArea}
          inputValueImage={inputValueImage}
          setAllImageValueData={setAllImageValueData}
          setInputValueImage={setInputValueImage}
          inputData={inputData}
          allInputValueData={allInputValueData}
          allInputValueForFormulaData={allInputValueForFormulaData}
          setAllInputValueForFormulaData={setAllInputValueForFormulaData}
          errorsInput={errorsInput}
          dropdownData={dropdownData}
          selectedOption={selectedOption}
          errorsDropDown={errorsDropDown}
          setModalSpecificData={setModalSpecificData}
          setCurrentDropSelected={setCurrentDropSelected}
          setShowDropDownModal={setShowDropDownModal}
          checkboxData={checkboxData}
          allCheckValueData={allCheckValueData}
          setAllData={setAllData}
          allData={allData}
          errorsCheck={errorsCheck}
          dateData={dateData}
          allDateValueData={allDateValueData}
          errorsDate={errorsDate}
          textareaData={textareaData}
          allTextAreaValueData={allTextAreaValueData}
          errorsTextarea={errorsTextarea}
          imageData={imageData}
          allImageValueData={allImageValueData}
          errorsImage={errorsImage}
          ></ChildFormField>
          
        </div>

        <CalculationModalChild
          showCalculactionModal={showCalculactionModal}
          handleClose={handleClose}
          setCalculationType={setCalculationType}
          setDisplayFormulaAuto={setDisplayFormulaAuto}
          displayFormulaAuto={displayFormulaAuto}
          allInputValueForFormulaData={allInputValueForFormulaData}
          pageFormula={pageFormula}
          setField1Validation={setField1Validation}
          field1Validation={field1Validation}
          setFieldFormulaValidation={setFieldFormulaValidation}
          fieldFormulaValidation={fieldFormulaValidation}
          setField2Validation={setField2Validation}
          field2Validation={field2Validation}
          setFieldTargetValidation={setFieldTargetValidation}
          setFormulaTarget={setFormulaTarget}
          fieldTargetValidation={fieldTargetValidation}
          submitForm={submitForm}
        ></CalculationModalChild>

        <ShowModalForTableSelectionInTheDropDownForChild
          showDropDownModal={showDropDownModal}
          handleDropClose={handleDropClose}
          modalSpecificData={modalSpecificData}
          setChildMenuId={setChildMenuId}
          currentDropSelected={currentDropSelected}
          setShowChildModal2={setShowChildModal2}
          setSelectedListName={setSelectedListName}
          setAllModelDataTable={setAllModelDataTable}
          setAllDropValueData={setAllDropValueData}
          allDropValueData={allDropValueData}
          childMenuId={childMenuId}
          setDropdownName={setDropdownName}
          setShowDropDownModal={setShowDropDownModal}
        ></ShowModalForTableSelectionInTheDropDownForChild>

        <ShowModalForValueSelectionAfterTheTableModalSelectForChild
          showChildModal2={showChildModal2}
          setShowChildModal2={setShowChildModal2}
          selectedListName={selectedListName}
          handleErrorClose={handleErrorClose}
          dropdownName={dropdownName}
          currentDropSelected={currentDropSelected}
          setRadioButton={setRadioButton}
          radioButton={radioButton}
          allModelDataTable={allModelDataTable}
          allDropValueData={allDropValueData}
          setSelectedOption={setSelectedOption}
        ></ShowModalForValueSelectionAfterTheTableModalSelectForChild>

        <WarningModal
          showErrorModal={showErrorModal}
          handleErrorClose={handleErrorClose}
          errorMessageString={errorMessageString}
        ></WarningModal>
      </Grid>
    </form>
  );
};

export default SingleEntryForm;
