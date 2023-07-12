import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import Sidebar from './Sidebar';

const SidebarButton = ({showHeader,showSidebar,setShowSidebar}) => {
    
  return (
    <div>
    {showSidebar ? (
     <Sidebar 
     showHeader={showHeader}
     showSidebar={showSidebar}
     setShowSidebar={setShowSidebar}
     ></Sidebar>
    ) : (
    <div style={{ marginTop:'250px'}} data-toggle="tooltip" data-placement="top" title="Open Sidebar">
        <FontAwesomeIcon
          icon={faPlus}
          className="text-white fs-4 p-2"
          style={{backgroundColor:'#FFC300',width:"30px",height:'30px', borderRadius:'50px'}}
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
