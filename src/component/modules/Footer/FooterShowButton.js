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
        <div className="d-flex justify-content-center align-items-end pt-2 position-absolute bottom-0 start-50"
        data-toggle="tooltip" data-placement="top" title="Open Footer">
          <FontAwesomeIcon
            icon={faPlus}
            className="text-white fs-4 p-2"
            style={{backgroundColor:'#FFC300',width:"30px",height:'30px', borderRadius:'50px'}}
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
