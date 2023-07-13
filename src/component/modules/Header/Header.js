import React, { useState } from "react";
import "./HeaderButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import HeaderHiddenButton from "./HeaderHiddenButton";
import Picker from "../../ColorPicker/Picker";

import { SketchPicker } from "react-color";
const Header = ({ showHeader, setShowHeader }) => {
 
  const [backgroundColors, setBackgroundColors] = useState(false);
  const [fontColor, setFontColor] = useState(false);
  const [fontColorBtn, setFontColorBtn] = useState(false);
  const [currentColor, setCurrentColor] = useState("#D0021B");
  const headerBackground = sessionStorage.getItem("headerBackground");
  const headerText = sessionStorage.getItem("headerText");
  const getHeaderTextColor = sessionStorage.getItem("headerTextColor");
const headerBackgroundColor=sessionStorage.getItem('headerBackgroundColor')
  console.log(currentColor.hex)

  const handleBackground = () => {
    setBackgroundColors(!backgroundColors);
  };

  const handleFontColor = () => {
    setFontColorBtn(!fontColorBtn);
  };

  const handleChangeComplete = (color) => {
    setFontColor(color);
    sessionStorage.setItem("headerTextColor", color.hex);
    sessionStorage.setItem("headerText", 1);
  };
  const handleBackgroundComplete = (color) => {
    setCurrentColor(color);
    sessionStorage.setItem("headerBackgroundColor", color.hex);
    sessionStorage.setItem("headerBackground", 1);
  };
  return (
    <nav
      className={`main-header navbar navbar-expand  headerColor`}
      style={{
        backgroundColor:
          headerBackground == "1"
            ? `${headerBackgroundColor}`
            : `${currentColor.hex}`,
      }}
    >
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link hearderTextColor"
            data-widget="pushmenu"
            href="#"
            role="button"
            style={{
              color:
                headerText == "1"
                  ? `${getHeaderTextColor}`
                  : `${fontColor.hex}`,
            }}
          >
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a
            href=""
            className="nav-link hearderTextColor"
            style={{
              fontWeight: "bold",
              color:
                headerText == "1"
                  ? `${getHeaderTextColor}`
                  : `${fontColor.hex}`,
            }}
          >
            Home
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a
            href="#"
            className="nav-link hearderTextColor"
            style={{
              fontWeight: "bold",
              color:
                headerText == "1"
                  ? `${getHeaderTextColor}`
                  : `${fontColor.hex}`,
            }}
          >
            Contact
          </a>
        </li>
      </ul>

      {/* Right navbar links */}
      <ul className="navbar-nav">
        <button
          className="btn-orange text-white"
          data-toggle="tooltip"
          data-placement="top"
          title="Background Color"
          onClick={() => {
            handleBackground();
          }}
        >
          {backgroundColors ? (
            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          )}
          {backgroundColors ? (
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
      </ul>
      <ul className="navbar-nav ms-2">
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
            <FontAwesomeIcon icon={faPlus} onClick={() => {}}></FontAwesomeIcon>
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
          )}
        </button>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <button className="btn badge badge-danger navbar-badge bg-transparent w-44 headerColor">
              <img src="" className="w-6 h-6 mx-auto" alt="" />
              <span
                className="ml-2 fs-5"
                style={{
                  color:
                    headerText == "1"
                      ? `${getHeaderTextColor}`
                      : `${fontColor.hex}`,
                }}
              >
                UserName
              </span>
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
