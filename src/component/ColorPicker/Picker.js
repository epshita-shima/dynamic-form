import {  useState } from "react";
import { SketchPicker } from "react-color";
 const Picker=({currentColor, setCurrentColor})=> {
  
  const handleChangeComplete = (color) => {
    setCurrentColor(color);
  };
  return (
    <div >
      <SketchPicker
        color={currentColor}
        onChangeComplete={handleChangeComplete}
      />
    </div>
  );
}
export default Picker