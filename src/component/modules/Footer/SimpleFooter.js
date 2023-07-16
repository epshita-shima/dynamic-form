import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";



import { SketchPicker } from "react-color";
const SimpleFooter = () => {

  return (
    <nav
      className={`main-header position-absolute bottom-0 headerColor`}
    //   style={{
    //     backgroundColor:
    //       headerBackground == "1"
    //         ? `${headerBackgroundColor}`
    //         : `${currentColor.hex}`,
    //   }}
    >
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link hearderTextColor"
            data-widget="pushmenu"
            href="#"
            role="button"
            // style={{
            //   color:
            //     headerText == "1"
            //       ? `${getHeaderTextColor}`
            //       : `${fontColor.hex}`,
            // }}
          >
            <i className="fas fa-bars" />
          </a>
        </li>
       
      </ul>

      {/* Right navbar links */}
    
      
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
          
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <button
              onClick={() => localStorage.clear()}
              className="w-full text-left"
            >
              <a className="dropdown-item" href="/password">
                Change Password
              </a>
              <a className="dropdown-item" href="/password">
                Logout
              </a>
            </button>
          </div>
        </li>
      
      </ul>
    </nav>
  );
};

export default SimpleFooter;

