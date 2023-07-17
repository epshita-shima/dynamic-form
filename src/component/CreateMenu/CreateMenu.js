import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, TextField } from "@mui/material";
import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import "./CreateMenu.css";
const CreateMenu = () => {
const [data,setData]=useState([{}]);
const [inputData,setInputData]=useState('')
console.log(data)
const handleCreateMenu=()=>{
    var dataObject=0;
    if (data != null) {
        dataObject= Object.keys(data).length;
      }
    //   setData[dataObject]= inputData
      setData({ ...data, [dataObject]:inputData })
    //   setData(inputData)
// 
    }
  const columns = [
    {
      name: "Sl.",
      selector: (row) => row.title,
    },
    {
      name: "Menu Name",
      selector: (row) => row.year,
    },
    {
      name: "Buttons",
      button: true,
      width: "200px",
      grow: 2,
      cell: (groupInfoList) => (
        <div>
          <a target="_blank" style={{ fontSize: "23px" }} href="">
            <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
          </a>
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

//   const data = [
//     {
//       id: 1,
//       title: "Beetlejuice",
//       year: "1988",
//     },
//     {
//       id: 2,
//       title: "Ghostbusters",
//       year: "1984",
//     },
//   ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
//   const filteredItems = data?.filter(
//     (item) =>
//       JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
//       -1
//   );

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
    <Grid className="shadow-lg p-5">
      <Grid>
        <label
          style={{ color: "#8799C4", fontSize: "20px", marginRight: "5px" }}
        >
          Master Menu Name:
        </label>
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="text"
          size="small"
          onChange={(e)=>{
            setInputData(e.target.value)
          }}
        ></TextField>
        <button
          variant="contained"
          className="btn-createMenu"
          style={{ background: "#34C38F", marginLeft: "40px" }}
        >
          Clear
        </button>
        <button
          variant="contained"
          className="btn-createMenu"
          style={{ marginLeft: "10px", background: "#0A58CA" }}
          onClick={()=>{
            handleCreateMenu()
          }}
        >
          Save
        </button>
      </Grid>
      <Grid className="mt-4">
        <DataTable
        //   title="Master Menu List"
          columns={columns}
        //   data={data}
          defaultSortField="name"
          customStyles={customStyles}
          striped
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
        />
      </Grid>
    </Grid>
  );
};

export default CreateMenu;
