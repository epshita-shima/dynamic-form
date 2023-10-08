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
import TextFields from "../FormField/ParentFormField/DynamicFieldForParentComponent/TextFields";
import Dropdown from "../FormField/ParentFormField/DynamicFieldForParentComponent/Dropdown";
import DateField from "../FormField/ParentFormField/DynamicFieldForParentComponent/DateField";
import ImageField from "../FormField/ParentFormField/DynamicFieldForParentComponent/ImageField";
import TextareaField from "../FormField/ParentFormField/DynamicFieldForParentComponent/TextareaField";
import Token from "../common/Token";
import ShowModalForTableSelectionInTheDropDown from "./../ModalStore/ParentModal/ShowModalForTableSelectionInTheDropDown";
import ShowModalForValueSelectionAfterTheTableModalSelect from "./../ModalStore/ParentModal/ShowModalForValueSelectionAfterTheTableModalSelect";
import ChildFormField from "../FormField/ChildFormField/ChildFormField";
import ShowModalForTableSelectionInTheDropDownForChild from "../ModalStore/ChildModal/ShowModalForTableSelectionInTheDropDownForChild";
import ShowModalForValueSelectionAfterTheTableModalSelectForChild from "../ModalStore/ChildModal/ShowModalForValueSelectionAfterTheTableModalSelectForChild";
import CalculationModalChild from "../ModalStore/ChildModal/CalculationModalChild";
import WarningChildModal from "../ModalStore/ChildModal/WarningChildModal";
const DoubleEnteryData = ({
  setExist,
  parentMenuName,
  childMenuName,
  pageEntry,
  setParentMenuName,
  setChildMenuName,
  setPageEntry,
  setChildTableName
}) => {
  const [inputValueParent, setInputValueParent] = useState("");
  const [inputValueDDFParent, setInputValueDDFParent] = useState("");
  const [inputValueDateParent, setInputValueDateParent] = useState("");
  const [inputValueTextAreaParent, setInputValueTextAreaParent] = useState("");
  const [inputValueImageParent, setInputValueImageParent] = useState("");
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

  const [displayParentFormulaAuto, setDisplayParentFormulaAuto] =
    useState(false);
  const [displayFormulaAutoDetails, setDisplayFormulaAutoDetails] =
    useState(false);
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
  const [currentParentDropSelected, setCurrentParentDropSelected] =
    useState("0");
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
  const [allParentTextAreaValueData, setAllParentTextAreaValueData] = useState(
    {}
  );
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
  const [
    allParentInputValueForFormulaData,
    setAllParentInputValueForFormulaData,
  ] = useState([]);
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
  const [parentFieldTargetValidation, setParentFieldTargetValidation] =
    useState(2);
  const [parentFieldFormulaValidation, setParentFieldFormulaValidation] =
    useState(2);
  const [showParentCalculactionModal, setShowParentCalculactionModal] =
    useState(false);

  const [showCalculactionModalDetails, setShowCalculactionModalDetails] =
    useState(false);
  const [allInputValueDataDetails, setAllInputValueDataDetails] = useState({});
  const [allCheckValueDataDetails, setAllCheckValueDataDetails] = useState({});
  const [allDateValueDataDetails, setAllDateValueDataDetails] = useState({});
  const [allTextAreaValueDataDetails, setAllTextAreaValueDataDetails] =
    useState({});
  const [allImageValueDataDetails, setAllImageValueDataDetails] = useState({});

  const [keyValue, setKeyValue] = useState([]);
const [foundParentKey,setFoundParentKey]=useState(0)
const [childFoundKey,setChildFoundKey]=useState(0)
  const handleParentCalculactionModalClose = () => setShowParentCalculactionModal(false);
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
  const [fieldTargetValidationDetails, setFieldTargetValidationDetails] =
    useState(2);
  const [fieldFormulaValidationDetails, setFieldFormulaValidationDetails] =
    useState(2);
  const [
    allInputValueForFormulaDataDetails,
    setAllInputValueForFormulaDataDetails,
  ] = useState([]);

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

  var tableParentInputData = [];
  var tableParentDropData = [];
  var tableParentTextareaData = [];
  var tableParentImageData = [];

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

  // const [childMenu, setChildMenu] = useChildMenu([]);
  const [dropdownName, setDropdownName] = useState([]);
  const [childMenuId, setChildMenuId] = useState("");
console.log( allInputValueData,allParentInputValueData)
console.log(showParentCalculactionModal,showCalculactionModal)

  var tableInputData = [];
  var tableDropData = [];
  var tableCheckboxData = [];
  var tableTextareaData = [];
  var tableImageData = [];

  const token = Token.token;
  const tableName = childMenuName.SubMenuName;
  let newString = tableName.replace("-", "_");
  const spaceRemove = newString.split(" ").join("");
  const tableNameLowerCase = spaceRemove.toLowerCase();

  useEffect(() => {
    setChildTableName(tableNameLowerCase)
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

  var inputLowerCaseParentData = [];
  Object.entries(allParentInputValueData).forEach((entry) => {
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowecaseInput = convertLowerCase;
    var tableCreateDataInput =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableParentInputData.push(tableCreateDataInput);
    inputLowerCaseParentData.push(lowecaseInput);
  });

  var dropLowerCaseParentData = [];
  Object.entries(allParentDropValueData).forEach((entry) => {
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowercaseDrop = convertLowerCase;
    let tableCreateDataDrop =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableParentDropData.push(tableCreateDataDrop);
    dropLowerCaseParentData.push(lowercaseDrop);
  });

  var tableParentDateData = [];
  var dateLowerCaseParentData = [];
  Object.entries(allParentDateValueData).forEach((entry) => {
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowercaseDate = convertLowerCase;
    let tableCreateDataDate =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableParentDateData.push(tableCreateDataDate);
    dateLowerCaseParentData.push(lowercaseDate);
  });

  var textareaLowerCaseParentData = [];
  Object.entries(allParentTextAreaValueData).forEach((entry) => {
    console.log(entry);
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowercaseTextarea = convertLowerCase;
    let tableCreateDataTextarea =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableParentTextareaData.push(tableCreateDataTextarea);
    textareaLowerCaseParentData.push(lowercaseTextarea);
  });

  console.log(allParentImageValueData);
  var imageLowerCaseParentData = [];
  Object.entries(allParentImageValueData).forEach((entry) => {
    const [key, value] = entry;
    let newString = value.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let lowercaseImage = convertLowerCase;
    let tableCreateDataImage =
      "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
    tableParentImageData.push(tableCreateDataImage);
    imageLowerCaseParentData.push(lowercaseImage);
  });

  var allLowercaseParentData = "";
  tableParentInputData.forEach((element) => {
    allLowercaseParentData += element;
  });
  tableParentDropData.forEach((element) => {
    allLowercaseParentData += element;
  });
  tableParentDateData.forEach((element) => {
    allLowercaseParentData += element;
  });
  tableParentTextareaData.forEach((element) => {
    allLowercaseParentData += element;
  });
  tableParentImageData.forEach((element) => {
    allLowercaseParentData += element;
  });

  // var tableCreateDataDetailsInput = [];
  // var inputDetailsLowerCaseSata = [];
  // Object.entries(allInputValueDataDetails).forEach((entry) => {
  //   const [key, value] = entry;
  //   let newString = value.replace("-", "_");
  //   const spaceRemove = newString.split(" ").join("");
  //   const convertLowerCase = spaceRemove.toLowerCase();
  //   let lowercaseInputDetails = convertLowerCase;
  //   let tableCreateInput =
  //     "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
  //   tableCreateDataDetailsInput.push(tableCreateInput);
  //   inputDetailsLowerCaseSata.push(lowercaseInputDetails);
  // });

  // var tableCreateDataDetailsDrop = [];
  // var dropDetailsLowerCaseSata = [];
  // Object.entries(allDropValueData).forEach((entry) => {
  //   const [key, value] = entry;
  //   let newString = value.replace("-", "_");
  //   const spaceRemove = newString.split(" ").join("");
  //   const convertLowerCase = spaceRemove.toLowerCase();
  //   let lowercaseDropDetails = convertLowerCase;
  //   let tableCreateDrop =
  //     "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
  //   tableCreateDataDetailsDrop.push(tableCreateDrop);
  //   dropDetailsLowerCaseSata.push(lowercaseDropDetails);
  // });

  // var tableCreateDataDetailsCheck = [];
  // var checkboxLowerCaseData = [];
  // Object.entries(allCheckValueDataDetails).forEach((entry) => {
  //   const [key, value] = entry;
  //   let newString = value.replace("-", "_");
  //   const spaceRemove = newString.split(" ").join("");
  //   const convertLowerCase = spaceRemove.toLowerCase();
  //   let lowercaseCheckbox = convertLowerCase;
  //   let tableCreateCheck =
  //     "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
  //   tableCreateDataDetailsCheck.push(tableCreateCheck);
  //   checkboxLowerCaseData.push(lowercaseCheckbox);
  // });

  // var tableCreateDataDetailsDate = [];
  // var dateDetailsLowerCaseData = [];
  // Object.entries(allDateValueDataDetails).forEach((entry) => {
  //   const [key, value] = entry;
  //   let newString = value.replace("-", "_");
  //   const spaceRemove = newString.split(" ").join("");
  //   const convertLowerCase = spaceRemove.toLowerCase();
  //   let lowercaseDateDetails = convertLowerCase;
  //   let tableCreateDate =
  //     "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
  //   tableCreateDataDetailsDate.push(tableCreateDate);
  //   dateDetailsLowerCaseData.push(lowercaseDateDetails);
  // });

  // var tableCreateDataDetailsTextArea = [];
  // var textareaDetailsLowerCaseData = [];
  // Object.entries(allTextAreaValueDataDetails).forEach((entry) => {
  //   const [key, value] = entry;
  //   let newString = value.replace("-", "_");
  //   const spaceRemove = newString.split(" ").join("");
  //   const convertLowerCase = spaceRemove.toLowerCase();
  //   let lowercaseTexareaDetails = convertLowerCase;
  //   let tableCreateTextarea =
  //     "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
  //   tableCreateDataDetailsTextArea.push(tableCreateTextarea);
  //   textareaDetailsLowerCaseData.push(lowercaseTexareaDetails);
  // });

  // var tableCreateDataDetailsImage = [];
  // var imageDetailsLowerCaseData = [];
  // Object.entries(allImageValueDataDetails).forEach((entry) => {
  //   const [key, value] = entry;
  //   let newString = value.replace("-", "_");
  //   const spaceRemove = newString.split(" ").join("");
  //   const convertLowerCase = spaceRemove.toLowerCase();
  //   let lowercaseImageDetails = convertLowerCase;
  //   let tableCreateImage =
  //     "[" + convertLowerCase + "]" + " " + "varchar(250)" + ",";
  //   tableCreateDataDetailsImage.push(tableCreateImage);
  //   imageDetailsLowerCaseData.push(lowercaseImageDetails);
  // });
  // console.log(tableCreateDataDetailsInput);
  // var allLowercaseDataDetails = "";
  // tableCreateDataDetailsInput.forEach((element) => {
  //   allLowercaseDataDetails += element;
  // });
  // tableCreateDataDetailsDrop.forEach((element) => {
  //   allLowercaseDataDetails += element;
  // });
  // tableCreateDataDetailsCheck.forEach((element) => {
  //   allLowercaseDataDetails += element;
  // });
  // tableCreateDataDetailsDate.forEach((element) => {
  //   allLowercaseDataDetails += element;
  // });
  // tableCreateDataDetailsTextArea.forEach((element) => {
  //   allLowercaseDataDetails += element;
  // });
  // tableCreateDataDetailsImage.forEach((element) => {
  //   allLowercaseDataDetails += element;
  // });
  // console.log(allLowercaseDataDetails);

  var tableInputData = [];
  var tableDropData = [];
  var tableCheckboxData = [];
  var tableTextareaData = [];
  var tableImageData = [];
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

  console.log(allParentDropValueData);
  console.log(selectedOptionParent);
  const submitForm = () => {
    console.log(pageEntry.pageEntry)
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
        if ((pageEntry.pageEntry == "singleEntryPage")) {
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
console.log(tableModelData,allInputValueData)
          var allInputValueDataLength = 0;
          if (allInputValueData != null) {
            allInputValueDataLength = Object.keys(
              allInputValueData
            ).length;
          }

          var allParentDateValueDataLength = 0;
          if (allParentDateValueData != null) {
            allParentDateValueDataLength = Object.keys(
              allParentDateValueData
            ).length;
          }

          var allParentDropValueDataLength = 0;
          if (allParentDropValueData != null) {
            allParentDropValueDataLength = Object.keys(
              allParentDropValueData
            ).length;
          }
          var allParentTextareaValueDataLength = 0;
          if (allParentTextAreaValueData != null) {
            allParentTextareaValueDataLength = Object.keys(
              allParentTextAreaValueData
            ).length;
          }
          var allParentImageValueDataLength = 0;
          if (allParentImageValueData != null) {
            allParentImageValueDataLength = Object.keys(
              allParentImageValueData
            ).length;
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
              ColumnName:
                inputLowerCaseData[allInputValueDataCount],
              ColumnNameWithSpace:
                allInputValueData[allInputValueDataCount],
              ColumnType: "textbox",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: calculationType,
              CalculationKey:
                inputLowerCaseData[allInputValueDataCount],
              CalculationFormula: JSON.stringify(pageFormula),
              RelatedTable: "",
              Position: orderPosition,
              IsDisable:
                formulaTarget ==
                allInputValueData[allInputValueDataCount]
                  ? "1"
                  : "0",
            };
            console.log(allInputValueData[allInputValueDataCount]);
            tableModelData.detailsData.push(tabledataparams);
          }

          for (
            let allParentDateValueDataCount = 0;
            allParentDateValueDataCount < allParentDateValueDataLength;
            allParentDateValueDataCount++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName: dateLowerCaseParentData[allParentDateValueDataCount],
              ColumnNameWithSpace:
                allParentDateValueData[allParentDateValueDataCount],
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
            let allParentDropValueDataCount = 0;
            allParentDropValueDataCount < allParentDropValueDataLength;
            allParentDropValueDataCount++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName: dropLowerCaseParentData[allParentDropValueDataCount],
              ColumnNameWithSpace:
                allParentDropValueData[allParentDropValueDataCount],
              ColumnType: "dropdown",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: allParentDropValueData[allParentDropValueDataCount],
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelData.detailsData.push(tabledataparams);
          }
          for (
            let allParentTextAreaValueDataCount = 0;
            allParentTextAreaValueDataCount < allParentTextareaValueDataLength;
            allParentTextAreaValueDataCount++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName:
                textareaLowerCaseParentData[allParentTextAreaValueDataCount],
              ColumnNameWithSpace:
                allParentTextAreaValueData[allParentTextAreaValueDataCount],
              ColumnType: "textarea",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable:
                allParentTextAreaValueData[allParentTextAreaValueDataCount],
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelData.detailsData.push(tabledataparams);
          }
          for (
            let allParentImageValueDataCount = 0;
            allParentImageValueDataCount < allParentImageValueDataLength;
            allParentImageValueDataCount++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName:
                imageLowerCaseParentData[allParentImageValueDataCount],
              ColumnNameWithSpace:
                allParentImageValueData[allParentImageValueDataCount],
              ColumnType: "image",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable:
                allParentImageValueData[allParentImageValueDataCount],
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelData.detailsData.push(tabledataparams);
          }
        }
        if ((pageEntry.pageEntry == "doubleEntryPage")) {
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

          var allParentInputValueDataLength = 0;
          if (allParentInputValueData != null) {
            allParentInputValueDataLength = Object.keys(
              allParentInputValueData
            ).length;
          }

          var allParentDateValueDataLength = 0;
          if (allParentDateValueData != null) {
            allParentDateValueDataLength = Object.keys(
              allParentDateValueData
            ).length;
          }

          var allParentDropValueDataLength = 0;
          if (allParentDropValueData != null) {
            allParentDropValueDataLength = Object.keys(
              allParentDropValueData
            ).length;
          }
          var allParentTextareaValueDataLength = 0;
          if (allParentTextAreaValueData != null) {
            allParentTextareaValueDataLength = Object.keys(
              allParentTextAreaValueData
            ).length;
          }
          var allParentImageValueDataLength = 0;
          if (allParentImageValueData != null) {
            allParentImageValueDataLength = Object.keys(
              allParentImageValueData
            ).length;
          }
          var orderPosition = 0;

          for (
            let allParentInputValueDataCount = 0;
            allParentInputValueDataCount < allParentInputValueDataLength;
            allParentInputValueDataCount++
          ) {
            console.log(allParentInputValueData);
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName:
                inputLowerCaseParentData[allParentInputValueDataCount],
              ColumnNameWithSpace:
                allParentInputValueData[allParentInputValueDataCount],
              ColumnType: "textbox",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: parentCalculationType,
              CalculationKey:
                inputLowerCaseParentData[allParentInputValueDataCount],
              CalculationFormula: JSON.stringify(parentPageFormula),
              RelatedTable: "",
              ColumnValueField: "",
              Position: orderPosition,
              IsDisable:
                parentFormulaTarget ==
                allParentInputValueData[allParentInputValueDataCount]
                  ? "1"
                  : "0",
            };

            tableModelData.detailsData.push(tabledataparams);
          }

          for (
            let allParentDateValueDataCount = 0;
            allParentDateValueDataCount < allParentDateValueDataLength;
            allParentDateValueDataCount++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName: dateLowerCaseParentData[allParentDateValueDataCount],
              ColumnNameWithSpace:
                allParentDateValueData[allParentDateValueDataCount],
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
            let allParentDropValueDataCount = 0;
            allParentDropValueDataCount < allParentDropValueDataLength;
            allParentDropValueDataCount++
          ) {
            console.log(allParentDropValueData[allParentDropValueDataCount]);
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName: dropLowerCaseParentData[allParentDropValueDataCount],
              ColumnNameWithSpace:
                allParentDropValueData[allParentDropValueDataCount],
              ColumnType: "dropdown",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: allParentDropValueData[allParentDropValueDataCount],
              ColumnValueField:
                parentTableRadioButton[allParentDropValueDataCount],
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelData.detailsData.push(tabledataparams);
          }
          for (
            let allParentTextAreaValueDataCount = 0;
            allParentTextAreaValueDataCount < allParentTextareaValueDataLength;
            allParentTextAreaValueDataCount++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName:
                textareaLowerCaseParentData[allParentTextAreaValueDataCount],
              ColumnNameWithSpace:
                allParentTextAreaValueData[allParentTextAreaValueDataCount],
              ColumnType: "textarea",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable:
                allParentTextAreaValueData[allParentTextAreaValueDataCount],
              ColumnValueField: "",
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelData.detailsData.push(tabledataparams);
          }
          for (
            let allParentImageValueDataCount = 0;
            allParentImageValueDataCount < allParentImageValueDataLength;
            allParentImageValueDataCount++
          ) {
            orderPosition++;
            var tabledataparams = {
              PageId: "PageID",
              MenuId: "MenuID",
              ColumnName:
                imageLowerCaseParentData[allParentImageValueDataCount],
              ColumnNameWithSpace:
                allParentImageValueData[allParentImageValueDataCount],
              ColumnType: "image",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable:
                allParentImageValueData[allParentImageValueDataCount],
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
            tableModelDataDetails.detailsData.push(tabledataparams);
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
            tableModelDataDetails.detailsData.push(tabledataparams);
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
            tableModelDataDetails.detailsData.push(tabledataparams);
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
              ColumnValueField: radioButton2[allDropValueDataCount],
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelDataDetails.detailsData.push(tabledataparams);
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
              ColumnName: textareaLowerCaseData[allTeaxtAreaValueDataCount],
              ColumnNameWithSpace:
                allTextAreaValueData[allTeaxtAreaValueDataCount],
              ColumnType: "textarea",
              ColumnDataType: "",
              SiteName: "DynamicSite",
              CalculationType: "Manual",
              CalculationKey: "",
              CalculationFormula: "",
              RelatedTable: allTextAreaValueData[allTeaxtAreaValueDataCount],
              ColumnValueField: "",
              Position: orderPosition,
              IsDisable: "0",
            };
            tableModelDataDetails.detailsData.push(tabledataparams);
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
            tableModelDataDetails.detailsData.push(tabledataparams);
          }
        }
        console.log(tableModelDataDetails);
        if (pageEntry.pageEntry == "singleEntryPage") {
          modelCreatePageDetails.procedureName = "createChildPage";
          modelCreatePageDetails.parameters = {
            childPageName: childMenuName.SubMenuName,
            childPageNameWithoutSpace: tableNameLowerCase,
            tableColumn: `ID varchar(128),${allLowercaseData} Makedate datetime,MakeBy varchar(128), InsertTime datetime`,
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
          console.log(JSON.stringify(modelCreatePageDetails));
        }

        if (pageEntry.pageEntry == "doubleEntryPage") {
          modelCreatePageSingle.procedureName = "createChildPageDouble";
          modelCreatePageSingle.parameters = {
            childPageName: childMenuName.SubMenuName,
            childPageNameWithoutSpace: tableNameLowerCase,
            tableColumn: `ID varchar(128),${allLowercaseParentData} Makedate datetime,MakeBy varchar(128), InsertTime datetime`,
            makeBy: "sunshine-01",
            parentMenu: parentMenuName.MenuName,
            menuLogo: "no logo",
            pageType: pageEntry.pageEntry,
            pageInfoJson: tableModelData.detailsData,
            pageInfoDetailsJson: tableModelDataDetails.detailsData,
            childPageNameDetailsWithoutSpace: tableNameLowerCase + "details",
            tableColumnDetails: `DetailsId varchar(128),ID varchar(128),${allLowercaseData} Makedate datetime,MakeBy varchar(128), InsertTime datetime`,
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
        // console.log(
        //   modelCreatePageDetails,
        //   JSON.stringify(modelCreatePageSingle)
        // );
      }
    }
  };

  function validationOutsideSchema() {
    var allParentInputValueDataLength = 0;
    if (allParentInputValueData != null) {
      allParentInputValueDataLength = Object.keys(
        allParentInputValueData
      ).length;
    }
    if (allParentInputValueDataLength > 0) {
      var schemaForParentInput = createDynamicSchemaForParentInput(
        allParentInputValueData
      );
      setParentInputSchema(schemaForParentInput);
      validateParentInputFields(schemaForParentInput);
    }

    var schemaForParentPage = createParentPageSchema(parentPageName);
    setParentPageSchema(schemaForParentPage);
    validateParentPageNameFields(schemaForParentPage);

    var allParentDropValueDataLength = 0;
    if (allParentDropValueData != null) {
      allParentDropValueDataLength = Object.keys(allParentDropValueData).length;
    }
    if (allParentDropValueDataLength > 0) {
      var schemaForParentDrop = createDynamicSchemaForParentDrop(
        allParentDropValueData
      );
      setParentDropSchema(schemaForParentDrop);
      validateParentDropFields(schemaForParentDrop);
    }

    var allParentDateValueDataLength = 0;
    if (allParentDateValueData != null) {
      allParentDateValueDataLength = Object.keys(allParentDateValueData).length;
    }
    if (allParentDateValueDataLength > 0) {
      var schemaForParentDate = createDynamicSchemaForParentDate(
        allParentDateValueData
      );
      setParentDateSchema(schemaForParentDate);
      validateParentDateFields(schemaForParentDate);
    }

    var allParentTestAreaValueDataLength = 0;
    if (allParentTextAreaValueData != null) {
      allParentTestAreaValueDataLength = Object.keys(
        allParentTextAreaValueData
      ).length;
    }
    if (allParentTestAreaValueDataLength > 0) {
      var schemaForParentTextArea = createDynamicSchemaForParentTextarea(
        allParentTextAreaValueData
      );
      setParentTextareaSchema(schemaForParentTextArea);
      validateParentTextAreaFields(schemaForParentTextArea);
    }
    var allParentImageValueDataLength = 0;
    if (allParentImageValueData != null) {
      allParentImageValueDataLength = Object.keys(
        allParentImageValueData
      ).length;
    }
    if (allParentImageValueDataLength > 0) {
      var schemaForParentImage = createDynamicSchemaForParentImage(
        allParentImageValueData
      );
      setParentImageSchema(schemaForParentImage);
      validateParentImageFields(schemaForParentImage);
    }
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
      allImageValueDataLength = Object.keys(allImageValueData).length;
    }
    if (allImageValueDataLength > 0) {
      var schemaForImage = createDynamicSchemaForDate(allImageValueData);
      setImageSchema(schemaForImage);
      validateImageFields(schemaForImage);
    }

    // var allInputValueDataLengthDetails = 0;
    // if (allInputValueDataDetails != null) {
    //   allInputValueDataLengthDetails = Object.keys(
    //     allInputValueDataDetails
    //   ).length;
    // }
    // if (allInputValueDataLengthDetails > 0) {
    //   var schemaForInputDetails = createDynamicSchemaDetails(
    //     allInputValueDataDetails
    //   );
    //   setInputSchemaDetails(schemaForInputDetails);
    //   validateInputFieldsDetails(schemaForInputDetails);
    // }

    // var schemaForPageDetails = createPageSchemaDetails(pageNameDetails);
    // setPageSchemaDetails(schemaForPageDetails);
    // validatePageNameFieldsDetails(schemaForPageDetails);

    // var allDropValueDataLengthDetails = 0;
    // if (allDropValueData != null) {
    //   allDropValueDataLengthDetails = Object.keys(
    //     allDropValueData
    //   ).length;
    // }
    // if (allDropValueDataLengthDetails > 0) {
    //   var schemaForDropDetails = createDynamicSchemaForDropDetails(
    //     allDropValueData
    //   );
    //   setDropSchemaDetails(schemaForDropDetails);
    //   validateDropFieldsDetails(schemaForDropDetails);
    // }
    // var allCheckValueDataLengthDetails = 0;
    // if (allCheckValueDataDetails != null) {
    //   allCheckValueDataLengthDetails = Object.keys(
    //     allCheckValueDataDetails
    //   ).length;
    // }
    // if (allCheckValueDataLengthDetails > 0) {
    //   var schemaForCheck = createDynamicSchemaForCheckDetails(
    //     allCheckValueDataDetails
    //   );
    //   setCheckSchemaDetails(schemaForCheck);
    //   validateCheckFieldsDetails(schemaForCheck);
    // }

    // var allDateValueDataLengthDetails = 0;
    // if (allDateValueDataDetails != null) {
    //   allDateValueDataLengthDetails = Object.keys(
    //     allDateValueDataDetails
    //   ).length;
    // }
    // if (allDateValueDataLengthDetails > 0) {
    //   var schemaForDateDetails = createDynamicSchemaForDateDetails(
    //     allDateValueDataDetails
    //   );
    //   setDateSchemaDetails(schemaForDateDetails);
    //   validateDateFieldsDetails(schemaForDateDetails);
    // }

    // var allTextareaValueDataLengthDetails = 0;
    // if (allTextAreaValueDataDetails != null) {
    //   allTextareaValueDataLengthDetails = Object.keys(
    //     allTextAreaValueDataDetails
    //   ).length;
    // }
    // if (allTextareaValueDataLengthDetails > 0) {
    //   var schemaForTextareaDetails = createDynamicSchemaForTextareaDetails(
    //     allTextAreaValueDataDetails
    //   );
    //   setTextareaSchemaDetails(schemaForTextareaDetails);
    //   validateTextareaFieldsDetails(schemaForTextareaDetails);
    // }
    // var allImageValueDataLengthDetails = 0;
    // if (allImageValueDataDetails != null) {
    //   allImageValueDataLengthDetails = Object.keys(
    //     allImageValueDataDetails
    //   ).length;
    // }
    // if (allImageValueDataLengthDetails > 0) {
    //   var schemaForImageDetails = createDynamicSchemaForImageDetails(
    //     allImageValueDataDetails
    //   );
    //   setImageSchemaDetails(schemaForImageDetails);
    //   validateImageFieldsDetails(schemaForImageDetails);
    // }
  }
console.log(pageEntry.pageEntry)
  const handleSubmit = (e) => {
    console.log(pageEntry.pageEntry)
    e.preventDefault();
    validationOutsideSchema();
    var foundKey = 0;
    var foundChildKey = 0;
    var foundEmpty = 0;
    var allParentInputValueDataLength = 0;
    if (inputValueParent != "") {
      allParentInputValueDataLength = inputValueParent;
    }
    var allParentDropValueDataLength = 0;
    if (inputValueDDFParent != "") {
      allParentDropValueDataLength = inputValueDDFParent;
    }
    var allParentDateValueDataLength = 0;
    if (inputValueDateParent != "") {
      allParentDateValueDataLength = inputValueDateParent;
    }

    var allParentTextareaValueDataLength = 0;
    if (inputValueTextAreaParent != "") {
      allParentTextareaValueDataLength = inputValueTextAreaParent;
    }
    var allParentImageValueDataLength = 0;
    if (inputValueImageParent != "") {
      allParentImageValueDataLength = inputValueImageParent;
    }

    // var allInputValueDataLengthDetails = 0;
    // if (inputValue != "") {
    //   allInputValueDataLengthDetails = inputValue;
    // }

    // var allCheckValueDataLengthDetails = 0;
    // if (inputValueCheckDetails != "") {
    //   allCheckValueDataLengthDetails = inputValueCheckDetails;
    // }

    // var allDateValueDataLengthDetails = 0;
    // if (inputValueDateDetails != "") {
    //   allDateValueDataLengthDetails = inputValueDateDetails;
    // }

    // var allDropValueDataLengthDetails = 0;
    // if (inputValueDDFDetails != "") {
    //   allDropValueDataLengthDetails = inputValueDDFDetails;
    // }

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
    var allTextAreaValueDataLength = 0;
    if (inputValueTextArea != "") {
      allTextAreaValueDataLength = inputValueTextArea;
    }
    var allImageValueDataLength = 0;
    if (inputValueImage != "") {
      allImageValueDataLength = inputValueImage;
    }
    var totalParentField =
      allParentInputValueDataLength +
      allParentDateValueDataLength +
      allParentDropValueDataLength +
      allParentTextareaValueDataLength +
      allParentImageValueDataLength;

    var totalField =
      allCheckValueDataLength +
      allInputValueDataLength +
      allDateValueDataLength +
      allDropValueDataLength +
      allTextAreaValueDataLength +
      allImageValueDataLength;

    // var totalFieldDetails =
    //   allCheckValueDataLengthDetails +
    //   allInputValueDataLengthDetails +
    //   allDateValueDataLengthDetails +
    //   allDropValueDataLengthDetails;

    if(pageEntry.pageEntry=="doubleEntryPage"){
      console.log(pageEntry.pageEntry)
      if (totalParentField > 12) {
        setParentErrorMessageString("There cannot be more than 12 input");
        setShowParentErrorModal(true);
      } else if (totalParentField == 0) {
        setParentErrorMessageString("There need to be more than 0 input");
        setShowParentErrorModal(true);
      } else {
        var totalValueField = 0;
        console.log(allParentDropValueData);
        var errorstatus = 0;
  
        var allParentInputValueDataLength = 0;
        if (allParentInputValueData != null) {
          allParentInputValueDataLength = Object.keys(
            allParentInputValueData
          ).length;
        }
        for (
          var allInputCount = 0;
          allInputCount < allParentInputValueDataLength;
          allInputCount++
        ) {
          if (allParentInputValueData[allInputCount] == "") {
            foundEmpty = 1;
          }
        }
  
        var allParentDropValueDataLength = 0;
        if (allParentDropValueData != null) {
          allParentDropValueDataLength = Object.keys(
            allParentDropValueData
          ).length;
        }
        for (
          var allDropCount = 0;
          allDropCount < allParentDropValueDataLength;
          allDropCount++
        ) {
          console.log(allParentDropValueData[allDropCount]);
          if (allParentDropValueData[allDropCount] == "") {
            foundEmpty = 1;
          }
        }
  
        var allParentDateValueDataLength = 0;
        if (allParentDateValueData != null) {
          allParentDateValueDataLength = Object.keys(
            allParentDateValueData
          ).length;
        }
        for (
          var allDateCount = 0;
          allDateCount < allParentDateValueDataLength;
          allDateCount++
        ) {
          if (allParentDateValueData[allDateCount] == "") {
            foundEmpty = 1;
          }
        }
  
        var allParentTextareaValueDataLength = 0;
        if (allParentTextAreaValueData != null) {
          allParentDateValueDataLength = Object.keys(
            allParentTextAreaValueData
          ).length;
        }
        for (
          var allTextareaCount = 0;
          allTextareaCount < allParentTextareaValueDataLength;
          allTextareaCount++
        ) {
          if (allParentTextAreaValueData[allTextareaCount] == "") {
            foundEmpty = 1;
          }
        }
  
        var allParentImageValueDataLength = 0;
        if (allParentImageValueData != null) {
          allParentDateValueDataLength = Object.keys(
            allParentImageValueData
          ).length;
        }
        for (
          var allImageCount = 0;
          allImageCount < allParentImageValueDataLength;
          allImageCount++
        ) {
          if (allParentImageValueData[allImageCount] == "") {
            foundEmpty = 1;
          }
        }
  
        if (foundEmpty == 1) {
        } else {
          if (inputValueParent > 2 || inputValue > 2) {
            console.log(
              keyValue,
              allParentInputValueData,
              allInputValueData,
              allParentInputValueDataLength,
              allInputValueDataLength
            );
            for (
              let countKeyValue = 0;
              countKeyValue < allParentInputValueDataLength;
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
                setFoundParentKey(foundKey)
              }
            }
  
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
                foundChildKey = 1;
              }
            }
            
  
            if (foundKey == 1 && foundChildKey == 0) {
              setShowParentCalculactionModal(true);
            } else if (foundKey == 0 && foundChildKey == 1) {
              setShowCalculactionModal(true);
            }
            else if(foundKey==1 && foundChildKey==1){
              setShowParentCalculactionModal(true);

            }
            else {
              submitForm();
            }
          } else {
            submitForm();
          }
        }
      }
    }
   if(pageEntry.pageEntry=="doubleEntryPage" || pageEntry.pageEntry=="singleEntryPage"){
    if (totalField > 12) {
      setErrorMessageString("There cannot be more than 12 input");
      setShowErrorModal(true);
    } else if (totalField == 0) {
      setErrorMessageString("There need to be more than 0 input");
      setShowErrorModal(true);
    } else {
      var totalValueField = 0;
      console.log(allParentDropValueData);
      var errorstatus = 0;
      // var allInputValueDataLengthDetails = 0;
      // if (allInputValueDataDetails != null) {
      //   allInputValueDataLengthDetails = Object.keys(
      //     allInputValueDataDetails
      //   ).length;
      // }
      // for (
      //   var allInputCountDetails = 0;
      //   allInputCountDetails < allInputValueDataLengthDetails;
      //   allInputCountDetails++
      // ) {
      //   if (allInputValueDataDetails[allInputCountDetails] == "") {
      //     foundEmpty = 1;
      //   }
      // }

      // for (
      //   var allInputCountDetails = 0;
      //   allInputCountDetails < allInputValueDataLengthDetails;
      //   allInputCountDetails++
      // ) {
      //   if (allInputValueDataDetails[allInputCountDetails] == "") {
      //     foundEmpty = 1;
      //   }
      // }

      // var allDropValueDataLengthDetails = 0;
      // if (allDropValueData != null) {
      //   allDropValueDataLengthDetails = Object.keys(
      //     allDropValueData
      //   ).length;
      // }
      // for (
      //   var allDropCountDetails = 0;
      //   allDropCountDetails < allDropValueDataLengthDetails;
      //   allDropCountDetails++
      // ) {
      //   console.log(allDropValueData[allDropCountDetails]);
      //   if (allDropValueData[allDropCountDetails] == "") {
      //     foundEmpty = 1;
      //   }
      // }

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
        var allCheckCount = 0;
        allCheckCount < allCheckValueDataLength;
        allCheckCount++
      ) {
        if (allCheckValueData[allCheckCount] == "") {
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
      var allTextareaValueDataLength = 0;
      if (allTextAreaValueData != null) {
        allTextareaValueDataLength = Object.keys(allTextAreaValueData).length;
      }
      for (
        var allTextareaCount = 0;
        allTextareaCount < allTextareaValueDataLength;
        allTextareaCount++
      ) {
        if (allTextAreaValueData[allTextareaCount] == "") {
          foundEmpty = 1;
        }
      }
      var allImageValueDataLength = 0;
      if (allImageValueData != null) {
        allImageValueDataLength = Object.keys(allImageValueData).length;
      }
      for (
        var allImageCount = 0;
        allImageCount < allImageValueDataLength;
        allImageCount++
      ) {
        if (allImageValueData[allImageCount] == "") {
          foundEmpty = 1;
        }
      }

      if (foundEmpty == 1) {
      } else {
        if (inputValue > 2) {
          console.log(
            keyValue,
            allParentInputValueData,
            allInputValueData,
            allParentInputValueDataLength,
            allParentInputValueDataLength
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
              foundChildKey = 1;
              setChildFoundKey(1)
            }
          }
          if (foundKey == 1 && foundChildKey == 0) {
            setShowParentCalculactionModal(true);
          } else if (foundKey == 0 && foundChildKey == 1) {
            setShowCalculactionModal(true);
          }
          else if(foundKey == 1 && foundChildKey == 1){
            setShowParentCalculactionModal(true);
          }
           else {
            submitForm();
          }
        } else {
          submitForm();
        }
      }
    }
   }
   
  };
  const createParentPageSchema = (fields) => {
    return Yup.string().required();
  };
  const createDynamicSchemaForParentInput = (fields) => {
    const schemaFields = {};

    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
    return Yup.object().shape(schemaFields);
  };

  const createDynamicSchemaForParentDrop = (fields) => {
    const schemaFields = {};
    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
    return Yup.object().shape(schemaFields);
  };

  const createDynamicSchemaForParentDate = (fields) => {
    const schemaFields = {};
    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
    return Yup.object().shape(schemaFields);
  };
  const createDynamicSchemaForParentTextarea = (fields) => {
    const schemaFields = {};
    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
    return Yup.object().shape(schemaFields);
  };
  const createDynamicSchemaForParentImage = (fields) => {
    const schemaFields = {};
    var countFieldLength = Object.keys(fields).length;
    for (var countField = 0; countField < countFieldLength; countField++) {
      schemaFields[countField] = Yup.string().required();
    }
    return Yup.object().shape(schemaFields);
  };

  const validateParentPageNameFields = async (schema) => {
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
  const validateParentInputFields = async (schema) => {
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

  const validateParentDropFields = async (schema) => {
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

  const validateParentDateFields = async (schema) => {
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
  const validateParentTextAreaFields = async (schema) => {
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
  const validateParentImageFields = async (schema) => {
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

  // const createPageSchemaDetails = (fields) => {
  //   return Yup.string().required();
  // };
  // const createDynamicSchemaDetails = (fields) => {
  //   const schemaFields = {};

  //   var countFieldLength = Object.keys(fields).length;
  //   for (var countField = 0; countField < countFieldLength; countField++) {
  //     schemaFields[countField] = Yup.string().required();
  //   }

  //   return Yup.object().shape(schemaFields);
  // };

  // const createDynamicSchemaForDropDetails = (fields) => {
  //   const schemaFields = {};
  //   var countFieldLength = Object.keys(fields).length;
  //   for (var countField = 0; countField < countFieldLength; countField++) {
  //     schemaFields[countField] = Yup.string().required();
  //   }
  //   return Yup.object().shape(schemaFields);
  // };

  // const createDynamicSchemaForCheckDetails = (fields) => {
  //   const schemaFields = {};
  //   var countFieldLength = Object.keys(fields).length;
  //   for (var countField = 0; countField < countFieldLength; countField++) {
  //     schemaFields[countField] = Yup.string().required();
  //   }
  //   return Yup.object().shape(schemaFields);
  // };

  // const createDynamicSchemaForDateDetails = (fields) => {
  //   const schemaFields = {};
  //   var countFieldLength = Object.keys(fields).length;
  //   for (var countField = 0; countField < countFieldLength; countField++) {
  //     schemaFields[countField] = Yup.string().required();
  //   }
  //   return Yup.object().shape(schemaFields);
  // };
  // const createDynamicSchemaForTextareaDetails = (fields) => {
  //   const schemaFields = {};
  //   var countFieldLength = Object.keys(fields).length;
  //   for (var countField = 0; countField < countFieldLength; countField++) {
  //     schemaFields[countField] = Yup.string().required();
  //   }
  //   return Yup.object().shape(schemaFields);
  // };
  // const createDynamicSchemaForImageDetails = (fields) => {
  //   const schemaFields = {};
  //   var countFieldLength = Object.keys(fields).length;
  //   for (var countField = 0; countField < countFieldLength; countField++) {
  //     schemaFields[countField] = Yup.string().required();
  //   }
  //   return Yup.object().shape(schemaFields);
  // };

  // const validatePageNameFieldsDetails = async (schema) => {
  //   try {
  //     await schema.validate(pageNameDetails, { abortEarly: false });
  //     // All fields passed validation
  //     setErrorsPageDetails([]);
  //   } catch (validationErrors) {
  //     // Some fields failed validation

  //     setErrorsPageDetails(
  //       validationErrors.inner.map((err) => ({
  //         index: 0,
  //         message: err.message,
  //       }))
  //     );
  //   }
  // };
  // const validateInputFieldsDetails = async (schema) => {
  //   try {
  //     console.log(schema);
  //     await schema.validate(allInputValueDataDetails, { abortEarly: false });

  //     // All fields passed validation
  //     setInputErrorsDetails([]);
  //   } catch (validationErrors) {
  //     // Some fields failed validation
  //     console.log(validationErrors);
  //     setInputErrorsDetails(
  //       validationErrors.inner.map((err) => ({
  //         index: err.path != "" ? parseInt(err.path) : -1,
  //         message: err.message,
  //       }))
  //     );
  //   }
  // };

  // const validateDropFieldsDetails = async (schema) => {
  //   try {
  //     console.log(allDropValueData);
  //     await schema.validate(allDropValueData, { abortEarly: false });

  //     // All fields passed validation
  //     setErrorsDropDownDetails([]);
  //   } catch (validationErrors) {
  //     console.log(validationErrors);
  //     setErrorsDropDownDetails(
  //       validationErrors.inner.map((err) => ({
  //         index: err.path != "" ? parseInt(err.path) : -1,
  //         message: err.message,
  //       }))
  //     );
  //   }
  // };

  // const validateCheckFieldsDetails = async (schema) => {
  //   try {
  //     console.log(allCheckValueDataDetails);
  //     await schema.validate(allCheckValueDataDetails, { abortEarly: false });

  //     // All fields passed validation
  //     setErrorsCheckDetails([]);
  //   } catch (validationErrors) {
  //     // Some fields failed validation
  //     console.log(validationErrors);
  //     setErrorsCheckDetails(
  //       validationErrors.inner.map((err) => ({
  //         index: err.path != "" ? parseInt(err.path) : -1,
  //         message: err.message,
  //       }))
  //     );
  //   }
  // };

  // const validateDateFieldsDetails = async (schema) => {
  //   try {
  //     await schema.validate(allDateValueDataDetails, { abortEarly: false });

  //     // All fields passed validation
  //     setErrorsDateDetails([]);
  //   } catch (validationErrors) {
  //     // Some fields failed validation
  //     setErrorsDateDetails(
  //       validationErrors.inner.map((err) => ({
  //         index: err.path != "" ? parseInt(err.path) : -1,
  //         message: err.message,
  //       }))
  //     );
  //   }
  // };
  // const validateTextareaFieldsDetails = async (schema) => {
  //   try {
  //     await schema.validate(allTextAreaValueDataDetails, { abortEarly: false });

  //     // All fields passed validation
  //     setErrorsTextareaDetails([]);
  //   } catch (validationErrors) {
  //     setErrorsTextareaDetails(
  //       validationErrors.inner.map((err) => ({
  //         index: err.path != "" ? parseInt(err.path) : -1,
  //         message: err.message,
  //       }))
  //     );
  //   }
  // };
  // const validateImageFieldsDetails = async (schema) => {
  //   try {
  //     await schema.validate(allImageValueDataDetails, { abortEarly: false });

  //     // All fields passed validation
  //     setErrorsImageDetails([]);
  //   } catch (validationErrors) {
  //     setErrorsImageDetails(
  //       validationErrors.inner.map((err) => ({
  //         index: err.path != "" ? parseInt(err.path) : -1,
  //         message: err.message,
  //       }))
  //     );
  //   }
  // };

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
                setInputValue("");
                setInputValueDDF("");
                setInputValueCheck("");
                setInputValueDate("");
                setInputValueTextArea("");
                setInputValueImage("");

                setAllParentInputValueData("");
                setAllParentDropValueData("");
                setAllParentDateValueData("");
                setAllParentTextAreaValueData("");
                setAllParentImageValueData("");
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
          { pageEntry.pageEntry=="doubleEntryPage" ?(<div class="container-fluid mt-4">
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
                      allParentInputValueForFormulaData={
                        allParentInputValueForFormulaData
                      }
                      setAllParentInputValueForFormulaData={
                        setAllParentInputValueForFormulaData
                      }
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
                      setCurrentParentDropSelected={
                        setCurrentParentDropSelected
                      }
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
                      setAllParentTextAreaValueData={
                        setAllParentTextAreaValueData
                      }
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
          </div>) : ""}

        { pageEntry.pageEntry=="singleEntryPage" || pageEntry.pageEntry=="doubleEntryPage" ? (<div className=" mt-4">
            <h2 className="fs-4 fw-bold ml-2" style={{ color: "#3AAFA9" }}>
              Child Field
            </h2>
            <div className="shadow-lg p-2 pt-4 pb-4">
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
          </div>) : '' }
          <CalculationModal
            showParentCalculactionModal={showParentCalculactionModal}
            handleParentCalculactionModalClose={
              handleParentCalculactionModalClose
            }
            foundParentKey={foundParentKey}
            childFoundKey={childFoundKey}
            setParentCalculationType={setParentCalculationType}
            setDisplayParentFormulaAuto={setDisplayParentFormulaAuto}
            displayParentFormulaAuto={displayParentFormulaAuto}
            allParentInputValueForFormulaData={
              allParentInputValueForFormulaData
            }
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
            setShowCalculactionModal={setShowCalculactionModal}
            submitForm={submitForm}
          ></CalculationModal>

          {pageEntry.pageEntry=="doubleEntryPage"?(<WarningModal
            showParentErrorModal={showParentErrorModal}
            handleParentErrorClose={handleParentErrorClose}
            parentErrorMessageString={parentErrorMessageString}
          ></WarningModal>): ( <WarningChildModal
            showErrorModal={showErrorModal}
            handleErrorClose={handleErrorClose}
            errorMessageString={errorMessageString}
          ></WarningChildModal>)}

          <ShowModalForValueSelectionAfterTheTableModalSelect
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
          ></ShowModalForValueSelectionAfterTheTableModalSelect>

          <ShowModalForTableSelectionInTheDropDown
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
          ></ShowModalForTableSelectionInTheDropDown>

          {/* <ChildCalculationModal
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
          ></ChildCalculationModal> */}

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
            allDropValueData={allDropValueData}
            setAllDropValueData={setAllDropValueData}
            allCheckValueDataDetails={allCheckValueDataDetails}
            setAllCheckValueDataDetails={setAllCheckValueDataDetails}
            allDateValueDataDetails={allDateValueDataDetails}
            setAllDateValueDataDetails={setAllDateValueDataDetails}
            allTextAreaValueDataDetails={allTextAreaValueDataDetails}
            setAllTextAreaValueDataDetails={setAllTextAreaValueDataDetails}
            allImageValueDataDetails={allImageValueDataDetails}
            setAllImageValueDataDetails={setAllImageValueDataDetails}
            inputValue={inputValue}
            setInputValue={setInputValue}
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
        </Grid>
      </form>
    </>
  );
};

export default DoubleEnteryData;
