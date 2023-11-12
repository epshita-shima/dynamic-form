import React, {useState } from "react";
import SidebarColorButton from "./SidebarColorButton";
import Token from "../../common/Token";
import "./SidebarButton.css";
import useParentMenu from "../../customHooks/useParentMenu";
import useChildMenu from "../../customHooks/useChildMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { Link} from "react-router-dom";

const Sidebar = ({ showHeader, showSidebar, setShowSidebar,showTable, setShowTable }) => {
  

  const [backgroundColor, setBackgroundColor] = useState(false);
  const [fontColor, setFontColor] = useState(false);
  const [fontColorBtn, setFontColorBtn] = useState(false);
  const [currentColor, setCurrentColor] = useState("#D0021B");
  const [parentMenu, setParentMenu] = useParentMenu([]);
  const [childMenu, setChildMenu] = useChildMenu([]);
  const token=Token.token;
  const sidebarBackground = sessionStorage.getItem("sidebarBackground");
  const sidebarText = sessionStorage.getItem("sidebarText");
  const getSidebarTextColor = sessionStorage.getItem("sidebarTextColor");
  const sidebarBackgroundColor = sessionStorage.getItem("sidebarBackgroundColor");


  const thirdArray = childMenu.filter((elem) => {
    return parentMenu.some((ele) => {
      return elem.MenuName === ele.MenuName;
    });
  });

  const modelData = {
    procedureName: "",
    parameters: {},
  };
  modelData.procedureName = "prc_GetMenuList";
  const  handleParentMenu=()=>{
    const fatchAllMenuData=async()=>{
    const response=await fetch("https://localhost:44372/api/GetData/GetInitialData", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(modelData),
      })
      const data= await response.json()
      if (data.status == true) {
        const allModalData = JSON.parse(data.data);
        setParentMenu(allModalData.Tables1);
        setChildMenu(allModalData.Tables2);
        window.location.reload();

      } else {
        console.log(data);
      }
     
    }
    fatchAllMenuData()
  }
  const handleListData=(menuId)=>{
    console.log('click')
    


  }

  return (
    <div>
      
      <aside
        className={`main-sidebar sidebar-dark-primary sidebarColor elevation-4`}
        style={{
          background:
            sidebarBackground == "1"
              ? `${sidebarBackgroundColor}`
              : `${currentColor.hex}`,
        }}
      >
        <a
          className={`brand-link `}
          style={{
            backgroundColor:'#F3F3F9'
            // backgroundColor:
            //   sidebarBackground == "1"
            //     ? `${sidebarBackgroundColor}`
            //     : `${currentColor.hex}`,
          }}
        >
          {
            <SidebarColorButton
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              fontColor={fontColor}
              setFontColor={setFontColor}
              fontColorBtn={fontColorBtn}
              setFontColorBtn={setFontColorBtn}
              currentColor={currentColor}
              setCurrentColor={setCurrentColor}
              setShowSidebar={setShowSidebar}
            ></SidebarColorButton>
          }
        </a>
       

        {/* Sidebar */}
        <div className="sidebar">
        {/* <div className="mt-4">
        <button className="btn" style={{backgroundColor:'#F06548',color:'white'}} onClick={()=>{
          handleParentMenu()
        }}><FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon></button>
       </div> */}
          {showHeader ? (
            " "
          ) : (
            <div className="user-panel mt-4 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src="dist/img/user2-160x160.jpg"
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div>
              <div className="info">
                <a
                  href="#"
                  className="d-block"
                  style={{ textDecoration: "none" }}
                >
                  Alexander Pierce
                </a>
              </div>
            </div>
          )}

          {/* Sidebar Menu */}
          <nav className="mt-4">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <ul className="nav nav-treeview">
                  {parentMenu.map((items, i) => {
                    console.log(items)
                    return (
                      <li className="nav-item" key={i}>
                        <a
                          data-bs-toggle="collapse"
                          href={"#collapseExample" + i}
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                          className="nav-link active"
                          style={{
                            color: sidebarText
                              ? `${getSidebarTextColor}`
                              : `${fontColor.hex}`,
                            backgroundColor: "#51365F",
                          }}
                        >
                          <i className="far fa-circle nav-icon text-white" />
                          <p className=" text-white">
                            {items.MenuName}
                            <span>
                              <i className="fas fa-angle-down ml-2" />
                            </span>
                          </p>
                        </a>
                        <ul
                          className={`nav collapse side-dropdown`}
                          id={"collapseExample" + i}
                        >
                          {thirdArray.map((item, i) => {
                            console.log(item.PageType)
                        if(items.MenuName==item.MenuName)
                            return (
                              <li className="nav-item">
                                <Link
                                  to={`${item?.PageType== 'singleEntryPage' || item?.PageType== 'doubleEntryPage' ? `${item.UiLink}/${item.MenuId}`: 
                                  // item.PageType== 'doubleEntryPage' ? `${item.UiLink}/${item.MenuId}` : 
                                  item?.PageType !== "doubleEntryPage" || item?.PageType == "singleEntryPage" ? `${item.UiLink}`:'' }`}
                                  className="nav-link"
                                  style={{
                                    background: "linear-gradient(to bottom, #FC6294,#58355F)",
                                    color:'black',
                                    fontSize:'16px',
                                  }}
                                  onClick={()=>{
                                    // setShowTable(false)
                                  }}
                                >
                                  <i className="far fa-circle nav-icon" />
                                  <p className="text-white fw-normal" onClick={()=>handleListData(item.MenuId)}>{item.SubMenuName}</p>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      {/* <div className="d-none">
        <TableListData tableListData={tableListData} ></TableListData>
      </div> */}
    </div>
  );
};

export default Sidebar;
