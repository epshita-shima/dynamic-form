import React, { useState } from "react";
import FooterHiddenButon from "./FooterHiddenButon";
import Picker from "../../ColorPicker/Picker";

const Footer = ({ setShowFooter }) => {
  const [colorOrange, setColorOrange] = useState(false);
  const [colorBLue, setColorBlue] = useState(false);
  const [colorLightgray, setColorLightgray] = useState(false);
  const [currentColor, setCurrentColor] = useState("#D0021B");
  const handleBackgroundOrange = () => {
    setColorOrange(true);
    setColorLightgray(false);
    setColorBlue(false);
  };
  const handleBackgroundBlue = () => {
    setColorBlue(true);
    setColorLightgray(false);
    setColorOrange(false);
  };
  const handleBackgroundLightgray = () => {
    setColorLightgray(true);
    setColorBlue(false);
    setColorOrange(false);
  };
  console.log(colorOrange);
  return (
    <footer
      class={`main-footer position-absolute bottom-0 ${
        colorBLue ? "changeColorBlue" : ""
      }  ${colorLightgray ? "changeColorLightgray" : ""}`}
      style={{ width: "1290px", backgroundColor: `${currentColor.hex}` }}
    >
      <strong>Copyright &copy; 2022-2023 </strong>
      <div class="float-right d-none d-sm-inline-block">
        <button style={{ border: "none", background: "transparent" }}>
          <FooterHiddenButon setShowFooter={setShowFooter}></FooterHiddenButon>
        </button>
        <button
          className="btn-orange"
          onClick={() => {
            handleBackgroundOrange();
          }}
        >
          {colorOrange ? (
            <Picker
              currentColor={currentColor}
              setCurrentColor={setCurrentColor}
            ></Picker>
          ) : (
            ""
          )}
        </button>
        10
        <button
          className="btn-lightgray ms-2"
          onClick={() => {
            handleBackgroundLightgray();
          }}
        ></button>
      </div>
    </footer>
  );
};

export default Footer;
