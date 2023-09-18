import { Grid, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "../SingleEntryForm/SingleEntryForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";
import * as Yup from "yup";
import useChildMenu from "./../customHooks/useChildMenu";
import DoubleEntryChildData from "./DoubleEntryChildData";
import CalculationModal from "../ModalStore/ParentModal/CalculationModal";
import WarningModal from "../ModalStore/ParentModal/WarningModal";
import ChildCalculationModal from "../ModalStore/ParentModal/ChildCalculationModal";
import TextFieldParent from "./../FormField/ParentFormField/TextFieldParent";
import DropDownParent from "./../FormField/ParentFormField/DropDownParent";
import DateFieldParent from "./../FormField/ParentFormField/DateFieldParent";
import TextareaParentField from "./../FormField/ParentFormField/TextareaParentField";
import ImageParentField from "./../FormField/ParentFormField/ImageParentField";
import Show_Modal_For_Table_Selection_In_The_DropDown from "../ModalStore/ParentModal/Show_Modal_For_Table_Selection_In_The_DropDown";
import Show_Modal_For_Value_Selection_After_The_Table_Modal_Select from "../ModalStore/ParentModal/Show_Modal_For_Value_Selection_After_The_Table_Modal_Select";
import TextFields from "../FormField/ParentFormField/DynamicFieldForParentComponent/TextFields";
import Dropdown from "../FormField/ParentFormField/DynamicFieldForParentComponent/Dropdown";
import DateField from "../FormField/ParentFormField/DynamicFieldForParentComponent/DateField";
import ImageField from "../FormField/ParentFormField/DynamicFieldForParentComponent/ImageField";
import TextareaField from "../FormField/ParentFormField/DynamicFieldForParentComponent/TextareaField";
import Token from "../common/Token";
import ChildFormField from "../FormField/ChildFormField/ChildFormField";



const DoubleEnteryData = ({
  setExist,
  parentMenuName,
  childMenuName,
  pageEntry,
  setParentMenuName,
  setChildMenuName,
  setPageEntry,
}) => {
  const [inputValueParent, setInputValueParent] = useState("");
  const [inputValueDDFParent, setInputValueDDFParent] = useState("");
  const [inputValueDateParent, setInputValueDateParent] = useState("");
  const [inputValueTextAreaParent, setInputValueTextAreaParent] = useState("");
  const [inputValueImageParent, setInputValueImageParent] = useState("");
  const [inputValueDetails, setInputValueDetails] = useState("");
  const [inputValueDDFDetails, setInputValueDDFDetails] = useState("");
  const [inputValueCheckDetails, setInputValueCheckDetails] = useState("");
  const [inputValueDateDetails, setInputValueDateDetails] = useState("");
  const [inputValueTextAreaDetails, setInputValueTextAreaDetails] =
    useState("");
  const [inputValueImageDetails, setInputValueImageDetails] = useState("");
  const previousParentInputValue = useRef("");
  const previousParentInputValueDDF = useRef("");
  const previousParentInputValueDate = useRef("");
  const previousParentInputValueTextArea = useRef("");
  const previousParentInputValueImage = useRef("");

  const previousInputValueDetails = useRef("");
  const previousInputValueDDFDetails = useRef("");
  const previousInputValueCheckDetails = useRef("");
  const previousInputValueDateDetails = useRef("");
  const previousInputValueTextAreaDetails = useRef("");
  const previousInputValueImageDetails = useRef("");

  const [displayParentFormulaAuto, setDisplayParentFormulaAuto] = useState(false);
  const [displayFormulaAutoDetails, setDisplayFormulaAutoDetails] =useState(false);
  const [parentCalculationType, setParentCalculationType] = useState("Manual");
  const [parentFormulaTarget, setParentFormulaTarget] = useState("");
  const [calculationTypeDetails, setCalculationTypeDetails] =
    useState("Manual");
  const [formulaTargetDetails, setFormulaTargetDetails] = useState("");

  const [parentInputData, setParentInputData] = useState([]);
  const [parentDropdownData, setParentDropdownData] = useState([]);
  const [parentDateData, setParentDateData] = useState([]);
  const [parentTextareaData, setParentTextareaData] = useState([]);
  const [parentImageData, setParentImageData] = useState([]);

  const [inputDataDetails, setInputDataDetails] = useState([]);
  const [dropdownDataDetails, setDropdownDataDetails] = useState([]);
  const [checkboxDataDetails, setCheckboxDataDetails] = useState([]);
  const [dateDataDetails, setDateDataDetails] = useState([]);
  const [textareaDataDetails, setTextareaDataDetails] = useState([]);
  const [imageDataDetails, setImageDataDetails] = useState([]);
  const [showParentDropDownModal, setShowParentDropDownModal] = useState(false);
  const [currentParentDropSelected, setCurrentParentDropSelected] = useState("0");
  const [showDropDownModalDetails, setShowDropDownModalDetails] =
    useState(false);
  const [currentDropSelectedDetails, setCurrentDropSelectedDetails] =
    useState("0");

  var arrayParentInput = [];
  var arrayParentDropdown = [];
  var arrayParentDate = [];
  var arrayParentTextArea = [];
  var arrayParentImage = [];

  var arrayInputDetails = [];
  var arrayDropdownDetails = [];
  var arrayCheckDetails = [];
  var arrayDateDetails = [];
  var arrayTextAreaDetails = [];
  var arrayImageDetails = [];
  
  const [allParentInputValueData, setAllParentInputValueData] = useState({});
  const [allParentDropValueData, setAllParentDropValueData] = useState({});
  const [allParentDateValueData, setAllParentDateValueData] = useState({});
  const [allParentTextAreaValueData, setAllParentTextAreaValueData] = useState({});
  const [allParentImageValueData, setAllParentImageValueData] = useState({});
  const [parentInputSchema, setParentInputSchema] = useState(null);
  const [parentDropSchema, setParentDropSchema] = useState(null);
  const [parentDateSchema, setParentDateSchema] = useState(null);
  const [parentImageSchema, setParentImageSchema] = useState(null);
  const [parentTextareaSchema, setParentTextareaSchema] = useState(null);
  const [parentPageSchema, setParentPageSchema] = useState(null);

  const [showParentErrorModal, setShowParentErrorModal] = useState(false);
  const [showErrorModalDetails, setShowErrorModalDetails] = useState(false);
  const [parentErrorMessageString, setParentErrorMessageString] = useState("");
  const [allParentInputValueForFormulaData, setAllParentInputValueForFormulaData] =useState([]);
  const [parentPageFormula, setParentPageFormula] = useState([
    { Formula: [{ Field1: "", FormulaType: "", Field2: "" }], Target: {} },
  ]);
  const [pageFormulaDetails, setPageFormulaDetails] = useState([
    { Formula: [{ Field1: "", FormulaType: "", Field2: "" }], Target: {} },
  ]);
  const [allParentData, setParentAllData] = useState([]);
  const [selectedOptionParent, setSelectedOptionParent] = useState([]);
  const [parentModalSpecificData, setParentModalSpecificData] = useState([]);
  const [parentAllModelDataTable, setParentAllModelDataTable] = useState([]);
  const [parentPageName, setParentPageName] = useState("");
  const [parentField1Validation, setParentField1Validation] = useState(2);
  const [parentField2Validation, setParentField2Validation] = useState(2);
  const [parentFieldTargetValidation, setParentFieldTargetValidation] = useState(2);
  const [parentFieldFormulaValidation, setParentFieldFormulaValidation] = useState(2);
  const [showParentCalculactionModal, setShowParentCalculactionModal] = useState(false);

  const [showCalculactionModalDetails, setShowCalculactionModalDetails] = useState(false);
  const [allInputValueDataDetails, setAllInputValueDataDetails] = useState({});
  const [allDropValueDataDetails, setAllDropValueDataDetails] = useState({});
  const [allCheckValueDataDetails, setAllCheckValueDataDetails] = useState({});
  const [allDateValueDataDetails, setAllDateValueDataDetails] = useState({});
  const [allTextAreaValueDataDetails, setAllTextAreaValueDataDetails] =
    useState({});
  const [allImageValueDataDetails, setAllImageValueDataDetails] = useState({});

  const [keyValue, setKeyValue] = useState([]);

  const handleParentCalculactionModalClose = () => setShowParentCalculactionModal(false);
  const handleCloseDetails = () => setShowCalculactionModalDetails(false);
  const handleParentModalDropClose = () => setShowParentDropDownModal(false);
  const handleParentErrorClose = () => setShowParentErrorModal(false);
  const [parentErrorsPage, setParentErrorsPage] = useState([]);
  const [parentErrorsInput, setParentInputErrors] = useState([]);
  const [parentErrorsDropDown, setParentErrorsDropDown] = useState([]);
  const [parentErrorsDate, setParentErrorsDate] = useState([]);
  const [parentErrorsTextArea, setParentErrorsTextArea] = useState([]);
  const [parentErrorsImage, setParentErrorsImage] = useState([]);
  const [childMenu, setChildMenu] = useChildMenu([]);

  const [parentTableRadioButton, setParentTableRadioButton] = useState([]);
  const [parentTableValue, setParentTableValue] = useState([]);
 
  const [show2, setShow2] = useState(false);
  const [parentModalTitle, setParentModalTitle] = useState("");

  const [radioButton2, setRadioButton2] = useState([]);
  const [field1ValidationDetails, setField1ValidationDetails] = useState(2);
  const [field2ValidationDetails, setField2ValidationDetails] = useState(2);
  const [fieldTargetValidationDetails, setFieldTargetValidationDetails] =useState(2);
  const [fieldFormulaValidationDetails, setFieldFormulaValidationDetails] =useState(2);
  const [allInputValueForFormulaDataDetails, setAllInputValueForFormulaDataDetails] = useState([]);

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

  const token = Token.token;
  const tableName = childMenuName.SubMenuName;
  let newString = tableName.replace("-", "_");
  const spaceRemove = newString.split(" ").join("");
  const tableNameLowerCase = spaceRemove.toLowerCase();

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
  Object.entries(allParentInputValueData).forEach((entry) => {
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
  Object.entries(allParentDropValueData).forEach((entry) => {
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
  Object.entries(allParentDateValueData).forEach((entry) => {
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
  Object.entries(allParentTextAreaValueData).forEach((entry) => {
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
  Object.entries(allParentImageValueData).forEach((entry) => {
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
          setParentAllModelDataTable(allModalData);
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
    for (let i = 0; i < inputValueParent; i++) {
      arrayParentInput.push([i]);
    }
    for (let i = 0; i < inputValueDDFParent; i++) {
      arrayParentDropdown.push([i]);
    }
    for (let i = 0; i < inputValueDateParent; i++) {
      arrayParentDate.push([i]);
    }
    for (let i = 0; i < inputValueTextAreaParent; i++) {
      arrayParentTextArea.push(i);
    }
    for (let i = 0; i < inputValueImageParent; i++) {
      arrayParentImage.push(i);
    }

    useEffect(() => {
      setParentInputData(arrayParentInput);
      setParentDropdownData(arrayParentDropdown);
      setParentDateData(arrayParentDate);
      setParentTextareaData(arrayParentTextArea);
      setParentImageData(arrayParentImage);
    }, [
      inputValueParent,
      inputValueDDFParent,
      inputValueDateParent,
      inputValueTextAreaParent,
      inputValueImageParent,
    ]);
  }

  useEffect(() => {
    previousParentInputValue.current = inputValueParent;
    previousParentInputValueDDF.current = inputValueDDFParent;
    previousParentInputValueDate.current = inputValueDateParent;
    previousParentInputValueTextArea.current = inputValueTextAreaParent;
    previousParentInputValueImage.current = inputValueImageParent;
  }, [
    inputValueParent,
    inputValueDDFParent,
    inputValueDateParent,
    inputValueTextAreaParent,
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
          if (allParentInputValueData != null) {
            allInputValueDataLength = Object.keys(allParentInputValueData).length;
          }

          var allDateValueDataLength = 0;
          if (allParentDateValueData != null) {
            allDateValueDataLength = Object.keys(allParentDateValueData).length;
          }

          var allDropValueDataLength = 0;
          if (allParentDropValueData != null) {
            allDropValueDataLength = Object.keys(allParentDropValueData).length;
          }
          var allTextareaValueDataLength = 0;
          if (allParentTextAreaValueData != null) {
            allTextareaValueDataLength =
              Object.keys(allParentTextAreaValueData).length;
          }
          var allImageValueDataLength = 0;
          if (allParentImageValueData != null) {
            allImageValueDataLength = Object.keys(allParentImageValueData).length;
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
              ColumnNameWithSpace: allParentInputValueData[allInputValueDataCount],
              ColumnType: "textbox",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: parentCalculationType,
              CalculationKey: inputLowerCaseData[allInputValueDataCount],
              CalculationFormula: JSON.stringify(parentPageFormula),
              RelatedTable: "",
              Position: orderPosition,
              IsDisable:
                parentFormulaTarget == allParentInputValueData[allInputValueDataCount]
                  ? "1"
                  : "0",
            };
            console.log(allParentInputValueData[allInputValueDataCount]);
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
              ColumnNameWithSpace: allParentDateValueData[allDateValueDataCount],
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
              ColumnNameWithSpace: allParentDropValueData[allDropValueDataCount],
              ColumnType: "dropdown",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: allParentDropValueData[allDropValueDataCount],
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
                allParentTextAreaValueData[allTextAreaValueDataCount],
              ColumnType: "textarea",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: allParentTextAreaValueData[allTextAreaValueDataCount],
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
              ColumnNameWithSpace: allParentImageValueData[allImageValueDataCount],
              ColumnType: "image",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: allParentImageValueData[allImageValueDataCount],
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
          if (allParentInputValueData != null) {
            allInputValueDataLength = Object.keys(allParentInputValueData).length;
          }

          var allDateValueDataLength = 0;
          if (allParentDateValueData != null) {
            allDateValueDataLength = Object.keys(allParentDateValueData).length;
          }

          var allDropValueDataLength = 0;
          if (allParentDropValueData != null) {
            allDropValueDataLength = Object.keys(allParentDropValueData).length;
          }
          var allTextareaValueDataLength = 0;
          if (allParentTextAreaValueData != null) {
            allTextareaValueDataLength =
              Object.keys(allParentTextAreaValueData).length;
          }
          var allImageValueDataLength = 0;
          if (allParentImageValueData != null) {
            allImageValueDataLength = Object.keys(allParentImageValueData).length;
          }
          var orderPosition = 0;

          for (
            let allInputValueDataCount = 0;
            allInputValueDataCount < allInputValueDataLength;
            allInputValueDataCount++
          ) {
            console.log(allParentInputValueData);
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName: inputLowerCaseData[allInputValueDataCount],
              ColumnNameWithSpace: allParentInputValueData[allInputValueDataCount],
              ColumnType: "textbox",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: parentCalculationType,
              CalculationKey: inputLowerCaseData[allInputValueDataCount],
              CalculationFormula: JSON.stringify(parentPageFormula),
              RelatedTable: "",
              ColumnValueField: "",
              Position: orderPosition,
              IsDisable:
                parentFormulaTarget == allParentInputValueData[allInputValueDataCount]
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
              ColumnNameWithSpace: allParentDateValueData[allDateValueDataCount],
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
            console.log(allParentDropValueData[allDropValueDataCount]);
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName: dropLowerCaseData[allDropValueDataCount],
              ColumnNameWithSpace: allParentDropValueData[allDropValueDataCount],
              ColumnType: "dropdown",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: allParentDropValueData[allDropValueDataCount],
              ColumnValueField: parentTableRadioButton[allDropValueDataCount],
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
                allParentTextAreaValueData[allTextAreaValueDataCount],
              ColumnType: "textarea",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: allParentTextAreaValueData[allTextAreaValueDataCount],
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
              ColumnNameWithSpace: allParentImageValueData[allImageValueDataCount],
              ColumnType: "image",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: allParentImageValueData[allImageValueDataCount],
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
          // const fatchGetDataById = async () => {
          //   const response = await fetch(
          //     "https://localhost:44372/api/GetData/GetDataById",
          //     {
          //       method: "POST",
          //       headers: {
          //         authorization: `Bearer ${token}`,
          //         "content-type": "application/json",
          //       },
          //       body: JSON.stringify(modelCreatePageDetails),
          //     }
          //   );
          //   const data = await response.json();
          //   console.log(JSON.stringify(data));
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
          // const fatchGetDataById = async () => {
          //   const response = await fetch(
          //     "https://localhost:44372/api/GetData/GetDataById",
          //     {
          //       method: "POST",
          //       headers: {
          //         authorization: `Bearer ${token}`,
          //         "content-type": "application/json",
          //       },
          //       body: JSON.stringify(modelCreatePageSingle),
          //     }
          //   );
          //   const data = await response.json();
          //   console.log(JSON.stringify(data));
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
        console.log(
          modelCreatePageDetails,
          JSON.stringify(modelCreatePageSingle)
        );
      }
    }
  };

  function validationOutsideSchema() {
    var allInputValueDataLength = 0;
    if (allParentInputValueData != null) {
      allInputValueDataLength = Object.keys(allParentInputValueData).length;
    }
    if (allInputValueDataLength > 0) {
      var schemaForInput = createDynamicSchema(allParentInputValueData);
      setParentInputSchema(schemaForInput);
      validateInputFields(schemaForInput);
    }

    var schemaForPage = createPageSchema(parentPageName);
    setParentPageSchema(schemaForPage);
    validatePageNameFields(schemaForPage);

    var allDropValueDataLength = 0;
    if (allParentDropValueData != null) {
      allDropValueDataLength = Object.keys(allParentDropValueData).length;
    }
    if (allDropValueDataLength > 0) {
      var schemaForDrop = createDynamicSchemaForDrop(allParentDropValueData);
      console.log(schemaForDrop);
      setParentDropSchema(schemaForDrop);
      validateDropFields(schemaForDrop);
    }

    var allDateValueDataLength = 0;
    if (allParentDateValueData != null) {
      allDateValueDataLength = Object.keys(allParentDateValueData).length;
    }
    if (allDateValueDataLength > 0) {
      var schemaForDate = createDynamicSchemaForDate(allParentDateValueData);
      setParentDateSchema(schemaForDate);
      validateDateFields(schemaForDate);
    }
    var allTestAreaValueDataLength = 0;
    if (allParentTextAreaValueData != null) {
      allTestAreaValueDataLength = Object.keys(allParentTextAreaValueData).length;
    }
    if (allTestAreaValueDataLength > 0) {
      var schemaForTextArea =
        createDynamicSchemaForTextarea(allParentTextAreaValueData);
      setParentTextareaSchema(schemaForTextArea);
      validateTextAreaFields(schemaForTextArea);
    }
    var allImageValueDataLength = 0;
    if (allParentImageValueData != null) {
      allImageValueDataLength = Object.keys(allParentImageValueData).length;
    }
    if (allImageValueDataLength > 0) {
      var schemaForImage = createDynamicSchemaForImage(allParentImageValueData);
      setParentImageSchema(schemaForImage);
      validateDateImageFields(schemaForImage);
    }

    var allInputValueDataLengthDetails = 0;
    if (allInputValueDataDetails != null) {
      allInputValueDataLengthDetails = Object.keys(
        allInputValueDataDetails
      ).length;
    }
    if (allInputValueDataLengthDetails > 0) {
      var schemaForInputDetails = createDynamicSchemaDetails(
        allInputValueDataDetails
      );
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
      var schemaForDropDetails = createDynamicSchemaForDropDetails(
        allDropValueDataDetails
      );
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
      var schemaForDateDetails = createDynamicSchemaForDateDetails(
        allDateValueDataDetails
      );
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
      var schemaForTextareaDetails = createDynamicSchemaForTextareaDetails(
        allTextAreaValueDataDetails
      );
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
      var schemaForImageDetails = createDynamicSchemaForImageDetails(
        allImageValueDataDetails
      );
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
    if (inputValueParent != "") {
      allInputValueDataLength = inputValueParent;
    }
    var allInputValueDataLengthDetails = 0;
    if (inputValueDetails != "") {
      allInputValueDataLengthDetails = inputValueDetails;
    }

    var allCheckValueDataLengthDetails = 0;
    if (inputValueCheckDetails != "") {
      allCheckValueDataLengthDetails = inputValueCheckDetails;
    }

    var allDateValueDataLength = 0;
    if (inputValueDateParent != "") {
      allDateValueDataLength = inputValueDateParent;
    }
    var allDateValueDataLengthDetails = 0;
    if (inputValueDateDetails != "") {
      allDateValueDataLengthDetails = inputValueDateDetails;
    }

    var allDropValueDataLength = 0;
    if (inputValueDDFParent != "") {
      allDropValueDataLength = inputValueDDFParent;
    }
    var allDropValueDataLengthDetails = 0;
    if (inputValueDDFDetails != "") {
      allDropValueDataLengthDetails = inputValueDDFDetails;
    }
    var totalField =
      allInputValueDataLength +
      allDateValueDataLength +
      allDropValueDataLength;

    var totalFieldDetails =
      allCheckValueDataLengthDetails +
      allInputValueDataLengthDetails +
      allDateValueDataLengthDetails +
      allDropValueDataLengthDetails;

    if (totalField > 12) {
      setParentErrorMessageString("There cannot be more than 12 input");
      setShowParentErrorModal(true);
    } else if (totalField == 0) {
      setParentErrorMessageString("There need to be more than 0 input");
      setShowParentErrorModal(true);
    } else {
      var totalValueField = 0;
      console.log(allParentDropValueData);
      var errorstatus = 0;
      var allInputValueDataLength = 0;
      if (allParentInputValueData != null) {
        allInputValueDataLength = Object.keys(allParentInputValueData).length;
      }
      for (
        var allInputCount = 0;
        allInputCount < allInputValueDataLength;
        allInputCount++
      ) {
        if (allParentInputValueData[allInputCount] == "") {
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
        if (allParentInputValueData[allInputCount] == "") {
          foundEmpty = 1;
        }
      }

      var allDropValueDataLength = 0;
      if (allParentDropValueData != null) {
        allDropValueDataLength = Object.keys(allParentDropValueData).length;
      }
      for (
        var allDropCount = 0;
        allDropCount < allDropValueDataLength;
        allDropCount++
      ) {
        console.log(allParentDropValueData[allDropCount]);
        if (allParentDropValueData[allDropCount] == "") {
          foundEmpty = 1;
        }
      }

      var allDateValueDataLength = 0;
      if (allParentDateValueData != null) {
        allDateValueDataLength = Object.keys(allParentDateValueData).length;
      }
      for (
        var allDateCount = 0;
        allDateCount < allDateValueDataLength;
        allDateCount++
      ) {
        if (allParentDateValueData[allDateCount] == "") {
          foundEmpty = 1;
        }
      }
      if (foundEmpty == 1) {
      } else {
        if (inputValueParent > 2 || inputValueDetails > 2) {
          console.log(
            keyValue,
            allParentInputValueData,
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
                  allParentInputValueData[countKeyValue].toLowerCase()
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
            setShowParentCalculactionModal(true);
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
      setParentErrorMessageString("There cannot be more than 12 input");
      setShowErrorModalDetails(true);
    } else if (totalFieldDetails == 0) {
      setParentErrorMessageString("There need to be more than 0 input");
      setShowErrorModalDetails(true);
    } else {
      var totalValueField = 0;
      console.log(allParentDropValueData);
      var errorstatus = 0;
      var allInputValueDataLengthDEtails = 0;
      if (allInputValueDataDetails != null) {
        allInputValueDataLengthDetails = Object.keys(
          allInputValueDataDetails
        ).length;
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
        allDropValueDataLengthDetails = Object.keys(
          allDropValueDataDetails
        ).length;
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
        allDateValueDataLengthDetails = Object.keys(
          allDateValueDataDetails
        ).length;
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
        if (inputValueDetails > 2) {
          console.log(
            keyValue,
            allParentInputValueData,
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
            setShowParentCalculactionModal(true);
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

  const validatePageNameFields = async (schema) => {
    try {
      await schema.validate(parentPageName, { abortEarly: false });

      // All fields passed validation
      setParentErrorsPage([]);
    } catch (validationErrors) {
      // Some fields failed validation

      setParentErrorsPage(
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
      await schema.validate(allParentInputValueData, { abortEarly: false });

      // All fields passed validation
      setParentInputErrors([]);
    } catch (validationErrors) {
      // Some fields failed validation
      console.log(validationErrors);
      setParentInputErrors(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };

  const validateDropFields = async (schema) => {
    try {
      await schema.validate(allParentDropValueData, { abortEarly: false });

      // All fields passed validation
      setParentErrorsDropDown([]);
    } catch (validationErrors) {
      console.log(validationErrors);
      setParentErrorsDropDown(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };

  const validateDateFields = async (schema) => {
    console.log(allParentDateValueData);
    try {
      await schema.validate(allParentDateValueData, { abortEarly: false });

      // All fields passed validation
      setParentErrorsDate([]);
    } catch (validationErrors) {
      // Some fields failed validation
      console.log(validationErrors);
      setParentErrorsDate(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };
  const validateTextAreaFields = async (schema) => {
    console.log(allParentTextAreaValueData);
    try {
      await schema.validate(allParentTextAreaValueData, { abortEarly: false });

      // All fields passed validation
      setParentErrorsTextArea([]);
    } catch (validationErrors) {
      // Some fields failed validation
      console.log(validationErrors);
      setParentErrorsTextArea(
        validationErrors.inner.map((err) => ({
          index: err.path != "" ? parseInt(err.path) : -1,
          message: err.message,
        }))
      );
    }
  };
  const validateDateImageFields = async (schema) => {
    console.log(allParentImageValueData);
    try {
      await schema.validate(allParentImageValueData, { abortEarly: false });

      // All fields passed validation
      setParentErrorsImage([]);
    } catch (validationErrors) {
      // Some fields failed validation
      console.log(validationErrors);
      setParentErrorsImage(
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
        class="bg-white shadow-lg p-3 mt-4"
        onSubmit={handleSubmit}
      >
        <Grid>
          <Grid className="p-3">
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
                setInputValueParent("");
                setInputValueDDFParent("");
                setInputValueDateParent("");
                setInputValueTextAreaParent("");
                setInputValueImageParent("");
                setInputValueDetails("");
                setInputValueDDFDetails("");
                setInputValueCheckDetails("");
                setInputValueDateDetails("");
                setInputValueTextAreaDetails("");
                setInputValueImageDetails("");

                setAllParentInputValueData("");
                setAllParentDropValueData("");
                setAllParentDateValueData("");
                setAllParentTextAreaValueData("");
                setAllParentImageValueData("");
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
                <TextFieldParent
                  inputValueParent={inputValueParent}
                  setInputValueParent={setInputValueParent}
                  setAllParentInputValueData={setAllParentInputValueData}
                  allParentInputValueData={allParentInputValueData}
                ></TextFieldParent>
              </div>
              <div class="col">
                <DropDownParent
                  inputValueDDFParent={inputValueDDFParent}
                  setAllParentDropValueData={setAllParentDropValueData}
                  setInputValueDDFParent={setInputValueDDFParent}
                ></DropDownParent>
              </div>
              <div class="col">
                <DateFieldParent
                  inputValueDateParent={inputValueDateParent}
                  setAllParentDateValueData={setAllParentDateValueData}
                  setInputValueDateParent={setInputValueDateParent}
                ></DateFieldParent>
              </div>
              <div class="col">
                <TextareaParentField
                  inputValueTextAreaParent={inputValueTextAreaParent}
                  setAllParentTextAreaValueData={setAllParentTextAreaValueData}
                  setInputValueTextAreaParent={setInputValueTextAreaParent}
                ></TextareaParentField>
              </div>
              <div class="col">
                <ImageParentField
                  inputValueImageParent={inputValueImageParent}
                  setAllParentImageValueData={setAllParentImageValueData}
                  setInputValueImageParent={setInputValueImageParent}
                ></ImageParentField>
              </div>
              <div class="w-100"></div>
              <div class="col">
                {parentInputData?.map((item, name) => {
                  return (
                   <TextFields
                   name={name}
                   allParentInputValueData={allParentInputValueData}
                   setAllParentInputValueData={setAllParentInputValueData}
                   allParentInputValueForFormulaData={allParentInputValueForFormulaData}
                   setAllParentInputValueForFormulaData={setAllParentInputValueForFormulaData}
                   parentErrorsInput={parentErrorsInput}
                   ></TextFields>
                  );
                })}
              </div>
              <div class="col">
                {parentDropdownData.map((item, name) => {
                  return (
                    <Dropdown
                    name={name}
                    selectedOptionParent={selectedOptionParent}
                    parentErrorsDropDown={parentErrorsDropDown}
                    setParentModalSpecificData={setParentModalSpecificData}
                    setCurrentParentDropSelected={setCurrentParentDropSelected}
                    setShowParentDropDownModal={setShowParentDropDownModal}
                    ></Dropdown>
                  );
                })}
              </div>

              <div class="col">
                {parentDateData.map((item, name) => {
                  return (
                    <DateField
                    name={name}
                    allParentDateValueData={allParentDateValueData}
                    setParentAllData={setParentAllData}
                    allParentData={allParentData}
                    setAllParentDateValueData={setAllParentDateValueData}
                    parentErrorsDate={parentErrorsDate}
                  ></DateField>
                  );
                })}
              </div>
              <div class="col">
                {parentTextareaData.map((item, name) => {
                  return (
                    <TextareaField
                    name={name}
                    allParentTextAreaValueData={allParentTextAreaValueData}
                    setParentAllData={setParentAllData}
                    allParentData={allParentData}
                    setAllParentTextAreaValueData={setAllParentTextAreaValueData}
                    parentErrorsTextArea={parentErrorsTextArea}
                    ></TextareaField>
                  );
                })}
              </div>
              <div class="col">
                {parentImageData.map((item, name) => {
                  return (
                    <ImageField
                    name={name}
                    allParentImageValueData={allParentImageValueData}
                    setParentAllData={setParentAllData}
                    allParentData={allParentData}
                    setAllParentImageValueData={setAllParentImageValueData}
                    parentErrorsImage={parentErrorsImage}
                    ></ImageField>
                  );
                })}
              </div>
            </div>
          </div>

          <CalculationModal
            showParentCalculactionModal={showParentCalculactionModal}
            handleParentCalculactionModalClose={handleParentCalculactionModalClose}
            setParentCalculationType={setParentCalculationType}
            setDisplayParentFormulaAuto={setDisplayParentFormulaAuto}
            displayParentFormulaAuto={displayParentFormulaAuto}
            allParentInputValueForFormulaData={allParentInputValueForFormulaData}
            parentPageFormula={parentPageFormula}
            setParentField1Validation={setParentField1Validation}
            parentField1Validation={parentField1Validation}
            setParentFieldFormulaValidation={setParentFieldFormulaValidation}
            parentFieldFormulaValidation={parentFieldFormulaValidation}
            setParentField2Validation={setParentField2Validation}
            parentField2Validation={parentField2Validation}
            setParentFieldTargetValidation={setParentFieldTargetValidation}
            setParentFormulaTarget={setParentFormulaTarget}
            parentFieldTargetValidation={parentFieldTargetValidation}
            submitForm={submitForm}
          ></CalculationModal>

          <WarningModal
            showParentErrorModal={showParentErrorModal}
            handleParentErrorClose={handleParentErrorClose}
            parentErrorMessageString={parentErrorMessageString}
          ></WarningModal>

          <Show_Modal_For_Value_Selection_After_The_Table_Modal_Select
            show2={show2}
            setShow2={setShow2}
            parentModalTitle={parentModalTitle}
            parentTableValue={parentTableValue}
            setParentTableRadioButton={setParentTableRadioButton}
            parentTableRadioButton={parentTableRadioButton}
            parentAllModelDataTable={parentAllModelDataTable}
            allParentDropValueData={allParentDropValueData}
            currentParentDropSelected={currentParentDropSelected}
            setSelectedOptionParent={setSelectedOptionParent}
          ></Show_Modal_For_Value_Selection_After_The_Table_Modal_Select>

          <Show_Modal_For_Table_Selection_In_The_DropDown
            showParentDropDownModal={showParentDropDownModal}
            handleParentModalDropClose={handleParentModalDropClose}
            parentModalSpecificData={parentModalSpecificData}
            setShow2={setShow2}
            currentParentDropSelected={currentParentDropSelected}
            setParentModalTitle={setParentModalTitle}
            setParentAllModelDataTable={setParentAllModelDataTable}
            setAllParentDropValueData={setAllParentDropValueData}
            allParentDropValueData={allParentDropValueData}
            setParentTableValue={setParentTableValue}
            setShowParentDropDownModal={setShowParentDropDownModal}
          ></Show_Modal_For_Table_Selection_In_The_DropDown>

          <ChildCalculationModal
            showCalculactionModalDetails={showCalculactionModalDetails}
            handleCloseDetails={handleCloseDetails}
            setCalculationTypeDetails={setCalculationTypeDetails}
            setDisplayFormulaAutoDetails={setDisplayFormulaAutoDetails}
            displayFormulaAutoDetails={displayFormulaAutoDetails}
            allInputValueForFormulaDataDetails={
              allInputValueForFormulaDataDetails
            }
            pageFormulaDetails={pageFormulaDetails}
            setField1ValidationDetails={setField1ValidationDetails}
            field1ValidationDetails={field1ValidationDetails}
            setFieldFormulaValidationDetails={setFieldFormulaValidationDetails}
            fieldFormulaValidationDetails={fieldFormulaValidationDetails}
            setField2ValidationDetails={setField2ValidationDetails}
            field2ValidationDetails={field2ValidationDetails}
            setFieldTargetValidationDetails={setFieldTargetValidationDetails}
            setFormulaTargetDetails={setFormulaTargetDetails}
            fieldTargetValidationDetails={fieldTargetValidationDetails}
            submitForm={submitForm}
          ></ChildCalculationModal>

          {/* <DoubleEntryChildData
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
          ></DoubleEntryChildData> */}
          
        </Grid>
      </form>
    </>
  );
};

export default DoubleEnteryData;
