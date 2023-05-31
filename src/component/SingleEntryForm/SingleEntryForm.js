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

const SingleEntryForm = ({ opens, setOpens, setOpen }) => {
  const [array, setArray] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [inputValue, setInputValue] = useState("");
  const [inputValueDDF, setInputValueDDF] = useState("");
  const [inputValueCheck, setInputValueCheck] = useState("");
  const [inputValueDate, setInputValueDate] = useState("");
  const [count, setCount] = useState([]);
  const previousInputValue = useRef("");
  const previousInputValueDDF = useRef("");
  const previousInputValueCheck = useRef("");
  const previousInputValueDate = useRef("");
  const [testArray, setTestArray] = useState([]);
  const [replacetempArray, setreplacetempArray] = useState([]);
  const replaceArray=[];
 const [firstName,setFirstName]=useState([{testName:''}])

console.log(firstName)
  useEffect(() => {
    previousInputValue.current = inputValue;
    previousInputValueDDF.current = inputValueDDF;
    previousInputValueCheck.current = inputValueCheck;
    previousInputValueDate.current = inputValueDate;
  }, [inputValue, inputValueDDF, inputValueCheck,inputValueDate]);

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
    console.log(newNode)
    var getID=document.getElementById(refNode)
    document
      .getElementById(refNode)
      .parentNode.insertBefore(
        newNode,
        document.getElementById(refNode).nextSibling
      );
      console.log( getID.getElementsByClassName('dropTh2'))
  }
  
  function insertAfter(newNode, refNode) {


    var fromthid = '';
    var fromthclass = '';
    var frominputname = '';
    var frominputplaceholder
    var tothid = '';
    var tothclass = '';
    var toinputname = '';
    var toinputplaceholder = '';

    fromthid = newNode.id;
    fromthclass = newNode.className;
    tothid = refNode;
    tothclass = document.getElementById(refNode).className;

    console.log(fromthid,fromthclass,tothid,tothclass);

    document
      .getElementById(refNode)
      .parentNode.insertBefore(newNode, document.getElementById(refNode));

      document.getElementById(fromthid).setAttribute("id",tothid);
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
        var notes = null;
        if (element.className == "css-5kkxb2-requiredInput-RequiredInput") {
          var selectname = element.name;

          for (
            let a = 0;
            a < document.getElementsByName(selectname).length;
            a++
          ) {
            var selectparentdiv =
              document.getElementsByName(selectname)[a].parentElement;
            var notes = null;
            
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
  const replaceFieldColumn = (e, i) => {
    let randnum = randomNumberInRange(1, 100);
    var allelement = document.getElementsByClassName(`dropTh${i}`);
    console.log(allelement)
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
      console.log(placeholderdata,allelement)
      var placeData = placeholderdata?.value;

      placeholdervalue =  `${
        placeData == "" || placeData == undefined
          ? "Enter Text"
          : `${placeData}`
      }`;
      
      for (
        var elementloop = 1;
        elementloop < allelement.length;
        elementloop++
      ) {
        console.log(elementloop,randnum,i)
        var inputReplace = `<td class="dropTh${i} border test" draggable="true" id="itemhello${randnum}${i}${elementloop-1}"><div draggable="false" class="d-flex justify-content-between align-items-center"><input type="text" draggable="false" id="input${randnum}${i}" placeholder=${placeholdervalue} class="form-control" name="box${i}" style="margin-top: 3px;"></div><div class="droptarget border" draggable="false" style="display: none;">Drop</div></td>`;
        console.log(allelement[elementloop],inputReplace)
        allelement[elementloop].innerHTML = inputReplace;
      }
    }

    else if (radioName == "dropdown") {
      replacetempArray[i] = "dropdown";
      var placeholdervalue = "";
            
      var placeholderdata = document.getElementById(e);
      console.log(placeholderdata)
      var placeData = placeholderdata?.value;

      placeholdervalue =  `${
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
      <span id="react-select-${elementloop-1}-live-region" class="css-1f43avz-a11yText-A11yText">
      </span>
      <span aria-live="polite" aria-atomic="false" aria-relevant="additions text" class="css-1f43avz-a11yText-A11yText">
      </span>
      <div class=" css-13cymwt-control">
         <div class=" css-1fdsijx-ValueContainer">
            <div class=" css-1jqq78o-placeholder" id="react-select-${elementloop-1}-placeholder">${placeholdervalue}</div>
            <div class=" css-qbdosj-Input" data-value="">
        <input class="" autocapitalize="none" autocomplete="off" autocorrect="off" id="react-select-${elementloop-1}-input" spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" aria-expanded="false" aria-haspopup="true" aria-label="Default select example" aria-required="true" role="combobox" aria-describedby="react-select-${i}-placeholder" value="" style="color: inherit; background: 0px center; opacity: 1; width: 100%; grid-area: 1 / 2 / auto / auto; font: inherit; min-width: 2px; border: 0px; margin: 0px; outline: 0px; padding: 0px;"></div>
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
    } 
   else if (radioName == "checkbox"){
      replacetempArray[i] = "checkbox";
      for (
        var elementloop = 1;
        elementloop < allelement.length;
        elementloop++
      ) {
        var checkboxReplace = `<div class="MuiFormGroup-root css-dmmspl-MuiFormGroup-root"><label class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd css-j204z7-MuiFormControlLabel-root" style="margin-top: 3px;"><span class="MuiButtonBase-root MuiCheckbox-root MuiCheckbox-colorPrimary PrivateSwitchBase-root MuiCheckbox-root MuiCheckbox-colorPrimary Mui-checked MuiCheckbox-root MuiCheckbox-colorPrimary css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root"><input class="PrivateSwitchBase-input css-1m9pwf3" name="box${i}" type="checkbox" data-indeterminate="false" checked=""><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckBoxIcon"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg><span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></span><span class="MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label css-ahj2mt-MuiTypography-root">Label</span></label></div>`;
        allelement[elementloop].innerHTML = checkboxReplace;
      }
    }
    else if(radioName == "date"){
      replacetempArray[i]='date'
      for(var elementloop=1; elementloop<allelement.length;elementloop++){
        var dateReplace=`<div class="MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root"><div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl MuiInputBase-sizeSmall css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root"><input aria-invalid="false" name="box${i}" id="date${i}" type="date" class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input" value="Tue May 30 2023 14:54:02 GMT+0600 (Bangladesh Standard Time)"><fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"><legend class="css-ihdtdm"><span class="notranslate">&ZeroWidthSpace;</span></legend></fieldset></div></div>`;
        allelement[elementloop].innerHTML = dateReplace;
      }
    }
  };

  const replaceFunction=(inputType,count)=>{
    replacetempArray.push(inputType);
  }
  const handleInputValue=(e,i) =>{
    // console.log(i)
    // const values = [...firstName];
    // values[i] = e.target.value;
    // setFirstName(values);
    // const { name, value } = e.target;
    // const list = [...firstName];
    // list[i][name] = value;
    // setFirstName(list);
  }
  const showDetails=(element)=>{
    let animalType =element.getAttribute("data-animal-type");
    console.log(animalType)
  }
  
  const addList = () => {
    const testArr = [];
    let randnum = randomNumberInRange(1, 100);
    let countofinput = 0;
    let number = inputValue;
    let numberDDf = inputValueDDF;
    let numberCheck = inputValueCheck;
    let numberDate = parseInt(inputValueDate);
    if(inputValueDate==""){
      numberDate = 0;
    }
    if(numberCheck==""){
      numberCheck = 0;
    }
    if(numberDDf==""){
      numberDDf = 0;
    }
    if(number==""){
      number = 0;
    }
    console.log(numberDate);
    let countLebel =number + numberDDf + numberCheck + numberDate;
 console.log(typeof(inputValueDate))
    const placeBox = document.getElementsByName(`box${countofinput}`);

    var placeBoxId = document.getElementById(`box${countofinput}`);

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
                // id=""
                name="L"
                label="Enter label"
                variant="standard"
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
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id={`exampleModal${i}Label`}>
                        What you like to replace this field with?
                      </h5>
                      <button type="button" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
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
                              id={`select${countofinput}`}
                              class="form-select"
                              className="w-[100%]"
                              aria-label="Default select example"
                              placeholder={test(`box${countofinput}`)}
                              required
                              name={`box${countofinput}`}
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
                          console.log(e)
                          replaceFieldColumn(e, i);
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


  if(array.length<1){
    for (let i = 0; i < number; i++) {   
      testArr.push([
        <td
          class={`dropTh${countofinput} border`}
          draggable="false"
          id={`item${randnum}${countofinput}${i}`}
        >
          <div
            draggable="false"
            className="d-flex justify-content-between align-items-center"
          >
           {replaceFunction('input',countofinput) }
            <input
              type="text"
              draggable="false"
              id={`input${randnum}${countofinput}`}
              size="small"
              style={{ marginTop: "3px" }}
              placeholder={test(`box${countofinput}`)}
              className="form-control"
              data-animal-type={`box${countofinput}`}
              name={`box${countofinput}`}
              onclick={(element)=>showDetails(element)}
              onChange={(e) =>{
                for(let i=0;i<array.length;i++){
                  handleInputValue(e,i)
                  // showDetails(e)
                }
               
              }
              }
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
      ]);
      countofinput = countofinput + 1;
    }
    for (var i = 0; i < numberDDf; i++) {
      testArr.push([
        <td
          class={`dropTh${countofinput} border`}
          draggable="false" //change dragable true to work again
          id={`item${randnum}${countofinput}${i}`}
        >
          
          <div draggable="false">
          {replaceFunction('dropdown',i) }
            <Select
              id={`select${countofinput}`}
              class="form-select"
              className="w-[100%]"
              aria-label="Default select example"
              placeholder={test(`box${countofinput}`)}
              required
              name={`box${countofinput}`}
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
      countofinput = countofinput + 1;
    }
    for (var i = 0; i < numberCheck; i++) {
      testArr.push([
        <td
          class={`dropTh${countofinput} border`}
          draggable="false" //change dragable true to work again
          id={`item${randnum}${countofinput}${i}`}
        >
          <div draggable="false">
          {replaceFunction('checkbox',i)}
            <FormGroup>
              <FormControlLabel
                name={`box${countofinput}`}
                id={`check${countofinput}`}
                style={{ marginTop: "3px" }}
                control={<Checkbox defaultChecked />}
                label="Label"
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
      ]);
      countofinput = countofinput + 1;
    }
    for (var i = 0; i < numberDate; i++) {
      testArr.push([
        <td
          class={`dropTh${countofinput} border`}
          draggable="false" //change dragable true to work again
          id={`item${randnum}${countofinput}${i}`}
        >
          <div draggable="false">
          {replaceFunction('date',i) }
            <TextField
            name={`box${countofinput}`}
            id={`date${countofinput}`}
              type="date"
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
      countofinput = countofinput + 1;
    }
  }
  else{
    for(var countreplaceTemp = 0;countreplaceTemp<replacetempArray.length;countreplaceTemp++){
      if(replacetempArray[countreplaceTemp]=="input"){
        console.log(countreplaceTemp)
        testArr.push([
          <td
            class={`dropTh${countofinput} border`}
            draggable="false" //change dragable true to work again
            id={`item${randnum}${countofinput}${countreplaceTemp}`}
          >
            <div
              draggable="false"
              className="d-flex justify-content-between align-items-center"
            >
              <input
                type="text"
                draggable="false"
                id={`input${randnum}${countofinput}`}
                size="small"
                style={{ marginTop: "3px" }}
                placeholder={test(`box${countofinput}`)}
                className="form-control"
                name={`box${countofinput}`}
                data-animal-type={`box${countofinput}`}
                onclick={(element)=>showDetails(element)}
                onChange={(e) =>{
                  for(let i=0;i<array.length;i++){
                    handleInputValue(e,i)
                    // showDetails(e)
                  }
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
          </td>
        ]);
        countofinput = countofinput + 1;
      }
      else if(replacetempArray[countreplaceTemp]=='dropdown'){
        testArr.push([
          <td
            class={`dropTh${countofinput} border`}
            draggable="false" //change dragable true to work again
            id={`item${randnum}${countofinput}${countreplaceTemp}`}
          >
            <div draggable="false">
              <Select
                id={`select${countofinput}`}
                class="form-select"
                className="w-[100%]"
                aria-label="Default select example"
                placeholder={test(`box${countofinput}`)}
                required
                name={`box${countofinput}`}
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
        countofinput = countofinput + 1;
      }
      else if(replacetempArray[countreplaceTemp]=='checkbox'){
        testArr.push([
          <td
            class={`dropTh${countofinput} border`}
            draggable="false" //change dragable true to work again 
            id={`item${randnum}${countofinput}${countreplaceTemp}`}
          >
            <div draggable="false">
              <FormGroup>
                <FormControlLabel
                  name={`box${countofinput}`}
                  id={`check${countofinput}`}
                  style={{ marginTop: "3px" }}
                  control={<Checkbox defaultChecked />}
                  label="Label"
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
          </td>
          //add else if condition for date
        ]);
        countofinput = countofinput + 1;
      }
      else if(replacetempArray[countreplaceTemp]=='date'){
        testArr.push([
          <td
            class={`dropTh${countofinput} border`}
            draggable="false" //change dragable true to work again
            id={`item${randnum}${countofinput}${i}`}
          >
            <div draggable="false">
              <TextField
              name={`box${countofinput}`}
              id={`date${countofinput}`}
                type="date"
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
        countofinput = countofinput + 1;
      }
    }
  }
  
  console.log(replacetempArray)
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

  return (
    <Grid>
      {opens == true ? (
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
                let a = 0;
                if (e.target.value == "") {
                  a = 0;
                } else {
                  a = parseInt(e.target.value);
                  console.log(typeof(a))
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
                let c = 0;
                if (e.target.value == "") {
                  c = 0;
                } else {
                  c = parseInt(e.target.value);
                  console.log(typeof(c))
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
                let d = 0;
                if (e.target.value == "") {
                  d = 0
                } else {
                  d = parseInt(e.target.value);
                  console.log(typeof(d))
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
      ) : (
        <Grid style={{ margin: "50px" }}>
          <Formik
            initialValues={{}}
            render={({ values, setFieldValue }) => (
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
                <Button variant="contained" type="submit">
                  Save
                </Button>

                <Button
                  type="button"
                  variant="contained"
                  style={{ marginLeft: "5px", background: "indigo" }}
                  onClick={addList}
                >
                  Add row
                </Button>

                <br />
                <FieldArray
                  render={(arrayHelpers) => {
                    return (
                      <>
                        <table class="table  mt-4">
                          <thead className="border ">
                            <tr>
                              {testArray.map((item, i) => {
                                return item;
                              })}
                              <th scope="col">Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {array.map((item, index) => {
                              return (
                                <tr
                                  key={index}
                                  id={index}
                                  class="border table-primary"
                                >
                                  <td style={{ display: "none" }}>
                                    <label className="table-index">
                                      {index}
                                    </label>
                                  </td>
                                  {item}
                                  <td class="border">
                                    <Button
                                      variant="contained"
                                      style={{
                                        background: "red",
                                        marginTop: "3px",
                                        borderRadius: "50px",
                                        textAlign: "center",
                                      }}
                                      onClick={(e) => {
                                        const parentDiv =
                                          e.target.parentNode.parentNode;
                                        const label =
                                          parentDiv.querySelector("label"); // Replace with appropriate selector based on class or id
                                       
                                        // const labelText = label.textContent;
                                        const itemList = [...array];
                                        itemList.splice(
                                          parseInt(label.innerHTML),
                                          1
                                        );
                                        setArray(itemList);
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
            )}
          ></Formik>
        </Grid>
      )}
    </Grid>
  );
};

export default SingleEntryForm;
