import React, { useState } from "react";
import "./HeaderButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import HeaderHiddenButton from "./HeaderHiddenButton";
import Picker from "../../ColorPicker/Picker";
import FontColorPicker from "../../ColorPicker/FontColorPicker";
const Header = ({showHeader, setShowHeader, }) => {
  const [backgroundColor, setBackgroundColor] = useState(false);
  const [fontColor,setFontColor]=useState(false)
  const [fontColorBtn,setFontColorBtn]=useState(false)
  const [currentColor, setCurrentColor] = useState("#D0021B")
  const handleBackground = () => {
    setBackgroundColor(!backgroundColor);
    sessionStorage.setItem("headerBackgroundColor",currentColor.hex)
  };
const handleFontColor=()=>{
setFontColorBtn(!fontColorBtn)
}

  return (
    <nav
      className={`main-header navbar navbar-expand navbar-white navbar-light`}
      style={{backgroundColor:`${currentColor.hex}`}}
    >
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className= "nav-link"
            data-widget="pushmenu"
            href="#"
            role="button"
            style={{color:`${fontColor.hex}`}}
          >
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a
            href=""
            className="nav-link"
            style={{
            fontWeight:'bold',
            color:`${fontColor.hex}`
            }}
          >
            Home
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a
            href="#"
            className= "nav-link"
            style={{fontWeight:'bold',color:`${fontColor.hex}`}}
          >
            Contact
          </a>
        </li>
      </ul>
      
      {/* Right navbar links */}
      <ul className="navbar-nav">
      <button
        className="btn-orange text-white"
        data-toggle="tooltip" data-placement="top" title="Background Color"
        onClick={() => {
          handleBackground();
        }}
      >{backgroundColor? (<FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>) : (<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>)}{backgroundColor ? (<Picker
        currentColor={currentColor}
         setCurrentColor={setCurrentColor}
      ></Picker>):''} </button>
      </ul>
      <ul className="navbar-nav ms-2">
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
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <button className="btn badge badge-danger navbar-badge bg-transparent w-44 text-dark">
              <img src="" className="w-6 h-6 mx-auto" alt="" />
              <span className="ml-2 fs-5" style={{color:`${fontColor.hex}`}}>UserName</span>
            </button>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <button
              onClick={() => localStorage.clear()}
              className="w-full text-left"
            >
              <a className="dropdown-item" href="/password">
                Change Password
              </a>
              <a className="dropdown-item" href="/password">
                Logout
              </a>
            </button>
          </div>
        </li>
        <HeaderHiddenButton
          showHeader={showHeader}
          setShowHeader={setShowHeader}
        ></HeaderHiddenButton>
        
      </ul>
    </nav>
  );
};

export default Header;
