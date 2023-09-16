import React from 'react'
import { Modal } from 'react-bootstrap';
import Select from "react-select";

const ChildCalculationModal = ({showCalculactionModalDetails,handleCloseDetails,setCalculationTypeDetails,setDisplayFormulaAutoDetails,displayFormulaAutoDetails,allInputValueForFormulaDataDetails,pageFormulaDetails,setField1ValidationDetails,field1ValidationDetails,setFieldFormulaValidationDetails,fieldFormulaValidationDetails,setField2ValidationDetails,field2ValidationDetails,setFieldTargetValidationDetails,setFormulaTargetDetails,fieldTargetValidationDetails,submitForm}) => {
  return (
    <div>
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
    </div>
  )
}

export default ChildCalculationModal
