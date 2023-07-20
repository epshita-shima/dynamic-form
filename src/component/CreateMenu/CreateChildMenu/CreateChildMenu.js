import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid, TextField } from "@mui/material";
import Select from "react-select";
import useParentDropdown from "../../customHooks/useParentDropdown";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CreateMenu from "../CreateMenu";
import SingleEntryForm from "../../SingleEntryForm/SingleEntryForm";
import './CreateMenuChild.css'
import Token from "../../common/Token";
import swal from "sweetalert";

const CreateChildMenu = () => {
  const [parentSelectOption, setParentSelectOption] = useParentDropdown();
  const [show, setShow] = useState(false);
  const [showSaveData, setShowSaveData] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [parentMenuName,setParentMenuName]=useState({ MenuName: "" })
  const [ childMenuName,setChildMenuName]=useState({ SubMenuName: "" })
 
  const token=Token.token;
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
      "MenuName, SubMenuName, UiLink, isActive, ysnParent, OrderBy, MakeDate, MenuLogo",
    ValueData: `'${parentMenuName.MenuName}','${childMenuName.SubMenuName}','#','1','1','13',getdate(),'logo'`,
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    if (childMenuName.SubMenuName == "" || parentMenuName.MenuName=='') {
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
            handleClose()
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
                  // setData(allModalData.Tables1);
                } else {
                  console.log(data);
                }
              });
          }
        });
      // setData([...data, userInput]);
      setParentMenuName({ MenuName: "" });
      setChildMenuName({SubMenuName:''})
    }


  }
  return (
    <Container>
      <Grid className="shadow-lg p-4 mt-4">
        <Grid>
          <form noValidate
      class="bg-white shadow-lg  p-5 mt-4"
      onSubmit={ handleSubmit}>
            <Grid
              className="d-flex justify-content-between align-items-center"
              style={{ width: "60%" }}
            >
              <label
                style={{
                  color: "#878A99",
                  fontSize: "20px",
                  marginRight: "5px",
                }}
              >
                Create Parent Menu:
              </label>
              <div className="w-50">
                <Select
                  class="form-select "
                  className="w-100 footerColor"
                  name={`drop`}
                  aria-label="Default select example"
                  options={parentSelectOption}
                  id={`dropValue}`}
                  onChange={(e) => {
                    setParentMenuName({ ...childMenuName, ["MenuName"]: e.value })
                  }}
                  required
                ></Select>
              </div>
              <FontAwesomeIcon
                icon={faPlusCircle}
                className="footerColor fs-4"
                onClick={handleShow}
              ></FontAwesomeIcon>
            </Grid>
            <>
              <Modal
                show={show}
                size="lg"
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header>
                  <Modal.Title>Master Menu</Modal.Title>
                  <button
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                    onClick={handleClose}
                  >
                    X
                  </button>
                </Modal.Header>
                <Modal.Body>
                  <CreateMenu handleClose={handleClose}></CreateMenu>
                </Modal.Body>
              </Modal>
            </>
            <Grid
              className="d-flex justify-content-between align-items-center mt-3"
              style={{ width: "80%" }}
            >
              <label
                style={{
                  color: "#878A99",
                  fontSize: "20px",
                  marginRight: "5px",
                }}
              >
                Create Child Menu:
              </label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="text"
                size="small"
                value={childMenuName.MenuName}
                onChange={(e)=>{
                  const { name, value } = e.target;
                  setChildMenuName({ ...childMenuName, ["SubMenuName"]: value })
                }}
              ></TextField>

              <div class="custom-control custom-switch custom-switch-md">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customSwitch1"
                  onClick={(e) => {
                    const { value, checked } = e.target;
                    if (checked) {
                      setShowSaveData(1);
                    } else {
                      setShowSaveData(0);
                    }
                  }}
                />
                <label class="custom-control-label" for="customSwitch1" style={{fontSize:'20px',color: showSaveData=='1' ? "#F06548" :"#01F9C6"}}>
                  {
                    showSaveData=='1' ? 'Child Menu' : "Parent Menu"
                  }
                </label>
              </div>
            </Grid>
            {
               showSaveData=='0'? (<Grid className="mt-4">
                <button
                  type="submit"
                  variant="contained"
                  className="btn-createMenu"
                  style={{ background: "#0A58CA" }}
                >
                  Save
                </button>
                <button
              type="submit"
              variant="contained"
              className="btn-createMenu"
              style={{ marginLeft: "10px", background: "#F06548" }}
              onClick={()=>{
              }}
            >
             Clear
            </button>
              </Grid>):''
            }
            
          </form>
          {
                showSaveData=='1' ? (
                    <Grid>
                        <SingleEntryForm></SingleEntryForm>
                    </Grid>
                ):''
            }
        </Grid>
        
      </Grid>
    </Container>
  );
};

export default CreateChildMenu;
