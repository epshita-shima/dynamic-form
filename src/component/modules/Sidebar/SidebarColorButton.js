import React from "react";
import "./SidebarColorButton.css";
import SidebarHiddenButton from "./SidebarHiddenButton";
import Picker from "../../ColorPicker/Picker";
const SidebarColorButton = ({colorOrange,setColorBlue,setColorOrange,setColorLightgray,setShowSidebar,currentColor, setCurrentColor}) => {
    const handleBackgroundOrange = () => {
        setColorOrange(true);
        setColorLightgray(false);
        setColorBlue(false)
      };
      const handleBackgroundBlue = () => {
        setColorBlue(true);
        setColorLightgray(false)
        setColorOrange(false)
      };
      const handleBackgroundLightgray = () => {
        setColorLightgray(true);
        setColorBlue(false)
        setColorOrange(false)
      };
  return (
    <div className="box-position">
      {
          <SidebarHiddenButton 
          setShowSidebar={setShowSidebar}
          ></SidebarHiddenButton>
        }
      <div className="box ms-2">
        
        <button className="btn-orange" onClick={() => {handleBackgroundOrange()}}>{colorOrange? (<Picker currentColor={currentColor} setCurrentColor={setCurrentColor}></Picker>):''}</button>
        <button className="btn-blue ms-2" onClick={() => {handleBackgroundBlue()}}></button>
        <button className="btn-lightgray ms-2" onClick={() => {handleBackgroundLightgray()}}></button>
      </div>
    </div>
  );
};

export default SidebarColorButton;
