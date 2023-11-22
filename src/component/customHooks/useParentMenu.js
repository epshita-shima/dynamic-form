import React, { useEffect, useState } from 'react'
import Token from '../common/Token';

const useParentMenu = () => {
  const [parentMenu, setParentMenu]=useState([])
  const token=Token.token;
  const modelData = {
    procedureName: "",
    parameters: {},
  };
 
  modelData.procedureName = "prc_GetMenuList";
  console.log(modelData)
  useEffect(() => {
    const faceParentData=async()=>{
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
            setParentMenu(allModalData.Tables1);
          } else {
            console.log(data);
          }
    }
      faceParentData()
  }, []);
  return[parentMenu, setParentMenu]
}

export default useParentMenu
