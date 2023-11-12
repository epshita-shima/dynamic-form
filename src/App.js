import { Routes, Route, MemoryRouter } from "react-router-dom";
import SingleEntryData from "./component/SingleEntryData/SingleEntryData";
import Dashboard from "./component/Dashboard/Dashboard";
import CreateMenu from "./component/CreateMenu/CreateParentMenu/CreateMenu";
import "./App.css";
import CreateChildMenu from "./component/CreateMenu/CreateChildMenu/CreateChildMenu";
import useChildMenu from "./component/customHooks/useChildMenu";
import ChildInfoList from "./component/CreateMenu/CreateChildMenu/ChildInfoList";
import { useState } from "react";
import ListPage from "./component/CreateListPage/ListPage";
import TableListData from "./component/ViewTableListData/TableListData";
import ColumnPermisionButton from "./component/ViewTableListData/ColumnPermisionButton";
import useIndexTableData from "./component/customHooks/useIndexTableData";
import { useLocation } from "react-router-dom";

function App({children}) {
  const [childMenu, setChildMenu] = useChildMenu([]);
  const [showTable, setShowTable] = useState(false);
  const [childTableName, setChildTableName] = useState("");
  const [tableNameID, setTableNameID] = useState("");
  const [tableListData, setTableListData] = useIndexTableData([]);
  const search = useLocation();
  const link = search.pathname.split("/");
  let id = link[2];
  let singleId = link[3];
  console.log(link);
  console.log(childMenu)
  console.log(children)

  return (
    <div className="container-fluid">
      {/* <MemoryRouter initialEntries={generateInitialEntries()} initialIndex={0}>
      {children}
    </MemoryRouter> */}
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              showTable={showTable}
              setShowTable={setShowTable}
            ></Dashboard>
          }
        >
          {childMenu.map((item) => {
            const pageType = item.PageType;
            const menuId = item.MenuId;
            const tableName = item.UiLink;
            console.log(menuId)
            return (
              <>
                {pageType == "singleEntryPage" ||
                pageType == "doubleEntryPage" ? (
                  <Route
                    path={item.UiLink + "/:" + item.MenuId}
                    element={
                      <ColumnPermisionButton
                        tableListData={tableListData}
                        menuId={menuId}
                      ></ColumnPermisionButton>
                    }
                  ></Route>
                ) : pageType !== "doubleEntryPage" ||
                  pageType == "singleEntryPage" ? (
                  <>
                    <Route
                      path="/master-menu"
                      element={<CreateMenu></CreateMenu>}
                    ></Route>
                    <Route
                      path="/child-menu"
                      element={<ChildInfoList></ChildInfoList>}
                    ></Route>
                    <Route
                      path={"/add-list" + "/" + id}
                      element={
                        <SingleEntryData
                          showTable={showTable}
                          tableName={tableName}
                          setShowTable={setShowTable}
                        ></SingleEntryData>
                      }
                    ></Route>
                    <Route
                      path={"/add-list" + "/" + id + "/" + singleId}
                      element={
                        <SingleEntryData
                          showTable={showTable}
                          tableName={tableName}
                          setShowTable={setShowTable}
                        ></SingleEntryData>
                      }
                    ></Route>

                    <Route
                      path="/list-page"
                      element={<ListPage></ListPage>}
                    ></Route>
                    <Route
                      path="/add-child"
                      element={
                        <CreateChildMenu
                          setChildTableName={setChildTableName}
                        ></CreateChildMenu>
                      }
                    ></Route>
                  </>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
