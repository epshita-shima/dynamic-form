import { Button ,Grid} from "@mui/material";
import React, { useState } from "react";
import "./GenerateForm.css";
import Swal from "sweetalert2";
import SingleEntryForm from "../SingleEntryForm/SingleEntryForm";
import { Link } from "react-router-dom";
const GenerateForm = () => {
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(true);
  const [singleEntryOpen, setSingleEntryOpen] = useState(false);

  return (
    <Grid className={`${opens ? "d-visible" : "d-hidden"}`}>
      <Grid className="genetate-main">
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Form Generate
        </Button>
        
      </Grid>
      <Grid className={`genetate-main  ${open ? "d-visible" : "d-hidden"}`}>
          <Button
            variant="contained"
            style={{ background: "indigo" }}
            onClick={() => {
              setSingleEntryOpen(true);
            }}
          >
            {/* <Link to="single-entry" style={{color:'white', textDecoration:'none' }}>Single Form Entry</Link> */}
            Single Form Entry
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: "10px", background: "purple" }}
          >
            Single Form with Details
          </Button>
          
        </Grid>
        <Grid className={`${singleEntryOpen ? "d-visible" : "d-hidden"}`}>
            <SingleEntryForm opens={opens} setOpens={setOpens} setOpen={setOpen}></SingleEntryForm>
          </Grid>
    </Grid>
  );
};

export default GenerateForm;
