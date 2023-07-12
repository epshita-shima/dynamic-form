import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

function FooterHiddenButon({setShowFooter}) {
  return (
    <div className="d-flex justify-content-center">
    <FontAwesomeIcon
      icon={faMinus}
      className="fs-6 p-2 text-white"
      data-toggle="tooltip" data-placement="top" title="Close Footer"
      style={{backgroundColor:'#900C3E',width:"22px",height:'22px', borderRadius:'50px'}}
      onClick={() => {
        setShowFooter(false);
      }}
    ></FontAwesomeIcon>
  </div>
  )
}

export default FooterHiddenButon
