import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Select from "react-select";
import Token from "../../../common/Token";

const Dropdown = ({
  name,
  selectedOptionParent,
  parentErrorsDropDown,
  setParentModalSpecificData,
  setCurrentParentDropSelected,
  setShowParentDropDownModal
}) => {
  const token = Token.token;
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
          console.log(allModalData);
          setParentModalSpecificData(allModalData.Tables2);
        } else {
          console.log(data);
        }
      });
  };

  return (
    <div className="d-flex align-items-center">
      <div className="w-100">
        <Select
          class="form-select w-100"
          className="w-[100%] mt-2"
          name={`drop${name}`}
          aria-label="Default select example"
          options={selectedOptionParent[name]}
          id={`dropValue${name}`}
          onChange={(e) => {}}
          required
        ></Select>
        {parentErrorsDropDown
          .filter((err) => err.index === name)
          .map((err, i) => (
            <div style={{ color: "#FF0000" }} key={i}>
              This Field is required
            </div>
          ))}
      </div>
      <div className="ms-2">
        <FontAwesomeIcon
          icon={faPlusCircle}
          className="footerColor"
          data-toggle="modal"
          data-target={`#exampleModal${name}`}
          data-id={name}
          onClick={() => {
            handleModalMenu();
            setCurrentParentDropSelected(name);
            setShowParentDropDownModal(true);
          }}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default Dropdown;
