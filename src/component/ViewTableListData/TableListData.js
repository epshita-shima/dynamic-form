import { Grid } from "@mui/material";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import React, { useEffect, useMemo, useState } from "react";
import {
  faEye,
  faPenToSquare,
  faPlus,
  faPrint,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import Token from "../common/Token";
import swal from "sweetalert";
const TableListData = () => {
  const [tableListData, setTableListData] = useState([]);
  const [heading, setHeading] = useState([]);
  const token = Token.token;
  const search = useLocation();
  const link = search.pathname.split("/");
  let tableName = link[1];
  let id = link[2];
console.log(link)
console.log(heading)
  console.log(tableListData)
  useEffect(() => {
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
            if (pos == 0) {
              arraykeys.push(...Object.keys(i));
            }
            pos++;
          }
          setHeading(arraykeys);
        }
      });
  }, [setTableListData, id, token]);

  const columns_custom = heading?.map((key, id) => {
    // let arr = [];
    // let arraykeys=[]
    // for (let i of tableListData) {
    //    arr.push(...Object.values(i))
    //    arraykeys.push(...Object.keys(i))
    // }
    // console.log(arr)
    // console.log(arraykeys)
    // return JSON.stringify(arr)
    //     var a = [];
    //     Object.values(key).map((key1, id)=>{
    //       console.log(key1)
    // //       Object.values(key1).map((key2, id)=>{
    // // console.log(key2)
    // //       })

    // a.push({
    //   name:key1,
    //   selector: key1,
    // })

    //       }
    //     )
    //     console.log(a)
    //     return a;
    return {
      name: key,
      selector: key,
      sortable: true,
      center: true,
    };
  });
  console.log(columns_custom)
const navigate=useNavigate()
  const columns = [
    {
      name: "Sl.",
      selector: (users, index) => index + 1,
      center: true,
      width: "60px",
    },
    ...columns_custom,
    {
      name: "Buttons",
      button: true,
      width: "130px",
      grow: 2,
      cell: (heading) => (
        <div>
          <a target="_blank" style={{ fontSize: "23px", color:'#FC6294'}} href="">
            <FontAwesomeIcon
              icon={faPrint}
              onClick={() => {
                //   setUpdateButton(true)
              }}
            ></FontAwesomeIcon>
          </a>
          <button
            className="ml-2"
            // href={}
            style={{
              fontSize: "23px",
              backgroundColor: "transparent",
              border: "none",
              color: "#58355F",
            }}
            onClick={() => {
              navigate(`/add-list/${id}/&${heading?.id}`)
              //   if (updateButton == false) {
              //     setUpdateButton(true);
              //     handleGetUpdateData(data.MenuId);
              //   } else {
              //     setUpdateButton(false);
              //   }
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
          </button>
          <button
            className="ml-2"
            style={{
              fontSize: "23px",
              backgroundColor: "transparent",
              border: "none",
              color: "red",
            }}
            onClick={() => {
              handleDelete(heading);
            }}
          >
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    title: {
      style: {
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        textAlign: "center",
       fontFamily:' "Times New Roman", Times, serif',
       fontWeight:'400'
      },
    },
    headCells: {
      style: {
        background: "linear-gradient(to bottom, #FC6294,#58355F)",
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      },
    },
    cells: {
      style: {
        borderRight: "1px solid #58355F",
        // borderBottom: "1px solid #58355F",
      },
    },
  };
  
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = tableListData?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const handleDelete = (tableData) => {
  
    const modelDelete = {
      tableName:'',
      columnNames:'',
      queryParams:'',
      whereParams:''
   }
   modelDelete.tableName = tableName;
    modelDelete.whereParams = { id: tableData.id };
    console.log(modelDelete)
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this record",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              fetch(`https://localhost:44372/api/MasterEntry/Delete`, {
                method: "DELETE",
                headers: {
                  authorization: `Bearer ${token}`,
                  "content-type": "application/json",
                },
                body: JSON.stringify(modelDelete),
              })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                  if (data.status === true && data.messageType == "Success") {
                    swal("Delete success", {
                      icon: "success",
                    });
                    const remaining=tableListData?.filter((x)=>x.id !=tableData.id)
                    console.log(remaining)
                    setTableListData(remaining)
                  } else {
                    console.log(data);
                    swal({
                      title: "Try again",
                      text: "Something is worng",
                      icon: "warning",
                      button: "OK",
                    });
                  }
                });
            }
          });
  };
  return (
    <Grid className="shadow-lg h-100">
      {tableListData.length == "" ? (
        <div class="card" style={{ border: "2px solid red" }}>
          <div class="card-body" >
            <span
              class="card-text text-decoration-none text-dark"
              style={{ display: "flex", alignItems: "center" }}
            >
              There is no list page for this menu. Please{" "}
              <span
                style={{
                  textDecoration: "underline",
                  marginLeft: "2px",
                  color: "blue",
                }}
                onClick={()=>{navigate("/list-page")}}
              >
                click here
              </span>
            </span>
          </div>
        </div>
      ) : (
        <DataTable
          //   title="Master Menu List"
          columns={columns}
          data={filteredItems}
          defaultSortField="name"
          customStyles={customStyles}
          striped
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
        />
      )}
    </Grid>
  );
};

export default TableListData;
