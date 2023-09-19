import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Token from "../../common/Token";

const ShowModalForTableSelectionInTheDropDown = ({
  showParentDropDownModal,
  handleParentModalDropClose,
  parentModalSpecificData,
  setShow2,
  currentParentDropSelected,
  setParentModalTitle,
  setParentAllModelDataTable,
  setAllParentDropValueData,
  allParentDropValueData,
  setParentTableValue,
  setShowParentDropDownModal,
}) => {
  const [menuId, setMenuId] = useState("");
  const token = Token.token;

  const handleDropdownValue = (i) => {
    console.log(document.querySelector('input[name="dropValueField"]:checked'));
    var radioName = 0;
    console.log(radioName);
    if (
      document.querySelector('input[name="dropValueField"]:checked') != null
    ) {
      radioName = document.querySelector(
        'input[name="dropValueField"]:checked'
      ).value;
    }
    console.log(radioName);
    setParentModalTitle(radioName);
    let newString = radioName.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const convertLowerCase = spaceRemove.toLowerCase();
    let tableName = convertLowerCase;

    const modelDataLabel = {
      procedureName: "",
      parameters: {
        TableName: "",
      },
    };
    modelDataLabel.procedureName = "prc_GetMasterInfoList";
    modelDataLabel.parameters.TableName = `${tableName}`;
    fetch("https://localhost:44372/api/GetData/GetDataByID", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(modelDataLabel),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == true) {
          const allModalData = JSON.parse(data.data);
          console.log(allModalData);
          setParentAllModelDataTable(allModalData);

          setAllParentDropValueData({
            ...allParentDropValueData,
            [i]: radioName,
          });
        } else {
          console.log(data);
        }
      });
    const modelData = {
      procedureName: "prc_GetPageInfo",
      parameters: {
        MenuId: menuId,
      },
    };
    fetch(`https://localhost:44372/api/GetData/GetMultipleDataByParam`, {
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
          console.log(data);
          const showSingleData = JSON.parse(data.data);
          setParentTableValue(showSingleData.Tables1);
        }
      });
    setShowParentDropDownModal(false);
  };
  return (
    <div>
      <Modal
        show={showParentDropDownModal}
        onHide={handleParentModalDropClose}
        backdrop="true"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="text-black fw-bold">Select Menu</Modal.Title>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            onClick={handleParentModalDropClose}
          >
            X
          </button>
        </Modal.Header>

        <Modal.Body>
          {parentModalSpecificData
            .filter((person) => person.MenuName === "Master Entry")
            .map((filteredPerson) => (
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input
                      type="radio"
                      value={filteredPerson.SubMenuName}
                      name="dropValueField"
                      aria-label="Radio button for following text input"
                      onClick={(e) => {
                        setMenuId(filteredPerson.MenuId);
                      }}
                    />
                  </div>
                </div>
                <h4 className="text-black ms-2 fs-5">
                  {filteredPerson.SubMenuName}
                </h4>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <button
            style={{ backgroundColor: "#34C38F", border: "none" }}
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            aria-label="Close"
            onClick={(e) => {
              handleDropdownValue(currentParentDropSelected);
              setShow2(true);
            }}
          >
            Save changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowModalForTableSelectionInTheDropDown;
