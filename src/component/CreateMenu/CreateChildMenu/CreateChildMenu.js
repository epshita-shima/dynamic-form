import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid, TextField } from "@mui/material";
import Select from "react-select";
import useParentDropdown from "../../customHooks/useParentDropdown";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CreateMenu from "../CreateMenu";
import SingleEntryForm from "../../SingleEntryForm/SingleEntryForm";
const CreateChildMenu = () => {
  const [parentSelectOption, setParentSelectOption] = useParentDropdown();
  const [show, setShow] = useState(false);
  const [showSaveData, setShowSaveData] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(showSaveData);
  return (
    <Container>
      <Grid className="shadow-lg p-4">
        <Grid>
          <form>
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
                  onChange={(e) => {}}
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
              style={{ width: "50%" }}
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
                value=""
              ></TextField>
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customSwitch1"
                  onClick={(e) => {
                    const { value, checked } = e.target;
                    if (checked) {
                      console.log("hii");
                      setShowSaveData(1);
                    } else {
                      console.log("bye");
                      setShowSaveData(0);
                    }
                  }}
                />
                <label class="custom-control-label" for="customSwitch1"></label>
              </div>
            </Grid>
            {
               showSaveData=='0'? (<Grid className="mt-3">
                <button
                  type="submit"
                  variant="contained"
                  className="btn-createMenu"
                  style={{ background: "#0A58CA" }}
                >
                  Save
                </button>
              </Grid>):''
            }
            {
                showSaveData=='1' ? (
                    <Grid>
                        <SingleEntryForm></SingleEntryForm>
                    </Grid>
                ):''
            }
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateChildMenu;
