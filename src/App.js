import GenerateForm from "./component/GenerateForm/GenerateForm";
import { Routes, Route } from "react-router-dom";
import SingleEntryForm from "./component/SingleEntryForm/SingleEntryForm";
import SingleForm from "./component/GenerateForm/SingleForm/SingleForm";
import MyComponent from "./component/Test/MyComponent";
import CreatePage from "./component/CreatePage/CreatePage";
import SingleEntryData from "./component/SingleEntryData/SingleEntryData";

import Dashboard from "./component/Dashboard/Dashboard";
import CreateMenu from "./component/CreateMenu/CreateParentMenu/CreateMenu";
import "./App.css";
import CreateChildMenu from "./component/CreateMenu/CreateChildMenu/CreateChildMenu";
import useChildMenu from "./component/customHooks/useChildMenu";
import ChildInfoList from "./component/CreateMenu/CreateChildMenu/ChildInfoList";
import { useState } from "react";

function App() {
  const [childMenu, setChildMenu] = useChildMenu([]);
  const [showTable, setShowTable] = useState(false);
  console.log(childMenu)
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard 
        showTable={showTable}
        setShowTable={setShowTable}
        ></Dashboard>}>

          {childMenu.map((item) => {
            const pageType = item.PageType;
            return (
              <>
                {pageType == "singleEntryPage" || pageType == "doubleEntryPage" ? (
                  <Route
                    path={item.UiLink + "/:" + item.MenuId}
                    element={<SingleEntryData 
                      showTable={showTable}
                       setShowTable={setShowTable}
                    ></SingleEntryData>}
                  ></Route>
                ) 
                : pageType !== "doubleEntryPage" || pageType == "singleEntryPage" ?(<>
                  <Route
                      path="/master-menu"
                      element={<CreateMenu></CreateMenu>}
                    ></Route>
                    <Route
                      path="/child-menu"
                      element={<ChildInfoList></ChildInfoList>}
                    ></Route>
                    <Route path="/add-child" element={<CreateChildMenu></CreateChildMenu>}></Route>
                </>):''
                }
              </>
            );
          })}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
