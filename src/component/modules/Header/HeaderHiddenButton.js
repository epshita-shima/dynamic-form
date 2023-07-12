import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const HeaderHiddenButton = ({ showHeader, setShowHeader }) => {
  return (
    <div className="d-flex justify-content-center pt-2" data-toggle="tooltip" data-placement="top" title="Close Header">
      <FontAwesomeIcon
        icon={faMinus}
        className="text-white fs-4 p-2"
            style={{backgroundColor:'#FFC300',width:"20px",height:'20px', borderRadius:'50px'}}
        onClick={() => {
          setShowHeader(false);
        }}
      ></FontAwesomeIcon>
    </div>
  );
};

export default HeaderHiddenButton;
