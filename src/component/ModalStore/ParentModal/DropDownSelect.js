import { Button } from '@mui/material';
import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
const DropDownSelect = ({show2, setShow2,modalTitle,dropdownName,setRadioButton,radioButton,allModelDataTable,allDropValueData,setSelectedOptionParent,currentDropSelected}) => {
    const handleDropdown = (i) => {
        console.log(i);
        let radioName = 0;
        if (
          document.querySelector('input[name="dropValueFieldCheck"]:checked') !=
          null
        ) {
          radioName = document.querySelector(
            'input[name="dropValueFieldCheck"]:checked'
          ).value;
        }
        console.log(radioName);
        setRadioButton([...radioButton, radioName]);
        var dataTable = [];
        console.log(allModelDataTable);
        for (var modelArrayPosition in allModelDataTable)
          dataTable.push([
            modelArrayPosition,
            allModelDataTable[modelArrayPosition],
          ]);
        console.log(dataTable, allModelDataTable);
        var dataMenuArr = [];
        dataTable.map((element) => {
          console.log(element);
    
          // if (element[1][0].title == radioName) {
          element.map((member) => {
            for (var key in member) {
              if (member.hasOwnProperty(key)) {
                if (key != "0") {
                  if (key == radioName) {
                    var dataMenuArrLength = dataMenuArr.length;
                    dataMenuArr[dataMenuArrLength] = {};
                    dataMenuArr[dataMenuArrLength]["value"] = member.ID;
                    var val = member[key];
                    dataMenuArr[dataMenuArrLength]["label"] = val;
                  }
                }
              }
            }
            console.log(dataMenuArr);
            var allDropValueDataLength = 0;
            if (allDropValueData != null) {
              allDropValueDataLength = Object.keys(allDropValueData).length;
              console.log(allDropValueDataLength);
            }
          });
          // }
        });
        setSelectedOptionParent((prev) => {
          console.log(prev);
          const temp__details = [...prev];
          temp__details[i] = dataMenuArr;
          return temp__details;
        });
      };
  return (
    <div>
       <Modal show={show2} onHide={() => setShow2(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {dropdownName?.map((item, i) => {
                console.log(item);
                return (
                  <>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input
                            type="radio"
                            value={item.ColumnName}
                            name="dropValueFieldCheck"
                            aria-label="Radio button for following text input"
                            onClick={(e) => {}}
                          />
                        </div>
                      </div>
                      <h4 className="text-black ms-2 fs-5">
                        {item.ColumnName}
                      </h4>
                    </div>
                  </>
                );
              })}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={(e) => {
                  handleDropdown(currentDropSelected);
                  setShow2(false);
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
    </div>
  )
}

export default DropDownSelect
