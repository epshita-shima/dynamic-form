import GenerateForm from "./component/GenerateForm/GenerateForm";
import {
  Routes,
  Route,
} from "react-router-dom";
import SingleEntryForm from "./component/SingleEntryForm/SingleEntryForm";
import SingleForm from "./component/GenerateForm/SingleForm/SingleForm";
import Slider from "./component/SliderView/Slider";
import MyComponent from "./component/Test/MyComponent";
function App() {
  return (
    <div>
    
    <Routes>
      <Route path="/" element={<GenerateForm></GenerateForm>}></Route>
      <Route path="/single-entry" element={<SingleEntryForm></SingleEntryForm>}></Route>
      <Route path="/Mycomponent" element={<MyComponent></MyComponent>}></Route>
      <Route  path="/single-form" element={<SingleForm/>}></Route>
      <Route path="/slider" element={<Slider></Slider>}></Route>
    </Routes>
    </div>
  );
}

export default App;
