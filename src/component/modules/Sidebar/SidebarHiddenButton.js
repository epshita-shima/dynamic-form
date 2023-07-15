import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const SidebarHiddenButton = ({showSidebar,setShowSidebar}) => {
  return (
    <div>
      <FontAwesomeIcon
          icon={faMinus}
          className="fs-5 p-2"
          data-toggle="tooltip" data-placement="top" title="Close Sidebar"
          style={{backgroundColor:'#900C3E',width:"25px",height:'25px', borderRadius:'50px'}}
          onClick={() => {
            setShowSidebar(false);
          }}
        ></FontAwesomeIcon>
    </div>
  )
}

export default SidebarHiddenButton
