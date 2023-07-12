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
  console.log(thirdArray);
  return (
    <div>
      <aside
        className={`main-sidebar sidebar-dark-primary elevation-4`}
        style={{ backgroundColor: `${currentColor.hex}` }}
      >
        {/* Brand Logo */}
        <a
          className={`brand-link`}
          style={{ backgroundColor: `${currentColor.hex}` }}
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
        {/* <a className="brand-link">
        {}
        </a> */}

        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
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
                <a href="#" className="d-block">
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
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <li className="nav-item menu-open">
                <a
                  href="#"
                  className="nav-link"
                  style={{ backgroundColor: "#FFC300" }}
                >
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  {parentMenu.map((item, i) => {
                    return (
                      <li className="nav-item" key={i}>
                        <a
                          data-bs-toggle="collapse"
                          href={"#collapseExample" + i}
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                          className="nav-link active"
                          style={{ color: `${fontColor.hex}` }}
                        >
                          <i className="far fa-circle nav-icon" />
                          <p className="fw-bold">
                            {item.MenuName}
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
                            return (
                              // <li className="nav-item ">
                              //   <a
                              //     href=""
                              //     style={{ fontSize: "15px" }}
                              //     className="nav-link"
                              //   >
                              //     <i className={`text-[#581C87]`} />
                              //     &nbsp;
                              //     <p className="ml-2 text-[#581C87]">
                              //       {item.SubMenuName}
                              //     </p>
                              //   </a>
                              // </li>
                              <li className="nav-item ">
                    <a href="" className="nav-link bg-success">
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

              {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-copy" />
                  <p>
                    Layout Options
                    <i className="fas fa-angle-left right" />
                    <span className="badge badge-info right">6</span>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="pages/layout/top-nav.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Top Navigation</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="pages/layout/top-nav-sidebar.html"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Top Navigation + Sidebar</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="pages/layout/boxed.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Boxed</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="pages/layout/fixed-sidebar.html"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Fixed Sidebar</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="pages/layout/fixed-sidebar-custom.html"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>
                        Fixed Sidebar <small>+ Custom Area</small>
                      </p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="pages/layout/fixed-topnav.html"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Fixed Navbar</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="pages/layout/fixed-footer.html"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Fixed Footer</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="pages/layout/collapsed-sidebar.html"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Collapsed Sidebar</p>
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default Sidebar;
