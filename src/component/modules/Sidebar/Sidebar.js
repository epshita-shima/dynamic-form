import React, { useEffect, useState } from "react";
import SidebarColorButton from "./SidebarColorButton";
import SidebarHiddenButton from "./SidebarHiddenButton";
import Token from "../../common/Token";
import "./SidebarButton.css"

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const [modalSpecificData, setModalSpecificData] = useState([]);
  const [colorOrange, setColorOrange] = useState(false);
  const [colorBLue, setColorBlue] = useState(false);
  const [colorLightgray, setColorLightgray] = useState(false);
  const [currentColor, setCurrentColor] = useState("#D0021B")
  const token =Token.token
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
          setModalSpecificData(allModalData.Tables1);
        } else {
          console.log(data);
        }
      });
  }, []);

  return (
    <div>
      <aside
        className={`main-sidebar sidebar-dark-primary elevation-4 ${colorBLue ? "changeColorBlue" : ""} ${
          colorLightgray ? "changeColorLightgray" : ""
        }`}
        style={{backgroundColor:`${currentColor.hex}`}}
      >
        {/* Brand Logo */}
        <a className={`brand-link ${colorOrange? 'layout-navbar-fixed wrapper brand-link':''}`}>
          {
            <SidebarColorButton
            currentColor={currentColor} 
            setCurrentColor={setCurrentColor}
            colorOrange={colorOrange}
              setColorBlue={setColorBlue}
              setColorOrange={setColorOrange}
              setColorLightgray={setColorLightgray}
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
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
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

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <li className="nav-item menu-open">
                <a href="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  {modalSpecificData.map((item, i) => {
                    return    <li className="nav-item" key={i}>
               
                    <a
                      data-bs-toggle="collapse"
                      href={"#collapseExample" +i}
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                      className="nav-link active"
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
                      id={"collapseExample" +i}
                    >
                      <li className="nav-item ">
                        <a
                          href={`/dashboard`}
                          style={{ fontSize: "15px" }}
                          className="nav-link"
                        >
                          <i className={`text-[#581C87]`} />
                          &nbsp;
                          <p className="ml-2 text-[#581C87]">Item Info</p>
                        </a>
                      </li>
                    </ul>
                  </li>;
                  })}
                </ul>
              </li>

              <li className="nav-item">
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
              </li>

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
