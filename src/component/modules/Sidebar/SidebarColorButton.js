import React from "react";
import "./SidebarColorButton.css";
import SidebarHiddenButton from "./SidebarHiddenButton";
const SidebarColorButton = ({setColorBlue,setColorOrange,setColorLightgray,setShowSidebar}) => {
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
        
        <button className="btn-orange" onClick={() => {handleBackgroundOrange()}}></button>
        <button className="btn-blue ms-2" onClick={() => {handleBackgroundBlue()}}></button>
        <button className="btn-lightgray ms-2" onClick={() => {handleBackgroundLightgray()}}></button>
      </div>
    </div>
  );
};

export default SidebarColorButton;
