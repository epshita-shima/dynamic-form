import { Button } from '@mui/material';
import React from 'react'
import { Modal } from 'react-bootstrap';


const Show_Modal_For_Value_Selection_After_The_Table_Modal_Select_For_Child = ({show2,setShow2,selectedListName,handleErrorClose,dropdownName,currentDropSelected,setRadioButton,radioButton,allModelDataTable,allDropValueData,setSelectedOption}) => {
    const handleDropdown = (i) => {
        let radioName = 0;
        if (
          document.querySelector('input[name="dropValueFieldCheck"]:checked') !=
          null
        ) {
          radioName = document.querySelector(
            'input[name="dropValueFieldCheck"]:checked'
          ).value;
        }
        setRadioButton([...radioButton, radioName]);
        var dataTable = [];
        for (var modelArrayPosition in allModelDataTable)
          dataTable.push([
            modelArrayPosition,
            allModelDataTable[modelArrayPosition],
          ]);
        var dataMenuArr = [];
        dataTable.map((element) => {
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
            var allDropValueDataLength = 0;
            if (allDropValueData != null) {
              allDropValueDataLength = Object.keys(allDropValueData).length;
            }
          });
          // }
        });
        setSelectedOption((prev) => {
          const temp__details = [...prev];
          temp__details[i] = dataMenuArr;
          return temp__details;
        });
      };
    
  return (
    <div>
       <Modal show={show2} onHide={() => setShow2(false)}>
          <Modal.Header>
            <Modal.Title>{selectedListName}</Modal.Title>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              onClick={handleErrorClose}
            >
              X
            </button>
          </Modal.Header>
          {/* <Modal.Header closeButton>
           
          </Modal.Header> */}
          <Modal.Body>
            {dropdownName.map((item, i) => {
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
                    <h4 className="text-black ms-2 fs-5">{item.ColumnName}</h4>
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

export default Show_Modal_For_Value_Selection_After_The_Table_Modal_Select_For_Child 
