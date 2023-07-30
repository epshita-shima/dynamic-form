import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ChildMenuIndex from "./ChildMenuIndex";

const ChildInfoList = () => {
    const clickhandler = (name) => console.log("delete", name);
  return (
    <div className="pt-2">
    <ChildMenuIndex click={clickhandler} />
    <div className="position-absolute" style={{right:'5%',bottom:"0%"}}>
      <div className="d-flex justify-content-center align-items-center" style={{backgroundColor:'#5A6691',fontSize:'30px', width:'40px', height:'40px', borderRadius:'50px'}}>
        <a href="/add-child" target='_blank' className="text-white">
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </a>
      </div>
    </div>
  </div>
  )
}

export default ChildInfoList
