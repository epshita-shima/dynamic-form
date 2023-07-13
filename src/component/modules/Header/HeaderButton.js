import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Header from "./Header";

const HeaderButton = ({showHeader,setShowHeader, backgroundColor, 
  setBackgroundColor,
  fontColor,
  setFontColor,
  fontColorBtn,
  setFontColorBtn,
  currentColor,
  setCurrentColor,
  headerBackgroundColor}) => {
 
  return (
    <div>
      {showHeader ? (
        <Header
        headerBackgroundColor={headerBackgroundColor}
        backgroundColor={backgroundColor} 
        setBackgroundColor={setBackgroundColor}
        fontColor={fontColor}
        setFontColor={setFontColor}
        fontColorBtn={fontColorBtn}
        setFontColorBtn={setFontColorBtn}
        currentColor={currentColor} 
        setCurrentColor={setCurrentColor}
        showHeader={showHeader}
        setShowHeader={setShowHeader}
        ></Header>
      ) : (
        <div className="d-flex justify-content-center pt-2" data-toggle="tooltip" data-placement="top" title="Open Header">
          <FontAwesomeIcon
            icon={faPlus}
            className="text-white fs-4 p-2"
            style={{backgroundColor:'#FFC300',width:"30px",height:'30px', borderRadius:'50px'}}
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
