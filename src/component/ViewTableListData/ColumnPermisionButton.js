import React, { useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableListData from './TableListData'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const ColumnPermisionButton = ({menuId,tableListData}) => {
  
    const clickhandler = (name) => console.log("delete", name);
    const navigate=useNavigate()
  return (
    <div>
      <TableListData click={clickhandler} />
      <div className="position-absolute" style={{right:'5%',bottom:"15%"}}>
        <div className="d-flex justify-content-center align-items-center" style={{background:'linear-gradient(to bottom, #FC6294,#58355F)',fontSize:'25px', borderRadius:'50px'}}>
          <button
            // href={} target='_blank' className="text-white"
            style={{width:'40px',height:'40px',border:'none',background:'transparent'}}
          >

            <FontAwesomeIcon icon={faPlus} className='text-center text-white ' onClick={()=>{navigate("/add-list" + "/" + menuId)}}></FontAwesomeIcon>
          </button>
        </div>
      </div>
     
    </div>
  )
}

export default ColumnPermisionButton
