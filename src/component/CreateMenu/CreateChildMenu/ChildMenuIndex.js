import React, { useMemo, useState } from 'react'
import FilterComponent from '../FilterComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import useChildMenu from '../../customHooks/useChildMenu';
import { Grid } from '@mui/material';
import DataTable from "react-data-table-component";
const ChildMenuIndex = () => {
    const [data, setData] = useChildMenu([]);
  console.log(data)
    const columns = [
      {
        name: "Sl.",
        selector: (data, index) => index + 1,
        center: true,
        width: "60px",
      },
      {
        name: "Menu Name",
        selector: (data) => data.MenuName,
        sortable: true,
        center: true,
      },
      {
        name: "Menu Name",
        selector: (data) => data.SubMenuName,
        sortable: true,
        center: true,
      },
      {
        name: "Buttons",
        button: true,
        width: "200px",
        grow: 2,
        cell: (data) => (
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
                // handleDelete(groupInfoList?.GroupId);
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
    const filteredItems = data?.filter(
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
  </Grid>
  )
}

export default ChildMenuIndex
