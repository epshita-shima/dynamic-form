import React, { useState } from "react";
import "./HeaderButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import HeaderHiddenButton from "./HeaderHiddenButton";
const Header = ({showHeader,setShowHeader}) => {
  const [colorOrange, setColorOrange] = useState(false);
  const [colorBLue, setColorBlue] = useState(false);
  const [colorLightgray, setColorLightgray] = useState(false);

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
    <div>
      <nav
        className={`main-header navbar navbar-expand navbar-white navbar-light ${
          colorOrange ? "changeColor" : ""
        } ${colorBLue ? "changeColorBlue" : ""} ${colorLightgray? "changeColorLightgray" : ""}`}
      >
        {/* Left navbar links */}
        <button
          className="btn-orange"
          onClick={() => {
            handleBackgroundOrange();
          }}
        ></button>
        <button
          className="btn-blue"
          onClick={() => {
            handleBackgroundBlue();
          }}
        ></button>
        <button
          className="btn-lightgray"
          onClick={() => {
            handleBackgroundLightgray();
          }}
        ></button>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className={` ${colorBLue ? 'colorWhite':'nav-link'}`}
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="index3.html"className={` ${colorBLue ? 'colorWhite':'nav-link'}`}>
              Home
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className={` ${colorBLue ? 'colorWhite':'nav-link'}`}>
              Contact
            </a>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
       
        <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown"  href="#">
              <button className="btn border-[#581C87] badge badge-danger navbar-badge bg-transparent w-44 mt-[-10px]"> 
              <img
                  src=''
                  className="w-6 h-6 mx-auto"
                  alt=""
                />
                <span className="ml-2 fs-3 text-dark">UserName</span></button>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">   
           <button onClick={()=>localStorage.clear()} className='w-full text-left' > 
            <a className="dropdown-item" href="/password">Change Password</a>
            <a className="dropdown-item" href="/password">Logout</a>
            </button>
            </div>
          </li>
        <HeaderHiddenButton
        showHeader={showHeader}
        setShowHeader={setShowHeader}
        ></HeaderHiddenButton>
          
          
        </ul>
      </nav>
      
    </div>
  );
};

export default Header;
