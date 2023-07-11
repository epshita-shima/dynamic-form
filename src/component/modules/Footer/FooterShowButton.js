import React from 'react'
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function FooterShowButton({showFooter,setShowFooter}) {
  return (
    <div>
         <div>
      {showFooter ? (
       <Footer
       showFooter={showFooter}
       setShowFooter={setShowFooter}
       ></Footer>
      ) : (
        <div className="d-flex justify-content-center align-items-end pt-2 position-absolute bottom-0 start-50">
          <FontAwesomeIcon
            icon={faPlus}
            className="bg-primary rounded fs-4 p-2"
            onClick={() => {
                setShowFooter(true);
            }}
          ></FontAwesomeIcon>
        </div>
      )}
    </div>
    </div>
  )
}

export default FooterShowButton
