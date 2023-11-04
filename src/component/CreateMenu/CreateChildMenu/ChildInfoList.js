import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ChildMenuIndex from "./ChildMenuIndex";
import { useNavigate } from "react-router-dom";

const ChildInfoList = () => {
    const clickhandler = (name) => console.log("delete", name);
    const navigate=useNavigate()
  return (
    <div className="pt-2">
    <ChildMenuIndex click={clickhandler} />
    <div className="position-absolute" style={{right:'5%',bottom:"15%"}}>
      <div className="d-flex justify-content-center align-items-center" style={{backgroundColor:'#5A6691',fontSize:'25px', borderRadius:'50px'}}>
        {/* href="/add-child" target='_blank' */}
        <button  className="text-white"  style={{width:'40px',height:'40px',border:'none',background:'transparent'}}>
          <FontAwesomeIcon icon={faPlus} onClick={()=>
            navigate('/add-child')
          }></FontAwesomeIcon>
        </button>
      </div>
    </div>
  </div>
  )
}

export default ChildInfoList
