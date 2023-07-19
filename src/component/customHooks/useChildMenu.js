import React, { useEffect, useState } from 'react'
import Token from '../common/Token';

const useChildMenu = () => {
  const [childMenu, setChildMenu] = useState([]);
  const token=Token.token;
  const modelData = {
    procedureName: "",
    parameters: {},
  };
  modelData.procedureName = "prc_GetMenuList";
  useEffect(() => {
    fetch("https://localhost:44372/api/GetData/GetInitialData", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(modelData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == true) {
          const allModalData = JSON.parse(data.data);
          setChildMenu(allModalData.Tables2);
        } else {
          console.log(data);
        }
      });
  }, []);
  return[childMenu, setChildMenu]
}

export default useChildMenu
