import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Token from "../common/Token";
const useIndexTableData = () => {
    const [tableListData, setTableListData] = useState([]);
    const [heading, setHeading] = useState([]);
    const token = Token.token;
    const search = useLocation();
  console.log(tableListData)
    console.log(heading);
    useEffect(() => {
        
    const link = search.pathname.split("/");
    let id = link[2];
    console.log(id,link)
        const modelListData = {
          procedureName: "prc_GetListDetails",
          parameters: {
            MenuId: id,
          },
        };
        console.log(modelListData);
        fetch(`https://localhost:44372/api/GetData/GetMultipleDataByParam`, {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(modelListData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status == true) {
              const showListData = JSON.parse(data.data);
              console.log(showListData);
              setTableListData(showListData.Tables1);
              let arraykeys = [];
              let pos = 0;
              for (let i of showListData.Tables1) {
                  if(pos==0){
                    arraykeys.push(...Object.keys(i));
                  }
                  pos++;
              }
              setHeading(arraykeys);
            }
          });
      }, [search,token]);
  return [tableListData, setTableListData]
}

export default useIndexTableData
