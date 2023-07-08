import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./CreatePage.css";
import GenerateForm from "../GenerateForm/GenerateForm";
import { useNavigate } from "react-router-dom";
const CreatePage = () => {
  const [openPage, setOpenPage] = useState(false);
  const [formGenerate, setFormGenerate] = useState(false);
  const menuId = "16";
  const menuName = "Category Information";
  const nevigate = useNavigate();

  const mainData = [
    {
      MenuId: "15",
      ColumnName: "ItemName",
      ColumnType: "dropdown",
      CalculationType: null,
      CalculationKey: null,
      CalculationFormula: null,
    },

    {
      MenuId: "15",
      ColumnName: "Sub Category",
      ColumnType: "dropdown",
      CalculationType: null,
      CalculationKey: null,
      CalculationFormula: null,
    },

    {
      MenuId: "15",
      ColumnName: "rate",
      ColumnType: "dropdown",
      CalculationType: "dynamic",
      CalculationKey: "rate",
      CalculationFormula:
        '{\r\n\t"Field": "qty,rate",\r\n\t"Target": "amount",\r\n\t"…\t"FormulaType": "*",\r\n\t\t"Field2": "rate"\r\n}]\r\n\r\n}',
    },

    {
      MenuId: "15",
      ColumnName: "amount",
      ColumnType: "textbox",
      CalculationType: "dynamic",
      CalculationKey: "amount",
      CalculationFormula: null,
    },

    {
      MenuId: "15",
      ColumnName: "date",
      ColumnType: "datetime",
      CalculationType: null,
      CalculationKey: null,
      CalculationFormula: null,
    },
  ];

  useEffect(() => {
    const searchResults = mainData.filter((x) => x.MenuId == menuId);
    if (searchResults == "") {
      nevigate("/generate-form");
    } else {
      nevigate("/");
    }
  }, [menuId]);

  const data = [
    {
      MenuId: 1,
      MenuName: "Dashboard",
      SubMenuName: "Dashboard",
      UiLink: "/dashboard",
      ysnParent: true,
    },

    {
      MenuId: 16,
      MenuName: "Master Entry",
      SubMenuName: "Category Information",
      UiLink: "/category-info-list",
      ysnParent: false,
    },

    {
      MenuId: 17,
      MenuName: "Master Entry",
      SubMenuName: "Sub-Category Information",
      UiLink: "/sub-category-info-list",
      ysnParent: false,
    },

    {
      MenuId: 18,
      MenuName: "Master Entry",
      SubMenuName: "Item Information",
      UiLink: "/item-info-list",
      ysnParent: false,
    },

    {
      MenuId: 8,
      MenuName: "Master Entry",
      SubMenuName: "Ledger List",
      UiLink: "/ledger-list",
      ysnParent: false,
    },
  ];
  
  //   const handlePageCreate = () => {
  //     const searchMasterEntry = data.filter((x) => x.MenuName == "Master Entry");
  //     const searchResult = searchMasterEntry.filter(
  //       (x) => x.SubMenuName == "Item Informations"
  //     );
  //     if (searchResult == "") {
  //       setFormGenerate(true);
  //       setOpenPage(false);
  //     } else {
  //       setFormGenerate(false);
  //       setOpenPage(true);
  //     }
  //   };
  
  return (
    <Grid>
      <Grid className="create-page">
        <Button
          variant="contained"
          onClick={() => {
            //   handlePageCreate();
          }}
        >
          Create Page
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreatePage;
