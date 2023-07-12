import React, { useState } from "react";
import FooterHiddenButon from "./FooterHiddenButon";
import Picker from "../../ColorPicker/Picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import FontColorPicker from "../../ColorPicker/FontColorPicker";

const Footer = ({ setShowFooter }) => {
  const [backgroundColor, setBackgroundColor] = useState(false);
  const [colorPickerPosition,setColorPickerPosition]=useState(false)
  const [fontColor,setFontColor]=useState(false)
  const [fontColorBtn,setFontColorBtn]=useState(false)
  const [currentColor, setCurrentColor] = useState("#D0021B");

  const handleBackground = () => {
    setBackgroundColor(!backgroundColor);
    setColorPickerPosition(true)
    sessionStorage.setItem("footerBackgroundColor",currentColor.hex)
  };
const handleFontColor=()=>{
setFontColorBtn(!fontColorBtn)
setColorPickerPosition(true)
}
  
  return (
    <footer
      class={`main-footer position-absolute bottom-0`}
      style={{ width: "1290px", backgroundColor: `${currentColor.hex}` }}
    >
      <strong style={{color:`${fontColor.hex}`}}>Copyright &copy; 2022-2023 </strong>
      <div class="float-right d-none d-sm-inline-block">
      <div className="d-flex justify-content-center align-items-center" >
      <button style={{ border: "none", background: "transparent" }}>
          <FooterHiddenButon setShowFooter={setShowFooter}></FooterHiddenButon>
        </button>
        <button
        className="btn-orange text-white"
        data-toggle="tooltip" data-placement="top" title="Background Color"
        onClick={() => {
          handleBackground();
        }}
      >{backgroundColor? (<FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>) : (<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>)}{backgroundColor ? (<Picker
        colorPickerPosition={colorPickerPosition}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
      ></Picker>):''} 
      </button>
      <button
        className="btn-orange text-white ms-2"
        data-toggle="tooltip" data-placement="top" title="Text Color"
        onClick={() => {
          handleFontColor();
        }}
      >{fontColorBtn? (<FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>) : (<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>)}{fontColorBtn ? (<FontColorPicker
        colorPickerPosition={colorPickerPosition}
        fontColor={fontColor}
        setFontColor={setFontColor}
      ></FontColorPicker>):''} </button>
      </div>
       
      </div>
    </footer>
  );
};

export default Footer;
