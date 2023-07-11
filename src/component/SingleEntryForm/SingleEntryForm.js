import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Formik, FieldArray } from "formik";
import Swal from "sweetalert2";
import Select from "react-select";
import "./SingleEntryForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";

import { json, useNavigate } from "react-router-dom";


const SingleEntryForm = ({ opens, setOpens, setOpen }) => {
  const [array, setArray] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [inputValue, setInputValue] = useState("");
  const [inputValueDDF, setInputValueDDF] = useState("");
  const [inputValueCheck, setInputValueCheck] = useState("");
  const [inputValueDate, setInputValueDate] = useState("");
  const [count, setCount] = useState(0);
  const previousInputValue = useRef("");
  const previousInputValueDDF = useRef("");
  const previousInputValueCheck = useRef("");
  const previousInputValueDate = useRef("");
  const [displayFormulaAuto, setDisplayFormulaAuto] = useState(false);
  const [calculationType, setCalculationType] = useState("Manual");
  const [formulaTarget, setFormulaTarget] = useState("");
  const [testArray, setTestArray] = useState([]);
  const [replacetempArray, setreplacetempArray] = useState([]);
  const replaceArray = [];
  const [inputData, setInputData] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const [checkboxData, setCheckboxData] = useState([]);
  const [dateData, setDateData] = useState([]);
  var arrayInput = [];
  var arrayDropdown = [];
  var arrayCheck = [];
  var arrayDate = [];
  const [allInputValueData, setAllInputValueData] = useState(null);
  const [allDropValueData, setAllDropValueData] = useState(null);
  const [allCheckValueData, setAllCheckValueData] = useState(null);
  const [allDateValueData, setAllDateValueData] = useState(null);

  const [allInputValueForFormulaData, setAllInputValueForFormulaData] =
    useState([]);

  const [pageFormula, setPageFormula] = useState([
    { Formula: [{ Field1: "", FormulaType: "", Field2: "" }], Target: {} },
  ]);

  const [allData, setAllData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [inputTestData, setInputTestData] = useState({});
  const [labelData, setLabelData] = useState([]);
  const [columnValues, setColumnValues] = useState([]);
  const [labelDataCopy, setLabelDataCopy] = useState([]);
  const [getDate, setGetDate] = useState([]);
  const [twoDimensionData, setTwoDimentionData] = useState([[]]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [modalSpecificData, setModalSpecificData] = useState([]);
  const [allModelDataTable, setAllModelDataTable] = useState([]);
  const [pageName, setPageName] = useState([]);

  const [pageNameStatus, setPageNameStatus] = useState(2);
  const [field1Validation, setField1Validation] = useState(2);
  const [field2Validation, setField2Validation] = useState(2);
  const [fieldTargetValidation, setFieldTargetValidation] = useState(2);
  const [fieldFormulaValidation, setFieldFormulaValidation] = useState(2);
const [openModal,setOpenModal]=useState(true)
const [showCalculactionModal,setShowCalculactionModal]=useState(false)
const [keyValue,setKeyValue]=useState([{
  key:'qty',
  type:'calcField'
},{
  key:'rate',
  type:'calcField'
},{
  key:'amount',
  type:'targetField'
}]);


  const [labelPosition, setLabelPosition] = useState([]);
  const [selectedListName, setSelectedListName] = useState([]);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

const navigate=useNavigate()
  const modelData = {
    procedureName: "prc_GetPageInfo",
    parameters: {
      MenuId: "1",
    },
  };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN1bnNoaW5lLmNvbSIsIlVzZXJJZCI6IjJhNzJlNDA2LTE1YTktNGJiNS05ODNiLWE0NGNiMGJkNzMyMyIsIlVzZXJOYW1lIjoic3Vuc2hpbmUtMDEiLCJqdGkiOiI5NzliYWMxMC05NDljLTQyZWQtOWY3MC1iMTE1NDVmN2NlYWIiLCJuYmYiOjE2ODg5NjA4NTYsImV4cCI6MTY4OTAwNDA1NiwiaXNzIjoic2h1dmEuY29tIiwiYXVkIjoic2h1dmEuY29tIn0.uy3pxgL-G2Pbm2KM9_dm00l6y-Spy61P2TzrxBlbvc0";


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



  function submitForm(){
    const modelDataLabel = {
      procedureName: "",
      parameters: {},
    };
    modelDataLabel.procedureName = "InsertDynamicMenuTable";
    modelDataLabel.parameters = {
      DBName: "DynamicDemo",
      TableName: "tblMenu",
      ColumnData: "MenuName, SubMenuName, UiLink, isActive, ysnParent, OrderBy, MakeDate, MenuLogo, TableName",
      ValueData: "'Master Entry','"+pageName+"','/"+pageName.replace(' ','-')+"','1','0','12',getdate(),'','"+pageName.replace(/ /g, '')+"'"
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
          var menuId = tableData[0]?.Column1
        
        var tableModelData = {
          "tableNameMaster": "",
          "tableNameChild": null,
          "columnNamePrimary": null,
          "columnNameForign": null,
          "serialType": null,
          "columnNameSerialNo": null,
          "isFlag": null,
          "data": "",
          "detailsData": [],
          "whereParams": null
        }
        tableModelData.detailsData = [];
        tableModelData.tableNameChild = "PageInfo";
    
        var allInputValueDataLength = 0;
        if(allInputValueData!=null){
          allInputValueDataLength =  Object.keys(allInputValueData).length
        }
    
        
        var allCheckValueDataLength = 0;
        if(allCheckValueData!=null){
          allCheckValueDataLength =  Object.keys(allCheckValueData).length
        }
        
        var allDateValueDataLength = 0;
        if(allDateValueData!=null){
          allDateValueDataLength =  Object.keys(allDateValueData).length
        }
    
        var allDropValueDataLength = 0;
        if(allDropValueData!=null){
          allDropValueDataLength =  Object.keys(allDropValueData).length
        }
        var orderPosition = 0;
    
        for(let allInputValueDataCount = 0; allInputValueDataCount <allInputValueDataLength ; allInputValueDataCount++) {
          orderPosition++;
            var tabledataparams = {
              PageId: 'newid()',
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
              IsDisable: formulaTarget==allInputValueData[allInputValueDataCount]?"1":"0",
              
            };
            tableModelData.detailsData.push(tabledataparams);
        }
    
        for(let allCheckValueDataCount = 0; allCheckValueDataCount < allCheckValueDataLength; allCheckValueDataCount++) {
          orderPosition++;
          var tabledataparams = {
            PageId: 'newid()',
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
    
      for(let allDateValueDataCount = 0; allDateValueDataCount < allDateValueDataLength; allDateValueDataCount++) {
        orderPosition++;
        var tabledataparams = {
          PageId: 'newid()',
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
    
    for(let allDropValueDataCount = 0; allDropValueDataCount < allDropValueDataLength; allDropValueDataCount++) {
      orderPosition++;
      var tabledataparams = {
        PageId: 'newid()',
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
    
        console.log(allCheckValueData,allDropValueData,allDateValueData,allData);
        fetch("https://localhost:44372/api/DoubleMasterEntry/InsertListData", {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(tableModelData),
        })
    
          .then((res) => res.json())
          .then((data) => {
            if (data.status == true) {
              
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
    console.log(i);
    var radioName = document.querySelector(
      'input[name="dropValueField"]:checked'
    ).value;
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





  // const addList = () => {
  //   const testArr = [];
  //   let randnum = randomNumberInRange(1, 100);
  //   let countOfInput = 0;
  //   let number = inputValue;
  //   let numberDDf = inputValueDDF;
  //   let numberCheck = inputValueCheck;
  //   let numberDate = parseInt(inputValueDate);
  //   if (inputValueDate == "") {
  //     numberDate = 0;
  //   }
  //   if (numberCheck == "") {
  //     numberCheck = 0;
  //   }
  //   if (numberDDf == "") {
  //     numberDDf = 0;
  //   }
  //   if (number == "") {
  //     number = 0;
  //   }

  //   let countLebel = number + numberDDf + numberCheck + numberDate;
  //   var getInputValue = document.getElementsByClassName("getInputValue");

  //   var arr = [...getInputValue];
  //   arr.forEach((element) => {
  //     allData.push(element.value);
  //   });

  //   function test(e) {
  //     var placeholderdata = document.getElementById(e);
  //     var placeData = placeholderdata?.value;

  //     return `${
  //       placeData == "" || placeData == undefined
  //         ? "Enter Text"
  //         : `${placeData}`
  //     }`;
  //   }

  //   if (array.length == 0) {
  //     for (let i = 0; i < countLebel; i++) {
  //       var a = (
  //         <th scope="col" class={`dropTh${i} border`} draggable="true">
  //           <div className="d-flex justify-content-between align-items-center">
  //             <TextField
  //               id={`box${i}`}
  //               name="L"
  //               label={`${allData[i]}`}
  //               variant="standard"
  //               disabled
  //               InputLabelProps={{
  //                 className: "textField_label",
  //               }}
  //               className={`box${i}`}
  //               style={{ marginLeft: "15px" }}
  //               onChange={(e) => {
  //                 handleGroupInput(e, i);
  //               }}
  //             />

  //             <FontAwesomeIcon
  //               icon={faArrowsRotate}
  //               data-toggle="modal"
  //               data-target={`#exampleModal${i}`}
  //             ></FontAwesomeIcon>
  //             <div
  //               class="modal fade"
  //               id={`exampleModal${i}`}
  //               tabindex="-1"
  //               role="dialog"
  //               aria-labelledby={`exampleModal${i}Label`}
  //               // aria-hidden="true"
  //             >
  //               <div class="modal-dialog" role="document">
  //                 <div class="modal-content">
  //                   <div class="modal-header">
  //                     <h5 class="modal-title" id={`exampleModal${i}Label`}>
  //                       What you like to replace this field with?
  //                     </h5>
  //                     <button type="button" data-dismiss="modal">
  //                       <span
  //                       //  aria-hidden="true"
  //                       >
  //                         &times;
  //                       </span>
  //                     </button>
  //                   </div>
  //                   <div class="modal-body">
  //                     <div class="input-group">
  //                       <div class="input-group-prepend">
  //                         <div class="input-group-text">
  //                           <input
  //                             type="radio"
  //                             value="input"
  //                             name="replaceField"
  //                             aria-label="Radio button for following text input"
  //                           />
  //                         </div>
  //                       </div>
  //                       <input
  //                         id="inputField"
  //                         type="text"
  //                         class="form-control"
  //                         aria-label="Text input with radio button"
  //                       />
  //                     </div>
  //                     <div class="input-group  mt-2">
  //                       <div class="input-group-prepend">
  //                         <div class="input-group-text">
  //                           <input
  //                             type="radio"
  //                             name="replaceField"
  //                             value="dropdown"
  //                             aria-label="Default select example"
  //                           />
  //                         </div>
  //                       </div>
  //                       <div className="w-75">
  //                         <div draggable="false">
  //                           <Select
  //                             id={`select${countOfInput}`}
  //                             class="form-select"
  //                             className="w-[100%]"
  //                             aria-label="Default select example"
  //                             placeholder={test(`box${countOfInput}`)}
  //                             required
  //                             name={`box${countOfInput}`}
  //                           ></Select>
  //                         </div>
  //                         <div
  //                           class="droptarget border"
  //                           style={{ display: "none" }}
  //                           draggable="false"
  //                         >
  //                           Drop
  //                         </div>
  //                       </div>
  //                     </div>
  //                     <div class="input-group mt-2">
  //                       <div class="input-group-prepend">
  //                         <div class="input-group-text">
  //                           <input
  //                             type="radio"
  //                             value="checkbox"
  //                             name="replaceField"
  //                             aria-label="Radio button for following text input"
  //                           />
  //                         </div>
  //                       </div>
  //                       <FormGroup>
  //                         <FormControlLabel
  //                           id="checkboxField"
  //                           name={`item.${i}.check`}
  //                           style={{ marginTop: "3px" }}
  //                           control={<Checkbox defaultChecked />}
  //                           label="Label"
  //                         />
  //                       </FormGroup>
  //                     </div>
  //                     <div class="input-group mt-2">
  //                       <div class="input-group-prepend">
  //                         <div class="input-group-text">
  //                           <input
  //                             type="radio"
  //                             value="date"
  //                             name="replaceField"
  //                             aria-label="Radio button for following text input"
  //                           />
  //                         </div>
  //                       </div>
  //                       <TextField
  //                         id="date"
  //                         type="date"
  //                         defaultValue={startDate}
  //                         size="small"
  //                       />
  //                     </div>
  //                   </div>
  //                   <div class="modal-footer">
  //                     <button
  //                       type="button"
  //                       class="btn btn-primary close"
  //                       data-dismiss="modal"
  //                       aria-label="Close"
  //                       onClick={(e) => {
  //                         replaceFieldColumn(e, i, randnum);
  //                       }}
  //                     >
  //                       Save changes
  //                     </button>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           <div
  //             class="droptargettd border"
  //             style={{ display: "none" }}
  //             draggable="false"
  //           >
  //             Drop
  //           </div>
  //         </th>
  //       );
  //       testArray.push(a);
  //     }
  //   }

  //   if (array.length < 1) {
  //     for (let i = 0; i < number; i++) {
  //       testArr.push([
  //         <td
  //           class={`dropTh${countOfInput} border`}
  //           draggable="false"
  //           id={`item${randnum}${countOfInput}${i}`}
  //         >
  //           <div
  //             draggable="false"
  //             className="d-flex justify-content-between align-items-center"
  //           >
  //             {replaceFunction("input", countOfInput)}
  //             <input
  //               type="text"
  //               draggable="false"
  //               id={`${array.length}`}
  //               // id={`${allInputValueData[countOfInput]}`}
  //               size="small"
  //               selectedIndex={`${array.length}`}
  //               style={{ marginTop: "3px" }}
  //               placeholder={`${allInputValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
  //               className="getValue form-control"
  //               data-animal-type={`box${countOfInput}`}
  //               name={`box${countOfInput}`}
  //               onChange={(e) => {
  //                 const { name, value, placeholder } = e.target;
  //                 if (isNaN(placeholder)) {
  //                   inputTestData[placeholder] = value;
  //                   setInputTestData({ ...inputTestData });
  //                 }
  //                 singleData[e.target.id] = inputTestData;
  //                 // singleData.push(inputTestData)
  //                 // if(singleData.length==''){
  //                 // }
  //                 // else{
  //                 //   console.log(countOfInput)
  //                 //   singleData[countOfInput] = inputTestData;
  //                 // }
  //                 // setInputTestData({
  //                 //   ...inputTestData,
  //                 //   [name]: e.target.value,
  //                 // });
  //                 // setFieldValue(`${allInputValueData[countOfInput]}`,e.target.value)
  //                 for (let i = 0; i < array.length; i++) {
  //                   // handleInputValue(e, i);
  //                   // showDetails(e)
  //                 }
  //               }}
  //             />
  //           </div>
  //           <div
  //             class="droptarget1 border"
  //             style={{ display: "none" }}
  //             draggable="false"
  //           >
  //             Drop
  //           </div>
  //         </td>,
  //       ]);
  //       countOfInput = countOfInput + 1;
  //     }
  //     for (var i = 0; i < numberDDf; i++) {
  //       testArr.push([
  //         <td
  //           class={`dropTh${countOfInput} border`}
  //           draggable="false" //change dragable true to work again
  //           id={`item${randnum}${countOfInput}${i}`}
  //         >
  //           <div draggable="false">
  //             {replaceFunction("dropdown", i)}
  //             <Select
  //               id={array.length}
  //               class="form-select"
  //               className="w-[100%] getValue"
  //               aria-label="Default select example"
  //               placeholder={`${allDropValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
  //               required
  //               name={`box${countOfInput}`}
  //               options={dropData}
  //               // value={dropData.find((x) => x.value == category.groupId)}
  //               onChange={(e, event, id) => {
  //                 // const optionElementId = optionsElement.getAttribute('id');
  //                 const { name, value, placeholder } = e;
  //                 console.log(e, event);
  //                 if (isNaN(placeholder)) {
  //                   inputTestData[placeholder] = value;
  //                   setInputTestData({ ...inputTestData });
  //                 }
  //                 singleData[e.id] = inputTestData;
  //                 console.log(e.value);
  //                 // category.groupId = e.value;
  //               }}
  //             ></Select>
  //           </div>
  //           <div
  //             class="droptarget1 border" // remove 1 for dragable work
  //             style={{ display: "none" }}
  //             draggable="false"
  //           >
  //             Drop
  //           </div>
  //         </td>,
  //       ]);
  //       countOfInput = countOfInput + 1;
  //     }
  //     for (var i = 0; i < numberCheck; i++) {
  //       testArr.push([
  //         <td
  //           class={`dropTh${countOfInput} border`}
  //           draggable="false" //change dragable true to work again
  //           id={`item${randnum}${countOfInput}${i}`}
  //         >
  //           <div draggable="false">
  //             {replaceFunction("checkbox", i)}
  //             <FormGroup>
  //               <FormControlLabel
  //                 name={`box${countOfInput}`}
  //                 id={`check${countOfInput}`}
  //                 style={{ marginTop: "3px" }}
  //                 control={<Checkbox />}
  //                 label="Label"
  //                 onChange={(e) => {
  //                   // const {value,name}=e.checked
  //                   const { value, checked } = e.target;
  //                   console.log(checked);
  //                 }}
  //               />
  //             </FormGroup>
  //           </div>
  //           <div
  //             class="droptarget1 border" // remove 1 for dragable work
  //             style={{ display: "none" }}
  //             draggable="false"
  //           >
  //             Drop
  //           </div>
  //         </td>,
  //       ]);
  //       countOfInput = countOfInput + 1;
  //     }
  //     for (var i = 0; i < numberDate; i++) {
  //       testArr.push([
  //         <td
  //           class={`dropTh${countOfInput} border`}
  //           draggable="false" //change dragable true to work again
  //           id={`item${randnum}${countOfInput}${i}`}
  //         >
  //           <div draggable="false">
  //             {replaceFunction("date", i)}
  //             <TextField
  //               name={`box${countOfInput}`}
  //               id={`date${countOfInput}`}
  //               type="date"
  //               className="getValue"
  //               defaultValue={startDate}
  //               size="small"
  //             />
  //           </div>
  //           <div
  //             class="droptarget1 border" // remove 1 for dragable work
  //             style={{ display: "none" }}
  //             draggable="false"
  //           >
  //             Drop
  //           </div>
  //         </td>,
  //       ]);
  //       countOfInput = countOfInput + 1;
  //     }
  //   } else {
  //     for (
  //       var countreplaceTemp = 0;
  //       countreplaceTemp < replacetempArray.length;
  //       countreplaceTemp++
  //     ) {
  //       if (replacetempArray[countreplaceTemp] == "input") {
  //         console.log(countreplaceTemp);
  //         testArr.push([
  //           <td
  //             class={`dropTh${countOfInput} border`}
  //             draggable="false" //change dragable true to work again
  //             id={`item${randnum}${countOfInput}${countreplaceTemp}`}
  //           >
  //             <div
  //               draggable="false"
  //               className="d-flex justify-content-between align-items-center"
  //             >
  //               <input
  //                 type="text"
  //                 draggable="false"
  //                 id={`${array.length}`}
  //                 // id={`${allInputValueData[countOfInput]}`}
  //                 size="small"
  //                 style={{ marginTop: "3px" }}
  //                 placeholder={`${allInputValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
  //                 className="form-control getValue"
  //                 // value={`${allInputValueData[countOfInput]}`}
  //                 name={`box${countOfInput}`}
  //                 data-animal-type={`box${countOfInput}`}
  //                 onChange={(e) => {
  //                   const { name, value, placeholder } = e.target;
  //                   if (isNaN(placeholder)) {
  //                     inputTestData[placeholder] = value;
  //                     setInputTestData({ ...inputTestData });
  //                   }
  //                   singleData[e.target.id] = inputTestData;
  //                 }}
  //               />
  //             </div>
  //             <div
  //               class="droptarge1t border" // remove 1 for dragable work
  //               style={{ display: "none" }}
  //               draggable="false"
  //             >
  //               Drop
  //             </div>
  //           </td>,
  //         ]);
  //         countOfInput = countOfInput + 1;
  //         setCount(count + 1);
  //       } else if (replacetempArray[countreplaceTemp] == "dropdown") {
  //         testArr.push([
  //           <td
  //             class={`dropTh${countOfInput} border`}
  //             draggable="false" //change dragable true to work again
  //             // id={`item${randnum}${countOfInput}${countreplaceTemp}`}
  //             id={array.length}
  //           >
  //             <div draggable="false">
  //               <Select
  //                 id={`select${countOfInput}`}
  //                 class="form-select"
  //                 className="w-[100%] getValue"
  //                 aria-label="Default select example"
  //                 // placeholder={test(`box${countOfInput}`)}
  //                 placeholder={`${allDropValueData[countOfInput]}`}
  //                 required
  //                 name={`box${countOfInput}`}
  //                 options={dropData}
  //                 // value={dropData.find((x) => x.value == category.groupId)}
  //                 onChange={(e) => {
  //                   const { name, value, placeholder } = e;
  //                   console.log(e);
  //                   if (isNaN(placeholder)) {
  //                     inputTestData[placeholder] = value;
  //                     setInputTestData({ ...inputTestData });
  //                   }
  //                   singleData[e.id] = inputTestData;
  //                   console.log(e.value);
  //                   // category.groupId = e.value;
  //                 }}
  //               ></Select>
  //             </div>
  //             <div
  //               class="droptarget1 border" // remove 1 for dragable work
  //               style={{ display: "none" }}
  //               draggable="false"
  //             >
  //               Drop
  //             </div>
  //           </td>,
  //         ]);
  //         countOfInput = countOfInput + 1;
  //       } else if (replacetempArray[countreplaceTemp] == "checkbox") {
  //         testArr.push([
  //           <td
  //             class={`dropTh${countOfInput} border`}
  //             draggable="false" //change dragable true to work again
  //             id={`item${randnum}${countOfInput}${countreplaceTemp}`}
  //           >
  //             <div draggable="false">
  //               <FormGroup>
  //                 <FormControlLabel
  //                   name={`box${countOfInput}`}
  //                   id={`check${countOfInput}`}
  //                   style={{ marginTop: "3px" }}
  //                   control={<Checkbox />}
  //                   label="Label"
  //                   onChange={(e) => {
  //                     const { value, checked } = e.target;
  //                     console.log(checked);
  //                     // const {value,name}=e.target
  //                   }}
  //                 />
  //               </FormGroup>
  //             </div>
  //             <div
  //               class="droptarge1 border" // remove 1 for dragable work
  //               style={{ display: "none" }}
  //               draggable="false"
  //             >
  //               Drop
  //             </div>
  //           </td>,
  //           //add else if condition for date
  //         ]);
  //         countOfInput = countOfInput + 1;
  //       } else if (replacetempArray[countreplaceTemp] == "date") {
  //         testArr.push([
  //           <td
  //             class={`dropTh${countOfInput} border`}
  //             draggable="false" //change dragable true to work again
  //             id={`item${randnum}${countOfInput}${i}`}
  //           >
  //             <div draggable="false">
  //               <TextField
  //                 name={`box${countOfInput}`}
  //                 id={`date${countOfInput}`}
  //                 type="date"
  //                 className="getValue"
  //                 defaultValue={startDate}
  //                 size="small"
  //               />
  //             </div>
  //             <div
  //               class="droptarget1 border" // remove 1 for dragable work
  //               style={{ display: "none" }}
  //               draggable="false"
  //             >
  //               Drop
  //             </div>
  //           </td>,
  //         ]);
  //         countOfInput = countOfInput + 1;
  //       }
  //     }
  //   }

  //   replaceArray.push(replacetempArray);
  //   array.push(testArr);

  //   if (array.length > 10) {
  //     alert("plz take less then 10 field");
  //     return;
  //   } else {
  //     setCount([...array]);
  //     setOpens(false);
  //     setOpen(false);
  //   }
  // };

  

  return (
    <Grid>
      {
        openModal ? ( <Grid>
          <Grid className="single-entry-form">
          <Grid>
          <label className="mb-2 fw-bold fs-4">Page Name</label>
            <br></br>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="text"
              size="small"
              value={pageName}
              onChange={(e) => {
                setPageName(e.target.value);
              }}
            />

          </Grid>
          </Grid>

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

                  let a = 0;
                  if (e.target.value == "") {
                    a = 0;
                  } else {
                    a = parseInt(e.target.value);
                  }
                  setInputValue(a);
                }}
              />
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
                  let b = 0;
                  if (e.target.value == "") {
                    b = 0;
                  } else {
                    b = parseInt(e.target.value);
                  }
                  setInputValueDDF(b);
                }}
              />
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
                  let c = 0;
                  if (e.target.value == "") {
                    c = 0;
                  } else {
                    c = parseInt(e.target.value);
                    console.log(typeof c);
                  }
                  setInputValueCheck(c);
                }}
              />
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
                  let d = 0;
                  if (e.target.value == "") {
                    d = 0;
                  } else {
                    d = parseInt(e.target.value);
                    console.log(typeof d);
                  }
                  console.log(d);
                  setInputValueDate(d);
                }}
              />
            </Grid>
            <Grid>
              <Button
                variant="contained"
                style={{ marginLeft: "20px", marginTop: "20px" }}
                data-toggle="modal"
                data-target={`#exampleModalFormula`}

                onClick={() => {                
                  var foundKey = 0;
                  var foundEmpty = 0;
                  console.log(allInputValueData);
                  var allInputValueDataLength = 0;
                  if(inputValue!=''){
                    allInputValueDataLength =  inputValue;
                  }   
                  var allCheckValueDataLength = 0;
                  if(inputValueCheck!=''){
                    allCheckValueDataLength =  inputValueCheck
                  }
                  
                  var allDateValueDataLength = 0;
                  if(inputValueDate!=''){
                    allDateValueDataLength =  inputValueDate
                  }
              
                  var allDropValueDataLength = 0;
                  if(inputValueDDF!=''){
                    allDropValueDataLength =  inputValueDDF
                  }   
                  var totalField = allCheckValueDataLength+allInputValueDataLength+allDateValueDataLength+allDropValueDataLength;
                  
                  if(pageName!=""){
                    if(totalField>12){
                      alert('There cannot be more than 12 input');
                    }
                    else{
                      var totalValueField = 0;

                      if(allInputValueData==null){
                        totalValueField+=0;
                      }
                      else{
                        totalValueField+=allInputValueData.length;
                      }

                      if(allCheckValueData==null){
                        totalValueField+=0;
                      }
                      else{
                        totalValueField+=allCheckValueData.length;
                      }

                      if(allDropValueData==null){
                        totalValueField+=0;
                      }
                      else{
                        totalValueField+=allDropValueData.length;
                      }

                      if(allDateValueData==null){
                        totalValueField+=0;
                      }
                      else{
                        totalValueField+=allDateValueData.length;
                      }

                      if(totalValueField<totalField){
                        foundEmpty = 1;
                      }
                      if(foundEmpty==1){
                          alert("Column Name field cannot be empty");
                      }
                      else{
                        if(inputValue>2){
                        
                          for(let countKeyValue = 0; countKeyValue <allInputValueDataLength ; countKeyValue++) {
                            if(keyValue.some(item => item.key === allInputValueData[countKeyValue])){
                              foundKey = 1;
                              
                            }
                            
                          }
                          if(foundKey==1){
                              setShowCalculactionModal(true);
                              
                          }
                          else{
                            submitForm();
                          }
                          }
                          else{
                            submitForm();
                          }
                      }
                      
                    }
                    
                    
                  }
                  else{
                    setPageNameStatus(0);
                  }
                }}

              >
                Enter
              </Button>
            </Grid>
          </Grid>
          <Grid className="d-flex  align-items-center">
            <Grid>
              {inputData?.map((item, name) => {
                var labelName = "labelName";
                var labelType = "labelType";
                return (
                  <div style={{ marginLeft: "180px" }}>
                    <input
                      type="text"
                      name={name}
                      id={name}
                      className="getInputValue mt-2"
                      onChange={(e) => {
                        // setAllData(e.target.value, labelType, labelName);
                        // setAllData({
                        //   ...allData,
                        //   [labelName]: e.target.value,
                        //   [labelType]: e.target.type,
                        // });

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
                    
                  </div>
                );
              })}
            </Grid>
            <Grid>
              {dropdownData.map((item, name) => {
                var labelName = "labelName";
                var labelType = "labelType";
                return (
                  <div className="ps-5 d-flex align-items-center ">
                    <Select
                      class="form-select"
                      className="w-[100%] mt-2"
                      aria-label="Default select example"
                      // placeholder={`${allDropValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
                      options={selectedOption[name]}
                      id={`dropValue${name}`}
                      onChange={(e) => {}}
                    ></Select>
                    <div className="ms-2">
                      <FontAwesomeIcon
                        icon={faPlusCircle}
                        className="text-success"
                        data-toggle="modal"
                        data-target={`#exampleModal${name}`}
                        data-id={name}
                        onClick={() => {
                          handleModalMenu();
                        }}
                      ></FontAwesomeIcon>

                      <div
                        class="modal fade"
                        id={`exampleModal${name}`}
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby={`exampleModal${name}Label`}
                        // aria-hidden="true"
                      >
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5
                                class="modal-title"
                                id={`exampleModal${name}Label`}
                              >
                                Select Menu
                              </h5>
                              <button type="button" data-dismiss="modal">
                                <span
                                //  aria-hidden="true"
                                >
                                  &times;
                                </span>
                              </button>
                            </div>
                            <div class="modal-body">
                              {modalSpecificData
                                .filter(
                                  (person) => person.MenuName === "Master Entry"
                                )
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
                                    <h4 className="ms-2">
                                      {filteredPerson.SubMenuName}
                                    </h4>
                                  </div>
                                ))}

                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-primary close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  onClick={(e) => {
                                    handleDropdownValue(name);
                                  }}
                                >
                                  Save changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Grid>
            <Grid>
              {checkboxData.map((item, name) => {
                return (
                  <div className="ps-5">
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
                  </div>
                );
              })}
            </Grid>
            <Grid>
              {dateData.map((item, name) => {
                return (
                  <div className="ps-5">
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
                  </div>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        ):''}
      
{showCalculactionModal?(
<div style={{display:showCalculactionModal?"none !important":"block"}} class="modal fade" id="exampleModalFormula" tabindex="-1" role="dialog" aria-labelledby="exampleModalFormulaLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalFormulaLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={()=>{
          setShowCalculactionModal(false);
        }}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
        <Select
                      class="form-select"
                      className="w-[100%] mt-2"
                      aria-label="Default select example"
                      // placeholder={`${allDropValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
                      options={[{
                        label:"Manual",
                        value:"Manual"
                      },
                      {
                        label:"Auto",
                        value:"Auto"
                      }]}
                      id={`dropValue`}
                      onChange={(e) => {
                        console.log(e.value);
                        setCalculationType(e.value);
                        if(e.value=="Auto"){
                          setDisplayFormulaAuto(true)
                        }
                        else{
                          setDisplayFormulaAuto(false)
                        }
                      }}
                    ></Select>

                    <div className={`${displayFormulaAuto?"d-visible":"d-hidden"}`}>
                    <Select
                      class="form-select"
                      className="w-[100%] mt-2"
                      aria-label="Default select example"
                      // placeholder={`${allDropValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
                      options={allInputValueForFormulaData}
                      id={`dropValueField1`}
                      onChange={(e) => {
                        console.log(e.value,pageFormula);
                        if(pageFormula[0]['Formula'][0]['Field2']==e.value){
                          setField1Validation(0)
                        }
                        else if(pageFormula[0]['Target']==e.value){
                          setField1Validation(0)
                        }
                        else{
                          setField1Validation(1)
                          pageFormula[0]['Formula'][0]['Field1'] = e.value;
                        }
                      }}
                    ></Select>
                    {field1Validation==0?<label className="" style={{color:"red"}}>Value can not be same as Field2 or Target</label>:""}
                    <Select
                      class="form-select"
                      className="w-[100%] mt-2"
                      aria-label="Default select example"
                      // placeholder={`${allDropValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
                      options={[{
                        label:'+',
                        value:'+'
                      },{
                        label:'-',
                        value:'-'
                      },{
                        label:'*',
                        value:'*'
                      },{
                        label:'/',
                        value:'/'
                      }]}
                      id={`dropValueFormula`}
                      onChange={(e) => {
                        console.log(e.value);
                        pageFormula[0]['Formula'][0]['FormulaType'] = e.value;
                        if(e.value!=""){
                          setFieldFormulaValidation(1);
                        }
                        else{                         
                          setFieldFormulaValidation(0);
                        }
                      }}
                    ></Select>
                    {fieldFormulaValidation==0?<label className="" style={{color:"red"}}>Value can not be empty</label>:""}
                    
                    
                  <Select
                      class="form-select"
                      className="w-[100%] mt-2"
                      aria-label="Default select example"
                      // placeholder={`${allDropValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
                      options={allInputValueForFormulaData}
                      id={`dropValueField2`}
                      onChange={(e) => {
                        console.log(e.value);
                        if(pageFormula[0]['Formula'][0]['Field1']==e.value){
                          setField2Validation(0)
                        }
                        else if(pageFormula[0]['Target']==e.value){
                          setField2Validation(0)
                        }
                        else{
                          setField2Validation(1)
                          pageFormula[0]['Formula'][0]['Field2'] = e.value;
                        }
                      }}
                    ></Select>
                    {field2Validation==0?<label className="" style={{color:"red"}}>Value can not be same as Field1 or Target</label>:""}
                    <Select
                      class="form-select"
                      className="w-[100%] mt-2"
                      aria-label="Default select example"
                      // placeholder={`${allDropValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
                      options={allInputValueForFormulaData}
                      id={`dropValueFieldTarget`}
                      onChange={(e) => {
                        if(pageFormula[0]['Formula'][0]['Field1']==e.value){
                          setFieldTargetValidation(0)
                        }
                        else if(pageFormula[0]['Formula'][0]['Field2']==e.value){
                          setFieldTargetValidation(0)
                        }
                        else{
                          console.log(e.value);
                       setFormulaTarget(e.value);
                          setFieldTargetValidation(1)
                          pageFormula[0]['Target'] = e.value;
                        }
                        
                        
                      }}
                    ></Select>
                    {fieldTargetValidation==0?<label className="" style={{color:"red"}}>Value can not be same as Field1 or Field2</label>:""}
                    </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={()=>{
          setOpenModal(true)
        }}>Close</button>
        <button type="button" class="btn btn-primary" onClick={()=>{   
          
          if(pageFormula[0]['Formula'][0]['FormulaType']==""){
            setFieldFormulaValidation(0)
          }   
          if(pageFormula[0]['Formula'][0]['Field2']==""){
            setField1Validation(0)
          }  
          if(pageFormula[0]['Formula'][0]['Field1']==""){
            setField1Validation(0)
          }  
          if(pageFormula[0]['Formula'][0]['FormulaType']==""){
            setFieldFormulaValidation(0)
          }  
          if(pageFormula[0]['Formula'][0]['Target']==""){
            setFieldTargetValidation(0)
          }  
          if(field1Validation!=1 || field2Validation!=1 || fieldFormulaValidation!=1 || fieldTargetValidation!=1){

          } 
          else{
// addList();
              submitForm();
          }
           
        }}>Save changes</button>
      </div>
    </div>
  </div>
</div>

):''}
{/* <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={()=>{
          setOpenModal(true)
        }}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={()=>{
          setOpenModal(true)
        }}>Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=>{
         
            setOpenModal(true)
          
          
        }}>Save changes</button>
      </div>
    </div>
  </div>
</div> */}

    </Grid>
  );
};

export default SingleEntryForm;
