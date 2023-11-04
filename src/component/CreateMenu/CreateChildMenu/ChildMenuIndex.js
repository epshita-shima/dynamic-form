import React, { useMemo, useState } from 'react'
import FilterComponent from '../FilterComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import useChildMenu from '../../customHooks/useChildMenu';
import { Grid } from '@mui/material';
import DataTable from "react-data-table-component";
import swal from 'sweetalert';
import Token from '../../common/Token';
const ChildMenuIndex = () => {
    const [childData, setChildData] = useChildMenu([]);
    const token = Token.token;
  console.log(childData)
  const handleDelete=(id,tableName)=>{
    let newString = tableName.replace("-", "_");
    const spaceRemove = newString.split(" ").join("");
    const tableNameLowerCase = spaceRemove.toLowerCase();
    console.log(tableNameLowerCase)
    const modelDelete = {
      procedureName: "prc_DeleteChildTable",
      parameters: {
        MenuId: id,
      },
    };
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this record",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              fetch(`https://localhost:44372/api/GetData/GetMultipleDataByParam`, {
                method: "POST",
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
                    const remaining=childData?.filter((x)=>x.MenuId !=id)
                    console.log(remaining)
                    setChildData(remaining)
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


    const columns = [
      {
        name: "Sl.",
        selector: (childData, index) => index + 1,
        center: true,
        width: "60px",
      },
      {
        name: "Menu Name",
        selector: (childData) => childData.MenuName,
        sortable: true,
        center: true,
      },
      {
        name: "Submenu Name",
        selector: (childData) => childData.SubMenuName,
        sortable: true,
        center: true,
      },
      {
        name: "Buttons",
        button: true,
        width: "200px",
        grow: 2,
        cell: (childData) => (
          <div>
            {/* <a target="_blank" style={{ fontSize: "23px" }} href="">
              <FontAwesomeIcon icon={faPenToSquare} onClick={()=>{
                setUpdateButton(true)
              }}></FontAwesomeIcon>
            </a> */}
            <button
              className="ml-2"
              style={{
                fontSize: "23px",
                backgroundColor: "transparent",
                border: "none",
                color: "blue",
              }}
              onClick={() => {
               
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
                handleDelete(childData.MenuId,childData.SubMenuName);
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
        },
      },
      headCells: {
        style: {
          backgroundColor: "#5A6691",
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
        },
      },
      cells: {
        style: {
          borderRight: "1px solid #5A6691",
        },
      },
    };
  
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] =
      React.useState(false);
    const filteredItems = childData?.filter(
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
  
  return (
    <Grid className="shadow-lg p-5" >
    <h2  style={{ color: "#878A99", fontSize: "25px",fontWeight:'bold' }}>Child Menu List</h2>
    <DataTable
        // title="Child Menu List"
      columns={columns}
      data={filteredItems}
      defaultSortField="name"
      customStyles={customStyles}
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
    />
  </Grid>
  )
}

export default ChildMenuIndex
