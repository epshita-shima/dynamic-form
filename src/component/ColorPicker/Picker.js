
import { SketchPicker } from "react-color";
 const Picker=({currentColor, setCurrentColor,colorPickerPosition})=> {
  
  const handleChangeComplete = (color) => {
    setCurrentColor(color);
  };

  return (
    <div className="d-flex justify-content-center mt-4">
    <div className={`${colorPickerPosition ? 'pickerPosition':''}`}>
      <SketchPicker
        color={currentColor}
        onChangeComplete={handleChangeComplete}
      />
    </div>
    </div>
  );
}
export default Picker