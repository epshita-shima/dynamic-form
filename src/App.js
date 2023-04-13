import GenerateForm from "./component/GenerateForm/GenerateForm";
import {
  Routes,
  Route,
} from "react-router-dom";
import SingleEntryForm from "./component/SingleEntryForm/SingleEntryForm";
import SingleForm from "./component/GenerateForm/SingleForm/SingleForm";
import Slider from "./component/SliderView/Slider";
function App() {
  return (
    <div>
    
    <Routes>
      <Route path="/" element={<GenerateForm></GenerateForm>}></Route>
      <Route path="/single-entry" element={<SingleEntryForm></SingleEntryForm>}></Route>
      <Route  path="/single-form" element={<SingleForm/>}></Route>
      <Route path="/slider" element={<Slider></Slider>}></Route>
    </Routes>
    </div>
  );
}

export default App;
