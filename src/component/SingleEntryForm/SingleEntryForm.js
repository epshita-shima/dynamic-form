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
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  const [allData, setAllData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [inputTestData, setInputTestData] = useState({});
  const [labelAPIData, setLabelAPIData] = useState([]);
  const textboxRef = useRef(null);
  const previousInputValues = useRef("");
  const [dataarr, setDataarr] = useState([]);
  const [labelAPIDataCopy, setLabelAPIDataCopy] = useState([]);
  const [getDate, setGetDate] = useState([]);
  const [checkValue, setCheckValue] = useState(false);
  const [twoDimension,setTwoDimention]=useState([[]])
  console.log(twoDimension)
  console.log(getDate);
  // if(dataarr?.length>0){
  //   console.log(dataarr[0][0]["ChallanNo"]);
  // }
const dateNew=new Date().toLocaleDateString('sv-SE')
console.log(dateNew)
  const modelData = {
    procedureName: "prc_GetPageInfo",
    parameters: {
      MenuId: "1",
    },
  };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN1bnNoaW5lLmNvbSIsIlVzZXJJZCI6IjJhNzJlNDA2LTE1YTktNGJiNS05ODNiLWE0NGNiMGJkNzMyMyIsIlVzZXJOYW1lIjoic3Vuc2hpbmUtMDEiLCJqdGkiOiI0OTViMjk4My1jNjY3LTRhYTktYjNhYi05ZjdjZmU1NTZkY2IiLCJuYmYiOjE2ODY5NzM3NjAsImV4cCI6MTY4NzAxNjk2MCwiaXNzIjoic2h1dmEuY29tIiwiYXVkIjoic2h1dmEuY29tIn0.P10-CbMJLiIPcc-VsfaA0A10srR7fxAfpvNtnF2_110";

  useEffect(() => {
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
         
         // console.log(getDate)
          const monthlySalesData = JSON.parse(data.data);
          if (labelAPIData.length == 0) {
            setLabelAPIDataCopy(monthlySalesData);
            labelAPIData.push(monthlySalesData);
          }
          var obj = {};
          labelAPIData.map((item, index) => {

            item.forEach((element,i) => {
              obj[element.ColumnName] = "";
              console.log(element,i)
              if(element.ColumnType=="datetime"){
                twoDimension[0][i]=(new Date());
              }
            });
          });
          console.log(twoDimension)
          setTwoDimention(twoDimension)
          setGetDate([...getDate, new Date()]);
          setDataarr([...dataarr, obj]);
        } else {
          console.log(data);
        }
      });
  }, [setDataarr, labelAPIData]);

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
    previousInputValues.current = inputValue;
  }, [inputValue]);
  useEffect(() => {
    previousInputValue.current = inputValue;
    previousInputValueDDF.current = inputValueDDF;
    previousInputValueCheck.current = inputValueCheck;
    previousInputValueDate.current = inputValueDate;
  }, [inputValue, inputValueDDF, inputValueCheck, inputValueDate]);

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
    console.log(getID.getElementsByClassName("dropTh2"));
  }

  function insertAfter(newNode, refNode) {
    var fromthid = "";
    var fromthclass = "";
    var frominputname = "";
    var frominputplaceholder;
    var tothid = "";
    var tothclass = "";
    var toinputname = "";
    var toinputplaceholder = "";

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

    arr.forEach((element, i) => {
      element.parentNode.insertBefore(newNode[i], element);
    });
  }
  
  function insertBeforeth(newNode, refNode) {
    var allelement = document.getElementsByClassName(refNode);
    var arr = [...allelement];

    arr.forEach((element, i) => {
      element.parentNode.insertBefore(newNode[i], element.nextSibling);
    });
  }

  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleGroupInput = (e, index) => {
    const box = document.getElementsByName(`box${index}`);
    box.forEach((element) => {
      if (element.className == "css-5kkxb2-requiredInput-RequiredInput") {
        var selectname = element.name;
        var selectparentdiv =
          document.getElementsByName(selectname)[0].parentElement;
        if (element.className == "css-5kkxb2-requiredInput-RequiredInput") {
          var selectname = element.name;

          for (
            let a = 0;
            a < document.getElementsByName(selectname).length;
            a++
          ) {
            var selectparentdiv =
              document.getElementsByName(selectname)[a].parentElement;

            for (var i = 0; i < selectparentdiv.childNodes.length; i++) {
              if (
                selectparentdiv.childNodes[i].className ==
                " css-13cymwt-control"
              ) {
                for (
                  var j = 0;
                  j < selectparentdiv.childNodes[i].childNodes.length;
                  j++
                ) {
                  if (
                    selectparentdiv.childNodes[i].childNodes[j].className ==
                    " css-1fdsijx-ValueContainer"
                  ) {
                    for (
                      var k = 0;
                      k <
                      selectparentdiv.childNodes[i].childNodes[j].childNodes
                        .length;
                      k++
                    ) {
                      if (
                        selectparentdiv.childNodes[i].childNodes[j].childNodes[
                          k
                        ].className == " css-1jqq78o-placeholder"
                      ) {
                        document.getElementById(
                          selectparentdiv.childNodes[i].childNodes[j]
                            .childNodes[k].id
                        ).innerHTML = e.target.value;
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          element.placeholder = e.target.value;
        }
      } else {
        element.placeholder = e.target.value;
      }
    });
  };

  const replaceFieldColumn = (e, i, randnum) => {
    var allelement = document.getElementsByClassName(`dropTh${i}`);
    var allelements = document.querySelectorAll(".droptargettd");
    allelements.forEach((element) => {
      element.style.display = "none";
    });
    var radioName = document.querySelector(
      'input[name="replaceField"]:checked'
    ).value;

    if (radioName == "input") {
      replacetempArray[i] = "input";
      var placeholdervalue = "";

      var placeholderdata = document.getElementById(e);
      console.log(placeholderdata, allelement);
      var placeData = placeholderdata?.value;

      placeholdervalue = `${
        placeData == "" || placeData == undefined
          ? "Enter Text"
          : `${placeData}`
      }`;

      for (
        var elementloop = 1;
        elementloop < allelement.length;
        elementloop++
      ) {
        console.log(elementloop, randnum, i);
        var inputReplace = `<td class="dropTh${i} border test" draggable="true" id="itemhello${randnum}${i}${
          elementloop - 1
        }"><div draggable="false" class="d-flex justify-content-between align-items-center"><input type="text" draggable="false" id="input${randnum}${i}" placeholder="${placeholdervalue}" class="form-control" name="box${i}" style="margin-top: 3px;"></div><div class="droptarget border" draggable="false" style="display: none;">Drop</div></td>`;
        console.log(allelement[elementloop], inputReplace);
        allelement[elementloop].innerHTML = inputReplace;
      }
    } else if (radioName == "dropdown") {
      replacetempArray[i] = "dropdown";
      var placeholdervalue = "";

      var placeholderdata = document.getElementById(e);
      var placeData = placeholderdata?.value;

      placeholdervalue = `${
        placeData == "" || placeData == undefined
          ? "Enter Text"
          : `${placeData}`
      }`;

      for (
        var elementloop = 1;
        elementloop < allelement.length;
        elementloop++
      ) {
        var dropdownReplace = `<div draggable="false">
      <div class="w-[100%] css-b62m3t-container" id="select2">
      <span id="react-select-${
        elementloop - 1
      }-live-region" class="css-1f43avz-a11yText-A11yText">
      </span>
      <span aria-live="polite" aria-atomic="false" aria-relevant="additions text" class="css-1f43avz-a11yText-A11yText">
      </span>
      <div class=" css-13cymwt-control">
         <div class=" css-1fdsijx-ValueContainer">
            <div class=" css-1jqq78o-placeholder" id="react-select-${
              elementloop - 1
            }-placeholder">${placeholdervalue}</div>
            <div class=" css-qbdosj-Input" data-value="">
        <input class="" autocapitalize="none" autocomplete="off" autocorrect="off" id="react-select-${
          elementloop - 1
        }-input" spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" aria-expanded="false" aria-haspopup="true" aria-label="Default select example" aria-required="true" role="combobox" aria-describedby="react-select-${i}-placeholder" value="" style="color: inherit; background: 0px center; opacity: 1; width: 100%; grid-area: 1 / 2 / auto / auto; font: inherit; min-width: 2px; border: 0px; margin: 0px; outline: 0px; padding: 0px;"></div>
         </div>
         <div class=" css-1hb7zxy-IndicatorsContainer">
            <span class=" css-1u9des2-indicatorSeparator"></span>
            <div class=" css-1xc3v61-indicatorContainer" aria-hidden="true">
               <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-tj5bde-Svg">
                  <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
               </svg>
            </div>
         </div>
      </div>
      <input required="" name="box${i}" tabindex="-1" aria-hidden="true" class="css-5kkxb2-requiredInput-RequiredInput" value="">
   </div>
            </div>
            <div
            class="droptarget border"
            style="display: none" 
            draggable="false"
            >
            Drop
            </div>`;
        allelement[elementloop].innerHTML = dropdownReplace;
      }
    } else if (radioName == "checkbox") {
      replacetempArray[i] = "checkbox";
      for (
        var elementloop = 1;
        elementloop < allelement.length;
        elementloop++
      ) {
        var checkboxReplace = `<div class="MuiFormGroup-root css-dmmspl-MuiFormGroup-root"><label class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd css-j204z7-MuiFormControlLabel-root" style="margin-top: 3px;"><span class="MuiButtonBase-root MuiCheckbox-root MuiCheckbox-colorPrimary PrivateSwitchBase-root MuiCheckbox-root MuiCheckbox-colorPrimary Mui-checked MuiCheckbox-root MuiCheckbox-colorPrimary css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root"><input class="PrivateSwitchBase-input css-1m9pwf3" name="box${i}" type="checkbox" data-indeterminate="false" checked=""><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckBoxIcon"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg><span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></span><span class="MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label css-ahj2mt-MuiTypography-root">Label</span></label></div>`;
        allelement[elementloop].innerHTML = checkboxReplace;
      }
    } else if (radioName == "date") {
      replacetempArray[i] = "date";
      for (
        var elementloop = 1;
        elementloop < allelement.length;
        elementloop++
      ) {
        var dateReplace = `<div class="MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root"><div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl MuiInputBase-sizeSmall css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root"><input aria-invalid="false" name="box${i}" id="date${i}" type="date" class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input" value="Tue May 30 2023 14:54:02 GMT+0600 (Bangladesh Standard Time)"><fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"><legend class="css-ihdtdm"><span class="notranslate">&ZeroWidthSpace;</span></legend></fieldset></div></div>`;
        allelement[elementloop].innerHTML = dateReplace;
      }
    }
  };

  const replaceFunction = (inputType, count) => {
    replacetempArray.push(inputType);
  };

  const handleSubmit = (e, i) => {
    e.preventDefault();
    const insertData = [];
    dataarr.map((item) => {
      insertData.push(item);
    });
    console.log(insertData);
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

  const addList = () => {
    const testArr = [];
    let randnum = randomNumberInRange(1, 100);
    let countOfInput = 0;
    let number = inputValue;
    let numberDDf = inputValueDDF;
    let numberCheck = inputValueCheck;
    let numberDate = parseInt(inputValueDate);
    if (inputValueDate == "") {
      numberDate = 0;
    }
    if (numberCheck == "") {
      numberCheck = 0;
    }
    if (numberDDf == "") {
      numberDDf = 0;
    }
    if (number == "") {
      number = 0;
    }

    let countLebel = number + numberDDf + numberCheck + numberDate;
    var getInputValue = document.getElementsByClassName("getInputValue");

    var arr = [...getInputValue];
    arr.forEach((element) => {
      allData.push(element.value);
    });

    function test(e) {
      var placeholderdata = document.getElementById(e);
      var placeData = placeholderdata?.value;

      return `${
        placeData == "" || placeData == undefined
          ? "Enter Text"
          : `${placeData}`
      }`;
    }
    if (array.length == 0) {
      for (let i = 0; i < countLebel; i++) {
        var a = (
          <th scope="col" class={`dropTh${i} border`} draggable="true">
            <div className="d-flex justify-content-between align-items-center">
              <TextField
                id={`box${i}`}
                name="L"
                label={`${allData[i]}`}
                variant="standard"
                disabled
                InputLabelProps={{
                  className: "textField_label",
                }}
                className={`box${i}`}
                style={{ marginLeft: "15px" }}
                onChange={(e) => {
                  handleGroupInput(e, i);
                }}
              />

              <FontAwesomeIcon
                icon={faArrowsRotate}
                data-toggle="modal"
                data-target={`#exampleModal${i}`}
              ></FontAwesomeIcon>
              <div
                class="modal fade"
                id={`exampleModal${i}`}
                tabindex="-1"
                role="dialog"
                aria-labelledby={`exampleModal${i}Label`}
                // aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id={`exampleModal${i}Label`}>
                        What you like to replace this field with?
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
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <input
                              type="radio"
                              value="input"
                              name="replaceField"
                              aria-label="Radio button for following text input"
                            />
                          </div>
                        </div>
                        <input
                          id="inputField"
                          type="text"
                          class="form-control"
                          aria-label="Text input with radio button"
                        />
                      </div>
                      <div class="input-group  mt-2">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <input
                              type="radio"
                              name="replaceField"
                              value="dropdown"
                              aria-label="Default select example"
                            />
                          </div>
                        </div>
                        <div className="w-75">
                          <div draggable="false">
                            <Select
                              id={`select${countOfInput}`}
                              class="form-select"
                              className="w-[100%]"
                              aria-label="Default select example"
                              placeholder={test(`box${countOfInput}`)}
                              required
                              name={`box${countOfInput}`}
                            ></Select>
                          </div>
                          <div
                            class="droptarget border"
                            style={{ display: "none" }}
                            draggable="false"
                          >
                            Drop
                          </div>
                        </div>
                      </div>
                      <div class="input-group mt-2">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <input
                              type="radio"
                              value="checkbox"
                              name="replaceField"
                              aria-label="Radio button for following text input"
                            />
                          </div>
                        </div>
                        <FormGroup>
                          <FormControlLabel
                            id="checkboxField"
                            name={`item.${i}.check`}
                            style={{ marginTop: "3px" }}
                            control={<Checkbox defaultChecked />}
                            label="Label"
                          />
                        </FormGroup>
                      </div>
                      <div class="input-group mt-2">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <input
                              type="radio"
                              value="date"
                              name="replaceField"
                              aria-label="Radio button for following text input"
                            />
                          </div>
                        </div>
                        <TextField
                          id="date"
                          type="date"
                          defaultValue={startDate}
                          size="small"
                        />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-primary close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={(e) => {
                          replaceFieldColumn(e, i, randnum);
                        }}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="droptargettd border"
              style={{ display: "none" }}
              draggable="false"
            >
              Drop
            </div>
          </th>
        );
        testArray.push(a);
      }
    }

    if (array.length < 1) {
      for (let i = 0; i < number; i++) {
        testArr.push([
          <td
            class={`dropTh${countOfInput} border`}
            draggable="false"
            id={`item${randnum}${countOfInput}${i}`}
          >
            <div
              draggable="false"
              className="d-flex justify-content-between align-items-center"
            >
              {replaceFunction("input", countOfInput)}
              <input
                type="text"
                draggable="false"
                id={`${array.length}`}
                // id={`${allInputValueData[countOfInput]}`}
                size="small"
                selectedIndex={`${array.length}`}
                style={{ marginTop: "3px" }}
                placeholder={`${allInputValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
                className="getValue form-control"
                data-animal-type={`box${countOfInput}`}
                name={`box${countOfInput}`}
                ref={textboxRef}
                onChange={(e) => {
                  const { name, value, placeholder } = e.target;
                  if (isNaN(placeholder)) {
                    inputTestData[placeholder] = value;
                    setInputTestData({ ...inputTestData });
                  }
                  singleData[e.target.id] = inputTestData;
                  // singleData.push(inputTestData)
                  // if(singleData.length==''){
                  // }
                  // else{
                  //   console.log(countOfInput)
                  //   singleData[countOfInput] = inputTestData;
                  // }
                  // setInputTestData({
                  //   ...inputTestData,
                  //   [name]: e.target.value,
                  // });
                  // setFieldValue(`${allInputValueData[countOfInput]}`,e.target.value)
                  for (let i = 0; i < array.length; i++) {
                    // handleInputValue(e, i);
                    // showDetails(e)
                  }
                }}
              />
            </div>
            <div
              class="droptarget1 border"
              style={{ display: "none" }}
              draggable="false"
            >
              Drop
            </div>
          </td>,
        ]);
        countOfInput = countOfInput + 1;
      }
      for (var i = 0; i < numberDDf; i++) {
        testArr.push([
          <td
            class={`dropTh${countOfInput} border`}
            draggable="false" //change dragable true to work again
            id={`item${randnum}${countOfInput}${i}`}
          >
            <div draggable="false">
              {replaceFunction("dropdown", i)}
              <Select
                id={array.length}
                class="form-select"
                className="w-[100%] getValue"
                aria-label="Default select example"
                placeholder={`${allDropValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
                required
                name={`box${countOfInput}`}
                options={dropData}
                // value={dropData.find((x) => x.value == category.groupId)}
                onChange={(e, event, id) => {
                  // const optionElementId = optionsElement.getAttribute('id');
                  const { name, value, placeholder } = e;
                  console.log(e, event);
                  if (isNaN(placeholder)) {
                    inputTestData[placeholder] = value;
                    setInputTestData({ ...inputTestData });
                  }
                  singleData[e.id] = inputTestData;
                  console.log(e.value);
                  // category.groupId = e.value;
                }}
              ></Select>
            </div>
            <div
              class="droptarget1 border" // remove 1 for dragable work
              style={{ display: "none" }}
              draggable="false"
            >
              Drop
            </div>
          </td>,
        ]);
        countOfInput = countOfInput + 1;
      }
      for (var i = 0; i < numberCheck; i++) {
        testArr.push([
          <td
            class={`dropTh${countOfInput} border`}
            draggable="false" //change dragable true to work again
            id={`item${randnum}${countOfInput}${i}`}
          >
            <div draggable="false">
              {replaceFunction("checkbox", i)}
              <FormGroup>
                <FormControlLabel
                  name={`box${countOfInput}`}
                  id={`check${countOfInput}`}
                  style={{ marginTop: "3px" }}
                  control={<Checkbox />}
                  label="Label"
                  onChange={(e) => {
                    // const {value,name}=e.checked
                    const { value, checked } = e.target;
                    console.log(checked);
                  }}
                />
              </FormGroup>
            </div>
            <div
              class="droptarget1 border" // remove 1 for dragable work
              style={{ display: "none" }}
              draggable="false"
            >
              Drop
            </div>
          </td>,
        ]);
        countOfInput = countOfInput + 1;
      }
      for (var i = 0; i < numberDate; i++) {
        testArr.push([
          <td
            class={`dropTh${countOfInput} border`}
            draggable="false" //change dragable true to work again
            id={`item${randnum}${countOfInput}${i}`}
          >
            <div draggable="false">
              {replaceFunction("date", i)}
              <TextField
                name={`box${countOfInput}`}
                id={`date${countOfInput}`}
                type="date"
                className="getValue"
                defaultValue={startDate}
                size="small"
              />
            </div>
            <div
              class="droptarget1 border" // remove 1 for dragable work
              style={{ display: "none" }}
              draggable="false"
            >
              Drop
            </div>
          </td>,
        ]);
        countOfInput = countOfInput + 1;
      }
    } else {
      for (
        var countreplaceTemp = 0;
        countreplaceTemp < replacetempArray.length;
        countreplaceTemp++
      ) {
        if (replacetempArray[countreplaceTemp] == "input") {
          console.log(countreplaceTemp);
          testArr.push([
            <td
              class={`dropTh${countOfInput} border`}
              draggable="false" //change dragable true to work again
              id={`item${randnum}${countOfInput}${countreplaceTemp}`}
            >
              <div
                draggable="false"
                className="d-flex justify-content-between align-items-center"
              >
                <input
                  type="text"
                  draggable="false"
                  id={`${array.length}`}
                  // id={`${allInputValueData[countOfInput]}`}
                  size="small"
                  style={{ marginTop: "3px" }}
                  placeholder={`${allInputValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
                  className="form-control getValue"
                  // value={`${allInputValueData[countOfInput]}`}
                  name={`box${countOfInput}`}
                  data-animal-type={`box${countOfInput}`}
                  onChange={(e) => {
                    const { name, value, placeholder } = e.target;
                    if (isNaN(placeholder)) {
                      inputTestData[placeholder] = value;
                      setInputTestData({ ...inputTestData });
                    }
                    singleData[e.target.id] = inputTestData;
                  }}
                />
              </div>
              <div
                class="droptarge1t border" // remove 1 for dragable work
                style={{ display: "none" }}
                draggable="false"
              >
                Drop
              </div>
            </td>,
          ]);
          countOfInput = countOfInput + 1;
          setCount(count + 1);
        } else if (replacetempArray[countreplaceTemp] == "dropdown") {
          testArr.push([
            <td
              class={`dropTh${countOfInput} border`}
              draggable="false" //change dragable true to work again
              // id={`item${randnum}${countOfInput}${countreplaceTemp}`}
              id={array.length}
            >
              <div draggable="false">
                <Select
                  id={`select${countOfInput}`}
                  class="form-select"
                  className="w-[100%] getValue"
                  aria-label="Default select example"
                  // placeholder={test(`box${countOfInput}`)}
                  placeholder={`${allDropValueData[countOfInput]}`}
                  required
                  name={`box${countOfInput}`}
                  options={dropData}
                  // value={dropData.find((x) => x.value == category.groupId)}
                  onChange={(e) => {
                    const { name, value, placeholder } = e;
                    console.log(e);
                    if (isNaN(placeholder)) {
                      inputTestData[placeholder] = value;
                      setInputTestData({ ...inputTestData });
                    }
                    singleData[e.id] = inputTestData;
                    console.log(e.value);
                    // category.groupId = e.value;
                  }}
                ></Select>
              </div>
              <div
                class="droptarget1 border" // remove 1 for dragable work
                style={{ display: "none" }}
                draggable="false"
              >
                Drop
              </div>
            </td>,
          ]);
          countOfInput = countOfInput + 1;
        } else if (replacetempArray[countreplaceTemp] == "checkbox") {
          testArr.push([
            <td
              class={`dropTh${countOfInput} border`}
              draggable="false" //change dragable true to work again
              id={`item${randnum}${countOfInput}${countreplaceTemp}`}
            >
              <div draggable="false">
                <FormGroup>
                  <FormControlLabel
                    name={`box${countOfInput}`}
                    id={`check${countOfInput}`}
                    style={{ marginTop: "3px" }}
                    control={<Checkbox />}
                    label="Label"
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      console.log(checked);
                      // const {value,name}=e.target
                    }}
                  />
                </FormGroup>
              </div>
              <div
                class="droptarge1 border" // remove 1 for dragable work
                style={{ display: "none" }}
                draggable="false"
              >
                Drop
              </div>
            </td>,
            //add else if condition for date
          ]);
          countOfInput = countOfInput + 1;
        } else if (replacetempArray[countreplaceTemp] == "date") {
          testArr.push([
            <td
              class={`dropTh${countOfInput} border`}
              draggable="false" //change dragable true to work again
              id={`item${randnum}${countOfInput}${i}`}
            >
              <div draggable="false">
                <TextField
                  name={`box${countOfInput}`}
                  id={`date${countOfInput}`}
                  type="date"
                  className="getValue"
                  defaultValue={startDate}
                  size="small"
                />
              </div>
              <div
                class="droptarget1 border" // remove 1 for dragable work
                style={{ display: "none" }}
                draggable="false"
              >
                Drop
              </div>
            </td>,
          ]);
          countOfInput = countOfInput + 1;
        }
      }
    }

    replaceArray.push(replacetempArray);
    array.push(testArr);

    if (array.length > 10) {
      alert("plz take less then 10 field");
      return;
    } else {
      setCount([...array]);
      setOpens(false);
      setOpen(false);
    }
  };

  const inputFunction = (item, countOfInput, setFieldValue, i) => {

    if (item.ColumnType == "textbox") {
      return (
        <td
          class={`dropTh${countOfInput} border`}
          draggable="false"
          // id={`item${randnum}${countOfInput}${i}`}
        >
          <div
            draggable="false"
            className="d-flex justify-content-between align-items-center"
          >
            {/* {replaceFunction("input", countOfInput)} */}
            <input
              type="text"
              draggable="false"
              id={`item${i}`}
              size="small"
              name={`${i}input`}
              style={{ marginTop: "3px" }}
              className="getValue form-control"
              s
              onChange={(e) => {
                const { value } = e.target;
                dataarr[i][item.ColumnName] = value;
                setDataarr(dataarr);
              }}
            />
          </div>
          <div
            class="droptarget1 border"
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
          class={`dropTh${countOfInput} border`}
          draggable="false" //change dragable true to work again
          // id={`item${randnum}${countOfInput}${i}`}
        >
          <div draggable="false">
            {/* {replaceFunction("dropdown", i)} */}
            <Select
              id={`${i}drop`}
              name={`${i}drop`}
              class="form-select"
              className="w-[100%] getValue"
              aria-label="Default select example"
              // placeholder={`${allDropValueData[countOfInput]}`} //{test(`box${countOfInput}`)}
              options={dropData}
              onChange={(e) => {
                const { value } = e;
                dataarr[i][item.ColumnName] = value;
                setDataarr(dataarr);
              }}
            ></Select>
          </div>
          <div
            class="droptarget1 border" // remove 1 for dragable work
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
          class={`dropTh${countOfInput} border`}
          draggable="false" //change dragable true to work again
          // id={`item${randnum}${countOfInput}${i}`}
        >
          <div draggable="false">
            {/* {replaceFunction("checkbox", i)} */}
            <FormGroup>
              <FormControlLabel
                name={`box${i}`}
                id={`check${i}`}
                style={{ marginTop: "3px" }}
                control={<Checkbox />}
                label="Label"
                onChange={(e) => {
                  const { value, checked } = e.target;
                  console.log(checked);
                  if (checked) {
                    dataarr[i][item.ColumnName] = "true";
                    setDataarr(dataarr);
                  } else {
                    dataarr[i][item.ColumnName] = "false";
                    setDataarr(dataarr);
                  }
                  // const {value,name}=e.checked
                }}
              />
            </FormGroup>
          </div>
          <div
            class="droptarget1 border" // remove 1 for dragable work
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
          class={`dropTh${countOfInput} border`}
          draggable="false"
          // id={`item${randnum}${countOfInput}${i}`}
        >
          <div
            draggable="false"
            className="d-flex justify-content-between align-items-center"
          >
            {/* {replaceFunction("input", countOfInput)} */}
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name={`radio`}
                id={`radio${i}`}
                onChange={(e)=>{
                  const { value, checked } = e.target;
                  if (checked) {
                    dataarr[i][item.ColumnName] = "true";
                    setDataarr(dataarr);
                    dataarr.forEach((e,index) => {
                      if(index!=i){
                        dataarr[index][item.ColumnName] = "";
                        setDataarr(dataarr);
                      }
                    });
                  } 
                  else {
                   
                   
                  }
                }}
              />
              <label class="form-check-label" for={`radio${i}`}>
                Radio
              </label>
            </div>
          </div>
          <div
            class="droptarget1 border"
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
          class={`dropTh${countOfInput} border`}
          draggable="false" //change dragable true to work again
          // id={`item${randnum}${countOfInput}${i}`}
        >
          <div draggable="false">
            {/* {replaceFunction("date", i)} */}

            <DatePicker
              dateFormat="yyyy-MM-dd"
              className="input text-center"
              // value={startDate}
              name={`date${i}`}
              id={`date${i}`}
              placeholderText="Click to select a date"
              selected={twoDimension[i][countOfInput]}
              onChange={(e) => {
                // const date_data = getDate[i];

                // setStartDate(startDate > new Date() ? new Date() : startDate);
                // if (startDate == startDate) {
                //   setIsDate(startDate ? false : true);
                // }
                // dataarr[i][item.ColumnName] =  formattedDate;
                // setDataarr(dataarr)
               
                var temparr = [...twoDimension];
                temparr[i][countOfInput] = e;
                const newDate = temparr[i][countOfInput];
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

                dataarr[i][item.ColumnName] = formattedDate;
                getDate.push(e)
                setTwoDimention(temparr)
                setDataarr(dataarr);
               
              }}
            />
          </div>
          <div
            class="droptarget1 border" // remove 1 for dragable work
            style={{ display: "none" }}
            draggable="false"
          >
            Drop
          </div>
        </td>
      );
    }
  };

  return (
    <Grid>
      {/* {opens == true ? (
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
                onClick={() => {
                  addList();
                }}
              >
                Enter
              </Button>
            </Grid>
          </Grid>
          <Grid className="d-flex  align-items-center">
            <Grid>
              {inputData?.map((item, name) => {
                var labelName='labelName';
                var labelType='labelType'
                return (
                  <div style={{ marginLeft: "180px" }}>
                    <input
                      type="text"
                      name={name}
                      id=""
                      className="getInputValue mt-2"
                      onChange={(e) => {
                        setAllData( e.target.value,labelType,labelName)
                        setAllData({...allData,[labelName]: e.target.value,[labelType]:e.target.type})
                        // setAllInputValueData({
                        //   ...allInputValueData,
                        //   [name]: e.target.value,
                        // });
                      }}
                    />
                  </div>
                );
              })}
            </Grid>
            <Grid>
              {dropdownData.map((item, name) => {
                var labelName='labelName';
                var labelType='labelType'
                return (
                  <div className="ps-5">
                    <input
                      type="dropdown"
                      name={name}
                      id=""
                      className=" getInputValue mt-2"
                      onChange={(e) => {
                        setAllData({...allData,[labelName]: e.target.value,[labelType]:e.target.type})
                        // setAllDropValueData({
                        //   ...allDropValueData,
                        //   [name]: e.target.value,
                        // });
                      }}
                    />
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
                        setAllData({...allData,[e.target.value]: e.target.value})
                        // setAllCheckValueData({
                        //   ...allCheckValueData,
                        //   [e.target.value]: e.target.value,
                        // });
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
                        setAllData({...allData,[name]: e.target.value})
                        // setAllDateValueData({
                        //   ...allDateValueData,
                        //   [name]: e.target.value,
                        // });
                      }}
                    />
                  </div>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      ) : ( */}
      <Grid style={{ margin: "50px" }}>
        <Formik
          initialValues={{}}
          render={({ values, setFieldValue }) => {
            return (
              <form>
                <h2
                  style={{
                    textAlign: "center",
                    fontSize: "32px",
                    color: "purple",
                  }}
                >
                  Single Form
                </h2>
                <Button
                  variant="contained"
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
                  style={{ marginLeft: "5px", background: "indigo" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setGetDate([...getDate, new Date()]);
                    setLabelAPIData((prev) => {
                      const temp_details = [...prev];
                      var temparr = [];
                      var tempdatearr = [];
                      temp_details[0].map((element,i) => {
                        if(element.ColumnType=="datetime"){
                          tempdatearr[i]=(new Date());
                        }
                        temparr.push(element);
                      });
                      twoDimension.push(tempdatearr)
                      setTwoDimention(twoDimension)
                      temp_details.push(temparr);
                      return temp_details;
                    });
                  }}
                >
                  Add row
                </Button>

                <br />
                <FieldArray
                  render={(arrayHelpers) => {
                    console.log(values);
                    return (
                      <>
                        <table class="table  mt-4">
                          <thead className="border ">
                            <tr>
                              {labelAPIData.map((item, i) => {
                                if (i == 0) {
                                  return item.map((element, index) => {
                                    return (
                                      <th
                                        scope="col"
                                        class={`dropTh${index} border`}
                                        draggable="true"
                                      >
                                        <div className="d-flex justify-content-between align-items-center">
                                          <TextField
                                            id={`box${index}`}
                                            name="L"
                                            label={`${element.ColumnName}`}
                                            variant="standard"
                                            disabled
                                            InputLabelProps={{
                                              className: "textField_label",
                                            }}
                                            className={`box${index}`}
                                            style={{ marginLeft: "15px" }}
                                            onChange={(e) => {
                                              handleGroupInput(e, index);
                                            }}
                                          />

                                          <FontAwesomeIcon
                                            icon={faArrowsRotate}
                                            data-toggle="modal"
                                            data-target={`#exampleModal${i}`}
                                          ></FontAwesomeIcon>
                                          <div
                                            class="modal fade"
                                            id={`exampleModal${i}`}
                                            tabindex="-1"
                                            role="dialog"
                                            aria-labelledby={`exampleModal${i}Label`}
                                            // aria-hidden="true"
                                          >
                                            <div
                                              class="modal-dialog"
                                              role="document"
                                            >
                                              <div class="modal-content">
                                                <div class="modal-header">
                                                  <h5
                                                    class="modal-title"
                                                    id={`exampleModal${i}Label`}
                                                  >
                                                    What you like to replace
                                                    this field with?
                                                  </h5>
                                                  <button
                                                    type="button"
                                                    data-dismiss="modal"
                                                  >
                                                    <span
                                                    //  aria-hidden="true"
                                                    >
                                                      &times;
                                                    </span>
                                                  </button>
                                                </div>
                                                <div class="modal-body">
                                                  <div class="input-group">
                                                    <div class="input-group-prepend">
                                                      <div class="input-group-text">
                                                        <input
                                                          type="radio"
                                                          value="input"
                                                          name="replaceField"
                                                          aria-label="Radio button for following text input"
                                                        />
                                                      </div>
                                                    </div>
                                                    <input
                                                      id="inputField"
                                                      type="text"
                                                      class="form-control"
                                                      aria-label="Text input with radio button"
                                                    />
                                                  </div>
                                                  <div class="input-group  mt-2">
                                                    <div class="input-group-prepend">
                                                      <div class="input-group-text">
                                                        <input
                                                          type="radio"
                                                          name="replaceField"
                                                          value="dropdown"
                                                          aria-label="Default select example"
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="w-75">
                                                      <div draggable="false">
                                                        <Select
                                                          // id={`select${countOfInput}`}
                                                          class="form-select"
                                                          className="w-[100%]"
                                                          aria-label="Default select example"
                                                          // placeholder={test(
                                                          //   `box${countOfInput}`
                                                          // )}
                                                          required
                                                          // name={`box${countOfInput}`}
                                                        ></Select>
                                                      </div>
                                                      <div
                                                        class="droptarget border"
                                                        style={{
                                                          display: "none",
                                                        }}
                                                        draggable="false"
                                                      >
                                                        Drop
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div class="input-group mt-2">
                                                    <div class="input-group-prepend">
                                                      <div class="input-group-text">
                                                        <input
                                                          type="radio"
                                                          value="checkbox"
                                                          name="replaceField"
                                                          aria-label="Radio button for following text input"
                                                        />
                                                      </div>
                                                    </div>
                                                    <FormGroup>
                                                      <FormControlLabel
                                                        id="checkboxField"
                                                        name={`item.${i}.check`}
                                                        style={{
                                                          marginTop: "3px",
                                                        }}
                                                        control={
                                                          <Checkbox
                                                            defaultChecked
                                                          />
                                                        }
                                                        label="Label"
                                                      />
                                                    </FormGroup>
                                                  </div>
                                                  <div class="input-group mt-2">
                                                    <div class="input-group-prepend">
                                                      <div class="input-group-text">
                                                        <input
                                                          type="radio"
                                                          value="date"
                                                          name="replaceField"
                                                          aria-label="Radio button for following text input"
                                                        />
                                                      </div>
                                                    </div>
                                                    <TextField
                                                      id="date"
                                                      type="date"
                                                      defaultValue={startDate}
                                                      size="small"
                                                    />
                                                  </div>
                                                </div>
                                                <div class="modal-footer">
                                                  <button
                                                    type="button"
                                                    class="btn btn-primary close"
                                                    data-dismiss="modal"
                                                    aria-label="Close"
                                                    onClick={(e) => {
                                                      // replaceFieldColumn(
                                                      //   e,
                                                      //   i,
                                                      //   randnum
                                                      // );
                                                    }}
                                                  >
                                                    Save changes
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div
                                          class="droptargettd border"
                                          style={{ display: "none" }}
                                          draggable="false"
                                        >
                                          Drop
                                        </div>
                                      </th>
                                    );
                                  });
                                }
                              })}
                              <th scope="col">Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {labelAPIData.map((item, index) => {
                              //   var obj = {};
                              //   item.forEach(element=>{
                              //     obj[element.ColumnName] = "";
                              //   })
                              // //  console.log(obj)
                              return (
                                <tr id={`tr${index}`}>
                                  {item.map((element, i) => {
                                    return inputFunction(
                                      element,
                                      i,
                                      setFieldValue,
                                      index
                                    );
                                  })}
                                  <td class="border">
                                    <Button
                                      id={`delete${index}`}
                                      variant="contained"
                                      style={{
                                        background: "red",
                                        marginTop: "3px",
                                        borderRadius: "50px",
                                        textAlign: "center",
                                      }}
                                      onClick={(e) => {
                                        console.log(e);
                                        console.log(
                                          document.getElementById(e.target.id)
                                            .parentNode.parentNode.id
                                        );
                                        var tridname = document.getElementById(
                                          e.target.id
                                        ).parentNode.parentNode.id;
                                        console.log(tridname);
                                        document
                                          .getElementById(tridname)
                                          .remove();

                                        setDataarr((prev) => {
                                          const temp__details = [...prev];
                                         
                                            temp__details.splice(index, 1);
                                          
                                          return temp__details;
                                        });
                                      }}
                                    >
                                      X
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </>
                    );
                  }}
                ></FieldArray>
              </form>
            );
          }}
        ></Formik>
      </Grid>
      {/* )} */}
    </Grid>
  );
};

export default SingleEntryForm;
