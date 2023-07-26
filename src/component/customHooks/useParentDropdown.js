import React, { useEffect, useState } from 'react'
import Token from '../common/Token';

const useParentDropdown = () => {
  const [parentDropdownMenu, setParentDropdownMenu]=useState([])
  const token=Token.token;
  const modelData = {
    procedureName: "",
    parameters: {},
  };
  modelData.procedureName = "prc_GetMenuList";
  useEffect(() => {
    const facheParentDropdownMenu=async()=>{
    const response=await fetch("https://localhost:44372/api/GetData/GetInitialData", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(modelData),
      })
      const data= await response.json()
      if (data.status == true) {
            const allModalData = JSON.parse(data.data);
            setParentDropdownMenu(allModalData.Tables3);
          } else {
            console.log(data);
          }
    }
    
      facheParentDropdownMenu()
  }, []);
  return[parentDropdownMenu, setParentDropdownMenu]
}

export default useParentDropdown 
