import GenerateForm from "./component/GenerateForm/GenerateForm";
import {
  Routes,
  Route,
} from "react-router-dom";
import SingleEntryForm from "./component/SingleEntryForm/SingleEntryForm";
import SingleForm from "./component/GenerateForm/SingleForm/SingleForm";
import Slider from "./component/SliderView/Slider";
import MyComponent from "./component/Test/MyComponent";
import CreatePage from "./component/CreatePage/CreatePage";
import SingleEntryData from "./component/SingleEntryData/SingleEntryData";
import $ from 'jquery';
import HeaderButton from "./component/modules/Header/HeaderButton";
import SidebarButton from "./component/modules/Sidebar/SidebarButton";
import SidebarColorButton from "./component/modules/Sidebar/SidebarColorButton";
import { useState } from "react";
function App() {
  const [showHeader, setShowHeader] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div >
    <HeaderButton 
    showHeader={showHeader}
    setShowHeader={setShowHeader}
    ></HeaderButton>
    <SidebarButton
    showSidebar={showSidebar}
    setShowSidebar={setShowSidebar}
    ></SidebarButton>
    {/* <Routes>
      <Route path="/" element={<CreatePage></CreatePage>}></Route>
      <Route path="/generate-form" element={<GenerateForm></GenerateForm>}></Route>
      <Route path="/single-entry" element={<SingleEntryForm></SingleEntryForm>}></Route>
      <Route path="/single-entry-data" element={<SingleEntryData></SingleEntryData>}></Route>
      <Route path="/Mycomponent" element={<MyComponent></MyComponent>}></Route>
      <Route  path="/single-form" element={<SingleForm/>}></Route>
      <Route path="/slider" element={<Slider></Slider>}></Route>/
    </Routes> */}
    </div>
  );
}

export default App;
