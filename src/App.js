import GenerateForm from "./component/GenerateForm/GenerateForm";
import { Routes, Route } from "react-router-dom";
import SingleEntryForm from "./component/SingleEntryForm/SingleEntryForm";
import SingleForm from "./component/GenerateForm/SingleForm/SingleForm";
import Slider from "./component/SliderView/Slider";
import MyComponent from "./component/Test/MyComponent";
import CreatePage from "./component/CreatePage/CreatePage";
import SingleEntryData from "./component/SingleEntryData/SingleEntryData";

import Dashboard from "./component/Dashboard/Dashboard";
import SingleDasboard from "./component/Dashboard/SingleDasboard";
import CreateMenu from "./component/CreateMenu/CreateMenu";
import "./App.css";
import CreateChildMenu from "./component/CreateMenu/CreateChildMenu/CreateChildMenu";
import useChildMenu from "./component/customHooks/useChildMenu";

function App() {
  const [childMenu,setChildMenu]=useChildMenu([])
console.log(childMenu)

 
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>}>
          <Route index element={<SingleDasboard></SingleDasboard>}></Route>
          
          {
             childMenu.map(item=>{
              const pageType=item.PageType
              return(
                <>
                {
                  pageType=='doubleEntryPage' ?  (<Route
                     path={item.UiLink+"/:"+item.MenuId}
                   element={<SingleEntryData></SingleEntryData>}
                  ></Route> ): (
                  <Route
                    path="/child-menu"
                    element={<CreateChildMenu></CreateChildMenu>}
                  ></Route>)
                }
                </>
              )
             })
          }
          
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
