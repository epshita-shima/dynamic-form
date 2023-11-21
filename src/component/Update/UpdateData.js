import React, { useEffect, useState } from 'react'
import Token from '../common/Token';
import { useLocation } from 'react-router-dom';

const UpdateData = () => {
    const [labelUpdateData, setLabelUpdateData] = useState([]);
    const token = Token.token;
    const search = useLocation();
    const link = search.pathname.split("/");
    let id = link[2];
    let singleId = link[3];
    let newSingleID = singleId?.slice(1)
    console.log(id,newSingleID);
    useEffect(()=>{
        const modelUpdateData = {
          procedureName: "prc_GetUpdateListDetails",
          parameters: {
            MenuId: id,
            UpdateID:newSingleID
          },
        };
        fetch(`https://localhost:44372/api/GetData/GetMultipleDataByParam`, {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(modelUpdateData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status == true) {
              const allData = JSON.parse(data.data);
              console.log(allData)
              const allUpdateData=allData.Tables2;
              
              setLabelUpdateData(allUpdateData)
            //   setLabelUpdateSingleData(allUpdateData)
            }})
      },[id,newSingleID,token])
  return (
    <div>
     <table>
        <thead>
<tr>
    <th></th>
</tr>
        </thead>
     </table>
    </div>
  )
}

export default UpdateData
