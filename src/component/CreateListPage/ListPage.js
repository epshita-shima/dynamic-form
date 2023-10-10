import React, { useEffect, useState } from "react";
import Select from "react-select";
import useChildMenu from "../customHooks/useChildMenu";
import { Token } from "../common/Token";
import "./ListPage.css";
import swal from "sweetalert";
const ListPage = () => {
  const token = Token.token;
  const [childMenu, setChildMenu] = useChildMenu([]);
  const [listName, setListName] = useState([]);
  const [tableValue, setTableValue] = useState("");
  const [tableColumnData, setTableColumnData] = useState([]);
  console.log(childMenu);
  useEffect(() => {
    childMenu.map((item, i) => {
      console.log(item);
      var dataMenuArr = [];
      var dataMenuArrLength = dataMenuArr.length;
      dataMenuArr[dataMenuArrLength] = {};
      dataMenuArr[dataMenuArrLength]["value"] = item.MenuId;
      dataMenuArr[dataMenuArrLength]["label"] = item.SubMenuName;
      setListName((prev) => {
        const temp__details = [...prev];
        temp__details[i] = dataMenuArr[0];
        return temp__details;
      });
    });
  }, [setListName, childMenu]);
  console.log(listName);
  // console.log(listName)
  const handleTableColumn = () => {
    const modelDataDetails = {
      procedureName: "prc_GetPageInfoDetails",
      parameters: {
        MenuId: tableValue,
      },
    };
    console.log(modelDataDetails);
    fetch(`https://localhost:44372/api/GetData/GetMultipleDataByParam`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(modelDataDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == true) {
          const showSingleData = JSON.parse(data.data);
          setTableColumnData(showSingleData.Tables1);
        }
      });
  };
  return (
    <div className="shadow-lg p-4">
      <div className="w-50">
        <div>
          <h2 className="fs-3">Page list</h2>
        </div>
        <div className="d-flex justify-content-between align-content-center">
          <div className="w-75">
            <Select
              class="form-select w-100"
              className="w-[100%] mt-2"
              //   name={`drop${name}`}
              aria-label="Default select example"
              options={listName}
              //   id={`dropValue${name}`}
              onChange={(e) => {
                console.log(e.value);
                setTableValue(e.value);
              }}
              required
            ></Select>
          </div>
          <button
            className="btn btn-showdata mt-2"
            onClick={() => {
              if (tableValue == "") {
                swal({
                  title: "Try again",
                  text: "Please select page",
                  icon: "warning",
                  button: "OK",
                });
              } else {
                handleTableColumn();
              }
            }}
          >
            Show Table
          </button>
        </div>
      </div>
      {tableColumnData.length != 0 ? (
        <table
          className="table w-75 mx-auto mt-4"
          style={{ border: "1px solid #677788" }}
        >
          <thead >
            <tr style={{ border: "1px solid #677788" }}>
              <th
                style={{
                  width: "15px",
                  textAlign: "center",
                  border: "1px solid #677788",
                }}
              >
                Sl
              </th>
              <th
                style={{
                  width: "55px",
                  textAlign: "center",
                  border: "1px solid #677788",
                }}
              >
                Column Name
              </th>
              <th
                style={{
                  width: "25px",
                  textAlign: "center",
                  border: "1px solid #677788",
                }}
              >
                Selection
              </th>
            </tr>
          </thead>
          <tbody style={{color:'#677788'}}>
            {tableColumnData.map((item, i) => {
              console.log(item);
              return (
                <tr>
                  <td
                    className="text-center align-middle"
                    style={{ border: "1px solid #677788" }}
                  >
                    {i}
                  </td>
                  <td
                    className="text-center align-middle"
                    style={{ border: "1px solid #677788" }}
                  >
                    {item.ColumnNameWithSpace}
                  </td>
                  <td
                    className="text-center align-middle"
                    style={{ border: "1px solid #677788" }}
                  >
                    <input type="checkbox" name="" id="" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
};

export default ListPage;
