import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const SidebarHiddenButton = ({showSidebar,setShowSidebar}) => {
  return (
    <div>
      <FontAwesomeIcon
          icon={faMinus}
          className="bg-primary rounded fs-5 p-2"
          onClick={() => {
            setShowSidebar(false);
          }}
        ></FontAwesomeIcon>
    </div>
  )
}

export default SidebarHiddenButton
