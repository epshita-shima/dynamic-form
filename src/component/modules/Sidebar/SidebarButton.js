import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import Sidebar from './Sidebar';

const SidebarButton = ({showSidebar,setShowSidebar}) => {
    
  return (
    <div>
    {showSidebar ? (
     <Sidebar 
     showSidebar={showSidebar}
     setShowSidebar={setShowSidebar}
     ></Sidebar>
    ) : (
    <div style={{ marginTop:'250px'}}>
        <FontAwesomeIcon
          icon={faPlus}
          className="bg-primary rounded fs-4 p-2"
          onClick={() => {
            setShowSidebar(true);
          }}
        ></FontAwesomeIcon>
      </div>
    )}
  </div>
  )
}

export default SidebarButton
