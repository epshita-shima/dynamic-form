import React from "react";
import "./SidebarColorButton.css";
import SidebarHiddenButton from "./SidebarHiddenButton";
import Picker from "../../ColorPicker/Picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import FontColorPicker from "../../ColorPicker/FontColorPicker";
import { SketchPicker } from "react-color";
const SidebarColorButton = ({
  setShowSidebar,
  backgroundColor,
  setBackgroundColor,
  fontColor,
  setFontColor,
  fontColorBtn,
  setFontColorBtn,
  currentColor,
  setCurrentColor,
}) => {
  const handleBackground = () => {
    setBackgroundColor(!backgroundColor);
  };
  const handleFontColor = () => {
    setFontColorBtn(!fontColorBtn);
  };
  const handleBackgroundComplete = (color) => {
    setCurrentColor(color);
    sessionStorage.setItem("sidebarBackgroundColor", color.hex);
    sessionStorage.setItem("sidebarBackground", 1);
  };
  const handleChangeComplete = (color) => {
    setFontColor(color);
    sessionStorage.setItem("sidebarTextColor", color.hex);
    sessionStorage.setItem("sidebarText", 1);
  };

  return (
    <div className="box-position">
      {
        <SidebarHiddenButton
          setShowSidebar={setShowSidebar}
        ></SidebarHiddenButton>
      }
      <div className="box ms-2">
        <button
          className="btn-orange text-white"
          data-toggle="tooltip"
          data-placement="top"
          title="Background Color"
          onClick={() => {
            handleBackground();
          }}
        >
          {backgroundColor ? (
            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          )}
          {backgroundColor ? (
           <div className="d-flex justify-content-center mt-4">
           <div>
             <SketchPicker
               color={currentColor}
               onChangeComplete={handleBackgroundComplete}
             />
           </div>
         </div>
          ) : (
            ""
          )}
        </button>
        <button
          className="btn-orange text-white"
          data-toggle="tooltip"
          data-placement="top"
          title="Text Color"
          onClick={() => {
            handleFontColor();
          }}
        >
          {fontColorBtn ? (
            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          )}
          {fontColorBtn ? (
           <div className="d-flex justify-content-center mt-4">
           <div>
             <SketchPicker
               color={fontColor}
               onChangeComplete={handleChangeComplete}
             />
           </div>
         </div>
          ) : (
            ""
          )}{" "}
        </button>
      </div>
    </div>
  );
};

export default SidebarColorButton;
