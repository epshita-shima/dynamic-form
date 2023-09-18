import React from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
const CalculationModal = ({
  showParentCalculactionModal,
  handleParentCalculactionModalClose,
  setParentCalculationType,
  setDisplayParentFormulaAuto,
  displayParentFormulaAuto,
  allParentInputValueForFormulaData,
  parentPageFormula,
  setParentField1Validation,
  parentField1Validation,
  setParentFieldFormulaValidation,
  parentFieldFormulaValidation,
  setParentField2Validation,
  parentField2Validation,
  setParentFieldTargetValidation,
  setParentFormulaTarget,
  parentFieldTargetValidation,
  submitForm,
}) => {
  return (
    <div>
      <Modal
        show={showParentCalculactionModal}
        onHide={handleParentCalculactionModalClose}
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
            onClick={handleParentCalculactionModalClose}
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
                setParentCalculationType(e.value);
                if (e.value == "Auto") {
                  setDisplayParentFormulaAuto(true);
                } else {
                  setDisplayParentFormulaAuto(false);
                }
              }}
            ></Select>
          </div>
          <div
            className={`d-flex justify-content-between ${
              displayParentFormulaAuto ? "display-show" : "dispaly-hidden"
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
                options={allParentInputValueForFormulaData}
                id={`dropValueField1`}
                onChange={(e) => {
                  let fieldName = e.value;
                  let newString = fieldName.replace("-", "_");
                  const spaceRemove = newString.split(" ").join("");
                  const fieldNameLowerCase = spaceRemove.toLowerCase();
                  console.log(e.value, parentPageFormula);
                  if (
                    parentPageFormula[0]["Formula"][0]["Field2"] == fieldNameLowerCase
                  ) {
                    setParentField1Validation(0);
                  } else if (parentPageFormula[0]["Target"] == fieldNameLowerCase) {
                    setParentField1Validation(0);
                  } else {
                    setParentField1Validation(1);
                    parentPageFormula[0]["Formula"][0]["Field1"] = fieldNameLowerCase;
                  }
                }}
              ></Select>

              {parentField1Validation == 0 ? (
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
                  parentPageFormula[0]["Formula"][0]["FormulaType"] = e.value;
                  if (e.value != "") {
                    setParentFieldFormulaValidation(1);
                  } else {
                    setParentFieldFormulaValidation(0);
                  }
                }}
              ></Select>

              {parentFieldFormulaValidation == 0 ? (
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
                options={allParentInputValueForFormulaData}
                id={`dropValueField2`}
                onChange={(e) => {
                  let fieldName = e.value;
                  let newString = fieldName.replace("-", "_");
                  const spaceRemove = newString.split(" ").join("");
                  const fieldNameLowerCase = spaceRemove.toLowerCase();
                  console.log(fieldNameLowerCase);
                  console.log(e.value, parentPageFormula);
                  console.log(e.value);
                  if (
                    parentPageFormula[0]["Formula"][0]["Field1"] == fieldNameLowerCase
                  ) {
                    setParentField2Validation(0);
                  } else if (parentPageFormula[0]["Target"] == fieldNameLowerCase) {
                    setParentField2Validation(0);
                  } else {
                    setParentField2Validation(1);
                    parentPageFormula[0]["Formula"][0]["Field2"] = fieldNameLowerCase;
                  }
                }}
              ></Select>
              {parentField2Validation == 0 ? (
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
                options={allParentInputValueForFormulaData}
                id={`dropValueFieldTarget`}
                onChange={(e) => {
                  let fieldName = e.value;
                  let newString = fieldName.replace("-", "_");
                  const spaceRemove = newString.split(" ").join("");
                  const fieldNameLowerCase = spaceRemove.toLowerCase();
                  console.log(fieldNameLowerCase);
                  if (
                    parentPageFormula[0]["Formula"][0]["Field1"] == fieldNameLowerCase
                  ) {
                    setParentFieldTargetValidation(0);
                  } else if (
                    parentPageFormula[0]["Formula"][0]["Field2"] == fieldNameLowerCase
                  ) {
                    setParentFieldTargetValidation(0);
                  } else {
                    console.log(e.value);
                    setParentFormulaTarget(fieldNameLowerCase);
                    setParentFieldTargetValidation(1);
                    parentPageFormula[0]["Target"] = fieldNameLowerCase;
                  }
                }}
              ></Select>
              {parentFieldTargetValidation == 0 ? (
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
              if (parentPageFormula[0]["Formula"][0]["FormulaType"] == "") {
                setParentFieldFormulaValidation(0);
              }
              if (parentPageFormula[0]["Formula"][0]["Field2"] == "") {
                setParentField1Validation(0);
              }
              if (parentPageFormula[0]["Formula"][0]["Field1"] == "") {
                setParentField1Validation(0);
              }
              if (parentPageFormula[0]["Formula"][0]["FormulaType"] == "") {
                setParentFieldFormulaValidation(0);
              }
              if (parentPageFormula[0]["Formula"][0]["Target"] == "") {
                setParentFieldTargetValidation(0);
              }
              if (
                parentField1Validation != 1 ||
                parentField2Validation != 1 ||
                parentFieldFormulaValidation != 1 ||
                parentFieldTargetValidation != 1
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

export default CalculationModal;
