import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Header from "./Header";

const HeaderButton = ({showHeader,setShowHeader}) => {
 
  return (
    <div>
      {showHeader ? (
        <Header
        showHeader={showHeader}
        setShowHeader={setShowHeader}
        ></Header>
      ) : (
        <div className="d-flex justify-content-center pt-2">
          <FontAwesomeIcon
            icon={faPlus}
            className="bg-primary rounded fs-4 p-2"
            onClick={() => {
              setShowHeader(true);
            }}
          ></FontAwesomeIcon>
        </div>
      )}
    </div>
  );
};

export default HeaderButton;
