import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const HeaderHiddenButton = ({ showHeader, setShowHeader }) => {
  return (
    <div className="d-flex justify-content-center pt-2">
      <FontAwesomeIcon
        icon={faMinus}
        className="bg-primary rounded fs-4 p-2"
        onClick={() => {
          setShowHeader(false);
        }}
      ></FontAwesomeIcon>
    </div>
  );
};

export default HeaderHiddenButton;
