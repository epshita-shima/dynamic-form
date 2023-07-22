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


import Dashboard from "./component/Dashboard/Dashboard";
import SingleDasboard from "./component/Dashboard/SingleDasboard";
import CreateMenu from "./component/CreateMenu/CreateMenu";
import './App.css'
import CreateChildMenu from "./component/CreateMenu/CreateChildMenu/CreateChildMenu";



function App() {

  return (

    <div>

<Routes>
  <Route path="/" element={<Dashboard></Dashboard>}>
    <Route index element={<SingleDasboard></SingleDasboard>}></Route>
    <Route path="/master-menu" element={<CreateMenu></CreateMenu>}></Route>
    <Route path="/child-menu" element={<CreateChildMenu></CreateChildMenu>}></Route>
    <Route path="/single-entry-data" element={<SingleEntryData></SingleEntryData>}></Route>
  </Route>
  </Routes> 
     {/* <Routes>
      <Route path="/" element={<CreatePage></CreatePage>}></Route>
      <Route path="/generate-form" element={<GenerateForm></GenerateForm>}></Route>
     <Route path="single-entry" element={<SingleEntryForm></SingleEntryForm>}></Route>
      <Route path="/single-entry-data" element={<SingleEntryData></SingleEntryData>}></Route>
      <Route path="/Mycomponent" element={<MyComponent></MyComponent>}></Route>
      <Route  path="/single-form" element={<SingleForm/>}></Route>
      <Route path="/slider" element={<Slider></Slider>}></Route>
    </Routes> */}
    </div>

  );
}

export default App;
