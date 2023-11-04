import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, TextField } from "@mui/material";
import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "../FilterComponent";
import "./CreateMenu.css";
import swal from "sweetalert";
import Token from "../../common/Token";
import useParentMenu from "../../customHooks/useParentMenu";

const CreateMenu = ({ handleClose }) => {
  const [data, setData] = useParentMenu([]);
  const [userInput, setUserInput] = useState({ MenuName: "" });
  const [updateButton, setUpdateButton] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const [menuId, setMenuId] = useState("");
console.log(data)
  const token = Token.token;
  const modelData = {
    procedureName: "",
    parameters: {},
  };

  modelData.procedureName = "prc_GetMenuList";
  const modelDataLabel = {
    procedureName: "",
    parameters: {},
  };
  modelDataLabel.procedureName = "InsertDynamicMenuTable";
  modelDataLabel.parameters = {
    DBName: "DynamicDemo",
    TableName: "tblMenu",
    ColumnData:
      "MenuId,MenuName, SubMenuName, UiLink, isActive, ysnParent, OrderBy, MakeDate, MenuLogo",
    ValueData: `newId(),'${userInput.MenuName}','${userInput.MenuName}','#','1','1','13',getdate(),'logo'`,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    {
      updateButton
        ? setUpdateData({ ...updateData, ["MenuName"]: value })
        : setUserInput({ ...userInput, ["MenuName"]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(modelDataLabel);
    if (updateButton == false) {
      if (userInput.MenuName == "") {
        swal({
          title: "Not Possible!",
          text: "Please give menu name",
          icon: "warning",
          button: "OK",
        });
        return;
      } else {
        fetch("https://localhost:44372/api/GetData/GetDataById", {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(modelDataLabel),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status == true) {
              swal({
                title: "Create parent menu successfully",
                icon: "success",
                button: "OK",
              });
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
                    console.log(allModalData);
                    setData(allModalData.Tables1);
                  } else {
                    console.log(data);
                  }
                });
            }
          });
        // setData([...data, userInput]);
        setUserInput({ MenuName: "" });
      }
    } else {
      const modelUpdate = {
        tableName: "",
        columnNames: "",
        queryParams: "",
        whereParams: "",
      };
      modelUpdate.tableName = "tblMenu";
      modelUpdate.queryParams = { MenuName: updateData?.MenuName };
      modelUpdate.whereParams = { MenuId: menuId };
      console.log(modelUpdate);
      fetch(`https://localhost:44372/api/MasterEntry/Update`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(modelUpdate),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == true) {
            swal({
              title: "Update successfully",
              icon: "success",
              button: "Ok",
            });
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
                  console.log(allModalData);
                  setData(allModalData.Tables1);
                } else {
                  console.log(data);
                }
              });
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
  };
  const handleGetUpdateData = (id) => {
    setMenuId(id);
    const modelGetUpdateData = {
      tableName: "",
      columnNames: "",
      queryParams: "",
      whereParams: "",
    };
    modelGetUpdateData.tableName = "tblMenu";
    modelGetUpdateData.columnNames = "[MenuName],[SubMenuName]";
    modelGetUpdateData.queryParams = "";
    modelGetUpdateData.whereParams = { MenuId: id };
    console.log(modelGetUpdateData);
    fetch(`https://localhost:44372/api/MasterEntry/GetByColumns`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(modelGetUpdateData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == true) {
          const updateData = JSON.parse(data.data);
          setUpdateData(updateData[0]);
        } else {
          console.log(data);
          swal({
            title: "Data not found",
            text: "Something is worng",
            icon: "warning",
            button: "OK",
          });
        }
      });
  };


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
              if (updateButton == false) {
                setUpdateButton(true);
                handleGetUpdateData(data.MenuId);
              } else {
                setUpdateButton(false);
              }
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
          </button>
          {/* <button
            className="ml-2"
            style={{
              fontSize: "23px",
              backgroundColor: "transparent",
              border: "none",
              color: "red",
            }}
            onClick={() => {
              handleDelete(data?.MenuId);
            }}
          >
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </button> */}
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
    <Grid className="shadow-lg p-4">
      <Grid>
        <form onSubmit={handleSubmit}>
          <label
            style={{ color: "#878A99", fontSize: "20px", marginRight: "5px" }}
          >
            Create Master Menu:
          </label>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            size="small"
            value={updateButton ? updateData?.MenuName : userInput.MenuName}
            onChange={handleChange}
          ></TextField>
          <button
            type="button"
            variant="contained"
            className="btn-createMenu"
            style={{ background: "#34C38F", marginLeft: "40px" }}
            onClick={() => {
              setUserInput({ ...userInput, ["MenuName"]: "" });
            }}
          >
            Clear
          </button>
          {updateButton ? (
            <button
              type="submit"
              variant="contained"
              className="btn-createMenu"
              style={{ marginLeft: "10px", background: "#F06548" }}
              onClick={() => {}}
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              variant="contained"
              className="btn-createMenu"
              style={{ marginLeft: "10px", background: "#0A58CA" }}
            >
              Save
            </button>
          )}
        </form>
      </Grid>
      <Grid className="mt-4">
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
    </Grid>
  );
};

export default CreateMenu;
