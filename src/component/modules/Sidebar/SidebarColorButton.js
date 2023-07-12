import React from "react";
import "./SidebarColorButton.css";
import SidebarHiddenButton from "./SidebarHiddenButton";
import Picker from "../../ColorPicker/Picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import FontColorPicker from "../../ColorPicker/FontColorPicker";
const SidebarColorButton = ({colorOrange,setColorOrange,setShowSidebar,
  backgroundColor, 
  setBackgroundColor,
  fontColor,
  setFontColor,
  fontColorBtn,
  setFontColorBtn,
  currentColor,setCurrentColor}) => {
    const handleBackground = () => {
      setBackgroundColor(!backgroundColor);
      sessionStorage.setItem("sidebarBackgroundColor",currentColor.hex)
      };
      const handleFontColor=()=>{
        setFontColorBtn(!fontColorBtn)
        }
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
        data-toggle="tooltip" data-placement="top" title="Background Color"
        onClick={() => {
          handleBackground();
        }}
      >{backgroundColor? (<FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>) : (<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>)}{backgroundColor ? (<Picker
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
      ></Picker>):''} 
      </button>
      <button
        className="btn-orange text-white"
        data-toggle="tooltip" data-placement="top" title="Text Color"
        onClick={() => {
          handleFontColor();
        }}
      >{fontColorBtn? (<FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>) : (<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>)}{fontColorBtn ? (<FontColorPicker
      backgroundColor={backgroundColor}
        fontColor={fontColor}
        setFontColor={setFontColor}
      ></FontColorPicker>):''} </button>
      </div>
    </div>
  );
};

export default SidebarColorButton;
