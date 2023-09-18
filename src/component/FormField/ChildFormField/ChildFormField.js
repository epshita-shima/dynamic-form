import React from "react";
import ChildTextField from "./ChildTextField";
import ChildDropdownField from "./ChildDropdownField";
import ChildCheckboxField from "./ChildCheckboxField";
import ChildDateField from "./ChildDateField";
import ChildTextareaField from "./ChildTextareaField";
import ChildImageField from "./ChildImageField";
import TextFields from "./DynamicFieldForChildComponent/TextFields";
import Dropdown from "./DynamicFieldForChildComponent/Dropdown";
import Checkbox from "./DynamicFieldForChildComponent/Checkbox";
import DateField from "./DynamicFieldForChildComponent/DateField";
import TextareaField from './DynamicFieldForChildComponent/TextareaField';
import ImageField from './DynamicFieldForChildComponent/ImageField';

const ChildFormField = ({
  inputValue,
  setAllInputValueData,
  setInputValue,
  inputValueDDF,
  setAllDropValueData,
  setInputValueDDF,
  inputValueCheck,
  setAllCheckValueData,
  setInputValueCheck,
  inputValueDate,
  setAllDateValueData,
  setInputValueDate,
  inputValueTextArea,
  setAllTextAreaValueData,
  setInputValueTextArea,
  inputValueImage,
  setAllImageValueData,
  setInputValueImage,
  inputData,
  allInputValueData,
  allInputValueForFormulaData,
  setAllInputValueForFormulaData,
  errorsInput,
  dropdownData,
  selectedOption,
  errorsDropDown,
  setModalSpecificData,
  setCurrentDropSelected,
  setShowDropDownModal,
  checkboxData,
  allCheckValueData,
  setAllData,
  allData,
  errorsCheck,
  dateData,
  allDateValueData,
  errorsDate,
  textareaData,
  allTextAreaValueData,
  errorsTextarea,
  imageData,
  allImageValueData,
  errorsImage,
}) => {
  return (
    <div class="row shadow-lg pt-4 pb-4">
      <div class="col">
        <ChildTextField
          inputValue={inputValue}
          setAllInputValueData={setAllInputValueData}
          setInputValue={setInputValue}
        ></ChildTextField>
      </div>
      <div class="col">
        <ChildDropdownField
          inputValueDDF={inputValueDDF}
          setAllDropValueData={setAllDropValueData}
          setInputValueDDF={setInputValueDDF}
        ></ChildDropdownField>
      </div>
      <div class="col">
        <ChildCheckboxField
          inputValueCheck={inputValueCheck}
          setAllCheckValueData={setAllCheckValueData}
          setInputValueCheck={setInputValueCheck}
        ></ChildCheckboxField>
      </div>
      <div class="col">
        <ChildDateField
          inputValueDate={inputValueDate}
          setAllDateValueData={setAllDateValueData}
          setInputValueDate={setInputValueDate}
        ></ChildDateField>
      </div>
      <div class="col">
        <ChildTextareaField
          inputValueTextArea={inputValueTextArea}
          setAllTextAreaValueData={setAllTextAreaValueData}
          setInputValueTextArea={setInputValueTextArea}
        ></ChildTextareaField>
      </div>
      <div class="col">
        <ChildImageField
          inputValueImage={inputValueImage}
          setAllImageValueData={setAllImageValueData}
          setInputValueImage={setInputValueImage}
        ></ChildImageField>
      </div>
      <div class="w-100"></div>
            <div class="col">
              {inputData?.map((item, name) => {
                return (
                  <TextFields
                    name={name}
                    allInputValueData={allInputValueData}
                    setAllInputValueData={setAllInputValueData}
                    allInputValueForFormulaData={allInputValueForFormulaData}
                    setAllInputValueForFormulaData={
                      setAllInputValueForFormulaData
                    }
                    errorsInput={errorsInput}
                  ></TextFields>
                );
              })}
            </div>
            <div class="col">
              {dropdownData?.map((item, name) => {
                return (
                  <Dropdown
                    name={name}
                    selectedOption={selectedOption}
                    errorsDropDown={errorsDropDown}
                    setModalSpecificData={setModalSpecificData}
                    setCurrentDropSelected={setCurrentDropSelected}
                    setShowDropDownModal={setShowDropDownModal}
                  ></Dropdown>
                );
              })}
            </div>
            <div class="col">
              {checkboxData?.map((item, name) => {
                return (
                  <Checkbox
                    name={name}
                    allCheckValueData={allCheckValueData}
                    setAllData={setAllData}
                    allData={allData}
                    setAllCheckValueData={setAllCheckValueData}
                    errorsCheck={errorsCheck}
                  ></Checkbox>
                );
              })}
            </div>
            <div class="col">
              {dateData?.map((item, name) => {
                return (
                  <DateField
                    name={name}
                    allDateValueData={allDateValueData}
                    setAllData={setAllData}
                    allData={allData}
                    setAllDateValueData={setAllDateValueData}
                    errorsDate={errorsDate}
                  ></DateField>
                );
              })}
            </div>
            <div class="col">
              {textareaData?.map((item, name) => {
                return (
                  <TextareaField
                    name={name}
                    allTextAreaValueData={allTextAreaValueData}
                    setAllData={setAllData}
                    allData={allData}
                    setAllTextAreaValueData={setAllTextAreaValueData}
                    errorsTextarea={errorsTextarea}
                  ></TextareaField>
                );
              })}
            </div>
            <div class="col">
              {imageData?.map((item, name) => {
                return (
                  <ImageField
                    name={name}
                    allImageValueData={allImageValueData}
                    setAllData={setAllData}
                    allData={allData}
                    setAllImageValueData={setAllImageValueData}
                    errorsImage={errorsImage}
                  ></ImageField>
                );
              })}
            </div>
    </div>
  );
};

export default ChildFormField;
