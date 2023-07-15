import { SketchPicker } from "react-color";
import './ColorPicker.css'
function FontColorPicker({fontColor,setFontColor,colorPickerPosition}) {
    const handleChangeComplete = (color) => {
       setFontColor(color)
      };
  return (
    <div className="d-flex justify-content-center mt-4">
    <div className={`${colorPickerPosition ? 'pickerPosition':''}`}>
      <SketchPicker
        color={fontColor}
        onChangeComplete={handleChangeComplete}
      />
    </div>
    </div>
  )
}

export default FontColorPicker
