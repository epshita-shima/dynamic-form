import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
const CalculationModalChild = ({
  showCalculactionModal,
  handleClose,
  setCalculationType,
  allInputValueForFormulaData,
  pageFormula,
  displayFormulaAuto, 
  setDisplayFormulaAuto,
  setField1Validation,
  field1Validation,
  setFieldFormulaValidation,
  fieldFormulaValidation,
  setField2Validation,
  field2Validation,
  setFieldTargetValidation,
  setFormulaTarget,
  fieldTargetValidation,
  submitForm,
}) => {
 
  return (
    <div>
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
              displayFormulaAuto ? "display-show" : "dispaly-hidden"
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
                options={allInputValueForFormulaData}
                id={`dropValueField1`}
                onChange={(e) => {
                  let fieldName = e.value;
                  let newString = fieldName.replace("-", "_");
                  const spaceRemove = newString.split(" ").join("");
                  const fieldNameLowerCase = spaceRemove.toLowerCase();
                  if (
                    pageFormula[0]["Formula"][0]["Field2"] == fieldNameLowerCase
                  ) {
                    setField1Validation(0);
                  } else if (pageFormula[0]["Target"] == fieldNameLowerCase) {
                    setField1Validation(0);
                  } else {
                    setField1Validation(1);
                    pageFormula[0]["Formula"][0]["Field1"] = fieldNameLowerCase;
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
                  if (
                    pageFormula[0]["Formula"][0]["Field1"] == fieldNameLowerCase
                  ) {
                    setField2Validation(0);
                  } else if (pageFormula[0]["Target"] == fieldNameLowerCase) {
                    setField2Validation(0);
                  } else {
                    setField2Validation(1);
                    pageFormula[0]["Formula"][0]["Field2"] = fieldNameLowerCase;
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
                  if (
                    pageFormula[0]["Formula"][0]["Field1"] == fieldNameLowerCase
                  ) {
                    setFieldTargetValidation(0);
                  } else if (
                    pageFormula[0]["Formula"][0]["Field2"] == fieldNameLowerCase
                  ) {
                    setFieldTargetValidation(0);
                  } else {
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
    </div>
  );
};

export default CalculationModalChild;
