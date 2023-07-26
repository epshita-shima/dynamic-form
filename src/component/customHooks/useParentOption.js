import { useEffect, useState } from "react";
import Token from "../common/Token";

const useParentOption = () => {
  const [parentSelectOption, setParentSelectOption] = useState();
  const token = Token.token;
  const modelData = {
    procedureName: "",
    parameters: {},
  };
  modelData.procedureName = "prc_GetMenuList";
  useEffect(() => {
    const faceParentOptionData = async () => {
      const response = fetch(
        "https://localhost:44372/api/GetData/GetInitialData",
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(modelData),
        }
      );
      const data = await response.json();
      if (data.status == true) {
        const allModalData = JSON.parse(data.data);
        setParentSelectOption(allModalData.Tables1);
      } else {
        console.log(data);
      }
    };

    faceParentOptionData();
    // .then((data) => {
    //   if (data.status == true) {
    //     const allModalData = JSON.parse(data.data);
    //     setParentSelectOption(allModalData.Tables1);
    //   } else {
    //     console.log(data);
    //   }
    // });
  }, []);
  return [parentSelectOption, setParentSelectOption];
};

export default useParentOption;
