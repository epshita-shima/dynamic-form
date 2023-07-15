import React, { useEffect, useState } from "react";
import SidebarColorButton from "./SidebarColorButton";
import SidebarHiddenButton from "./SidebarHiddenButton";
import Token from "../../common/Token";
import "./SidebarButton.css";

const Sidebar = ({ showHeader, showSidebar, setShowSidebar }) => {
  const [backgroundColor, setBackgroundColor] = useState(false);
  const [fontColor, setFontColor] = useState(false);
  const [fontColorBtn, setFontColorBtn] = useState(false);
  const [currentColor, setCurrentColor] = useState("#D0021B");
  const [parentMenu, setParentMenu] = useState([]);
  const [childMenu, setChildMenu] = useState([]);
  const sidebarBackground = sessionStorage.getItem("sidebarBackground");
  const sidebarText = sessionStorage.getItem("sidebarText");
  const getSidebarTextColor = sessionStorage.getItem("sidebarTextColor");
  const sidebarBackgroundColor = sessionStorage.getItem(
    "sidebarBackgroundColor"
  );
  const token = Token.token;
  useEffect(() => {
    const modelData = {
      procedureName: "",
      parameters: {},
    };
    modelData.procedureName = "prc_GetMenuList";
    fetch("https://localhost:44372/api/GetData/GetInitialData", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(modelData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == true) {
          const allModalData = JSON.parse(data.data);
          console.log(allModalData);
          setParentMenu(allModalData.Tables1);
          setChildMenu(allModalData.Tables2);
        } else {
          console.log(data);
        }
      });
  }, []);

  const thirdArray = childMenu.filter((elem) => {
    return parentMenu.some((ele) => {
      console.log(ele);
      return elem.MenuName === ele.MenuName;
    });
  });

  return (
    <div>
      <aside
        className={`main-sidebar sidebar-dark-primary sidebarColor elevation-4`}
        style={{
          backgroundColor:
            sidebarBackground == "1"
              ? `${sidebarBackgroundColor}`
              : `${currentColor.hex}`,
        }}
      >
        <a
          className={`brand-link`}
          style={{
            backgroundColor:
              sidebarBackground == "1"
                ? `${sidebarBackgroundColor}`
                : `${currentColor.hex}`,
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
                            backgroundColor: "#FFC300",
                          }}
                        >
                          <i className="far fa-circle nav-icon" />
                          <p className="fw-bold">
                            {items.MenuName}
                            <span>
                              <i className="fas fa-angle-down ml-2" />
                            </span>
                          </p>
                        </a>
                        <ul
                          className={`nav collapse side-dropdown  `}
                          id={"collapseExample" + i}
                        >
                          {thirdArray.map((item, i) => {
                            console.log(item)
                        if(items.MenuName==item.MenuName)
                            return (
                              <li className="nav-item ">
                                <a
                                  href=""
                                  className="nav-link"
                                  style={{
                                    backgroundColor: "#FFD966",
                                    color: 'teal',
                                    fontWeight: "600",
                                    fontSize:'15px'
                                  }}
                                >
                                  <i className="far fa-circle nav-icon" />
                                  <p>{item.SubMenuName}</p>
                                </a>
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
    </div>
  );
};

export default Sidebar;
