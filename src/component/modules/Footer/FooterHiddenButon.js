import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

function FooterHiddenButon({setShowFooter}) {
  return (
    <div className="d-flex justify-content-center pt-2">
    <FontAwesomeIcon
      icon={faMinus}
      className="bg-primary rounded fs-6 p-2"
      onClick={() => {
        setShowFooter(false);
      }}
    ></FontAwesomeIcon>
  </div>
  )
}

export default FooterHiddenButon
