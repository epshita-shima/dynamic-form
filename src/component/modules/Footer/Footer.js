import React, { useState } from "react";
import FooterHiddenButon from "./FooterHiddenButon";
import Picker from "../../ColorPicker/Picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import FontColorPicker from "../../ColorPicker/FontColorPicker";
import { SketchPicker } from "react-color";
import "./Footer.css";

const Footer = ({ setShowFooter }) => {
  const [backgroundColor, setBackgroundColor] = useState(false);
  const [colorPickerPosition, setColorPickerPosition] = useState(false);
  const [fontColor, setFontColor] = useState(false);
  const [fontColorBtn, setFontColorBtn] = useState(false);
  const [currentColor, setCurrentColor] = useState("#D0021B");
  const footerBackground = sessionStorage.getItem("footerBackground");
  const footerText = sessionStorage.getItem("footerText");
  const getFooterTextColor = sessionStorage.getItem("footerTextColor");
const footerBackgroundColor=sessionStorage.getItem('footerBackgroundColor')
  const handleBackground = () => {
    setBackgroundColor(!backgroundColor);
    setColorPickerPosition(true);
  };

  const handleFontColor = () => {
    setFontColorBtn(!fontColorBtn);
    setColorPickerPosition(true);
  };
  const handleChangeComplete = (color) => {
    setCurrentColor(color);
    sessionStorage.setItem("footerBackgroundColor", color.hex);
    sessionStorage.setItem("footerBackground", 1);
  };
  const handleChangeFontComplete = (color) => {
    setFontColor(color);
    sessionStorage.setItem("footerTextColor", color.hex);
    sessionStorage.setItem("footerText", 1);
  };

  return (
    <footer
      class={`d-flex justify-content-end align-items-center text-center position-absolute bottom-0  footerColor`}
      style={{height:'55px',width:'100%', backgroundColor:footerBackground? `${footerBackgroundColor}` : `${currentColor.hex}` }}
    >
      <strong style={{ color:footerText=="1" ? `${getFooterTextColor}` : `${fontColor.hex}` }}>
       All are reserved by Team
      </strong>
      <div class="float-right d-none d-sm-inline-block">
        <div className="d-flex justify-content-center align-items-center">
          
          <button
            className="btn-orange text-white ms-2"
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
              <div className={`${colorPickerPosition ? 'pickerPosition':''}`}>
                <SketchPicker
                  color={currentColor}
                  onChangeComplete={handleChangeComplete}
                />
              </div>
              </div>
            ) : (
              ""
            )}
          </button>
          <button
            className="btn-orange text-white ms-2"
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
              <div className={`${colorPickerPosition ? 'pickerPosition':''}`}>
                <SketchPicker
                  color={fontColor}
                  onChangeComplete={handleChangeFontComplete}
                />
              </div>
              </div>
            ) : (
              ""
            )}{" "}
          </button>
          <button style={{ border: "none", background: "transparent" }}>
            <FooterHiddenButon
              setShowFooter={setShowFooter}
            ></FooterHiddenButon>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
