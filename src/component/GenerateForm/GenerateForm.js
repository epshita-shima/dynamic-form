import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import "./GenerateForm.css";
import SingleEntryForm from "../SingleEntryForm/SingleEntryForm";
import MyComponent from "../Test/MyComponent";
import Token from "../common/Token";
import { useNavigate } from "react-router-dom";

const GenerateForm = ({formGenerate}) => {
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(true);
  const [singleEntryOpen, setSingleEntryOpen] = useState(false);
  const [openPage,setOpenPage]=useState(false)
  const [modalSpecificData, setModalSpecificData] = useState([]);
  const token = Token.token;
  const navigate=useNavigate()
 


const handlePageValidation=()=>{
  // const modelData = {
  //   procedureName: "",
  //   parameters: {},
  // };
  // modelData.procedureName = "prc_GetMenuList";
  // fetch("https://localhost:44372/api/GetData/GetInitialData", {
  //   method: "POST",
  //   headers: {
  //     authorization: `Bearer ${token}`,
  //     "content-type": "application/json",
  //   },
  //   body: JSON.stringify(modelData),
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     if (data.status == true) {
  //       const allModalData = JSON.parse(data.data);
  //       console.log(allModalData)
  //       setModalSpecificData(allModalData.Tables1);
  //     } else {
  //       console.log(data);
  //     }
  //   });



}
  return (
    <Grid >
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
            handlePageValidation()
            navigate('/single-entry')
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
        <SingleEntryForm
          opens={opens}
          setOpens={setOpens}
          setOpen={setOpen}
        ></SingleEntryForm>
      </Grid>
      {/* <Grid container mt={4}>
        <MyComponent></MyComponent>
      </Grid> */} 
      <Grid className={`${openPage ? "d-visible" : "d-hidden" }`}>
     
      </Grid>
    </Grid>
  );
};

export default GenerateForm;
