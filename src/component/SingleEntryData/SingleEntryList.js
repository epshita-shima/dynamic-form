import { faArrowsRotate, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import React from 'react'

import Select from "react-select";
import { handleDeleteColumn } from './SingleEntyAddRow';
import './SingleEntryData.css'

const SingleEntryList = ({token,startDate,labelData,setLabelData,setLabelDataCopy,setLabelPosition,showDeleteIcon,setColumnValues,columnValues,setShowDeleteIcon,setModalSpecificData,setOpenModal,labelDataCopy,handleDropdownValue,handleInputValue,modalSpecificData,labelPosition,selectedListName,labelCount,childMenuId, 
  setChildMenuId}) => {
console.log(modalSpecificData)
    const handleModalMenu = () => {
      
        const modelData = {
          procedureName: "",
          parameters: {},
        };
        modelData.procedureName = "prc_GetMenuList";
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
              console.log(allModalData)
              setModalSpecificData(allModalData.Tables2);
            } else {
              console.log(data);
            }
          });
      };
      const handleReplaceCoulmn = (element, i, columnPos) => {
        var radioName = document.querySelector(
          'input[name="replaceField"]:checked'
        ).value;
        console.log(radioName);
        labelData.map((e, pos) => {
          e.map((el, position) => {
            if (position == i) {
              var wheredata = el.PageId;
    
              console.log(e, element);
    
              var updateColumnModel = {
                dbName: "DynamicDemo",
                tableName: "PageInfo",
                columnData: "ColumnType",
                valueData: radioName,
                whereColumnNameData: "PageId",
                whereData: wheredata + "",
              };
              var updateTableModel = {
                dbName: "DynamicDemo",
                tableName: "PageInfo",
                columnData: "RelatedTable",
                valueData: selectedListName,
                whereColumnNameData: "PageId",
                whereData: wheredata + "",
              };
    
              el.ColumnType = radioName;
              if (updateColumnModel.valueData == "datetime") {
                el.ColumnValue = new Date().toLocaleDateString("fr-CA");
              } else {
                el.ColumnValue = "";
              }
    
              fetch("http://localhost:53601/DBCommand/Update", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(updateColumnModel),
              })
                .then((res) => {
                  console.log(res);
                  res.json();
                })
                .then((data) => {
                  console.log(data);
                })
                .catch((err) => {
                  console.log(err);
                });
    
              if (radioName == "dropdown") {
                fetch("http://localhost:53601/DBCommand/Update", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(updateTableModel),
                })
                  .then((res) => {
                    console.log(res);
                    res.json();
                  })
                  .then((data) => {
                    console.log(data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }
          });
        });
    
        setLabelData(labelData);
        setLabelData((prevArr) => {
          const result = [...prevArr];
          return result;
        });
    
        labelDataCopy.map((e, pos) => {
          e.map((el, position) => {
            if (position == i) {
              el.ColumnType = radioName;
              if (radioName == "datetime") {
                el.ColumnValue = new Date().toLocaleDateString("fr-CA");
              } else {
                el.ColumnValue = "";
              }
            }
          });
        });
    
        setLabelDataCopy(labelDataCopy);
        setLabelDataCopy((prevArr) => {
          const result = [...prevArr];
          return result;
        });
      };
    
  return (
  <div className='table-container'>
    <h2 className='fs-3 mb-2'>Details Information</h2>
      <table className={`table table-size`} style={{width: labelCount > 5 ? '2448px' : '100%',border:'2px solid gray'}}>
    <thead>
      <tr  style={{border:'2px solid gray'}} >
      <th scope="col" style={{width:'70px',textAlign:'center',border:'2px solid gray'}}>SL</th>
        {labelData?.map((item, i) => {
          if (i == 0) {
            return item?.map((element, index) => {
              console.log(element)
              const str = element?.ColumnNameWithSpace;
              let str2 = str.split(' ');
              for (let i = 0; i < str2.length; i++) {
                str2[i] = str2[i][0]?.toUpperCase() + str2[i].substr(1);
              }
            
              return (
                <th
                  scope="col"
                  className={`dropTh${index}`}
                  draggable="true"
                  style={{border:'2px solid gray'}}
                >
                  <div className="d-flex justify-content-between align-items-center" >
                    <TextField
                      id={`box${index}`}
                      name="L"
                      label={`${str2.join(' ')}`}
                      variant="standard"
                      disabled
                      InputLabelProps={{
                        className: `textField_label `,
                      }}
                      className={`box${index} `}
                      style={{ marginLeft: "15px" }}
                      onChange={(e) => {}}
                    />

                    <FontAwesomeIcon
                      icon={faArrowsRotate}
                      data-toggle="modal"
                      data-target={`#exampleModal${index}`}
                      data-id={index}
                      onClick={() => {
                        setLabelPosition(index);
                      }}
                    ></FontAwesomeIcon>
                    {showDeleteIcon ? (
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="ms-2 bg-danger p-1 text-white"
                        style={{
                          borderRadius: "50px",
                          padding: "10px",
                        }}
                        onClick={() => {
                          handleDeleteColumn({setColumnValues,element,setLabelData,index,setLabelDataCopy,setShowDeleteIcon})
                        }}
                      ></FontAwesomeIcon>
                    ) : (
                      ""
                    )}

                    <div
                      className="modal fade"
                      id={`exampleModal${index}`}
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby={`exampleModal${index}Label`}
                      // aria-hidden="true"
                    >
                      {/* {openModal ? ( */}
                      <div
                        className="modal-dialog"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id={`exampleModal${index}Label`}
                            >
                              What you like to replace this
                              field with?
                            </h5>
                            <button
                              type="button"
                              data-dismiss="modal"
                            >
                              <span
                              //  aria-hidden="true"
                              >
                                &times;
                              </span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  <input
                                    type="radio"
                                    value="textbox"
                                    name="replaceField"
                                    aria-label="Radio button for following text input"
                                  />
                                </div>
                              </div>
                              <input
                                id="inputField"
                                type="text"
                                placeholder="textbox"
                                className="form-control"
                                aria-label="Text input with radio button"
                              />
                            </div>
                            <div className="input-group  mt-2">
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  <input
                                    type="radio"
                                    name="replaceField"
                                    value="dropdown"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    onClick={() => {
                                      handleModalMenu();
                                      setOpenModal(false);
                                    }}
                                  ></input>
                                </div>
                              </div>
                              <div className="w-75">
                                <div draggable="false">
                                  <Select
                                    className="form-select"
                                    class="w-[100%]"
                                    aria-label="Default select example"
                                    // options={selectedOption[name]}
                                  ></Select>
                                </div>
                                <div
                                  className="droptarget"
                                  style={{
                                    display: "none",
                                  }}
                                  draggable="false"
                                >
                                  Drop
                                </div>
                              </div>
                            </div>
                            <div className="input-group mt-2">
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  <input
                                    type="radio"
                                    value="checkbox"
                                    name="replaceField"
                                    aria-label="Radio button for following text input"
                                  />
                                </div>
                              </div>
                              <FormGroup>
                                <FormControlLabel
                                  id="checkboxField"
                                  name={`item.${i}.check`}
                                  style={{
                                    marginTop: "3px",
                                  }}
                                  control={
                                    <Checkbox
                                      defaultChecked
                                    />
                                  }
                                  label="Label"
                                />
                              </FormGroup>
                            </div>
                            <div className="input-group mt-2">
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  <input
                                    type="radio"
                                    value="radiobutton"
                                    name="replaceField"
                                    aria-label="Radio button for following text input"
                                  />
                                </div>
                              </div>
                              <input
                                type="text"
                                name={`radio`}
                                placeholder="Radio"
                                className="form-control"
                                style={{
                                  marginLeft: "3px",
                                }}
                                onChange={(e) => {}}
                              />
                            </div>
                            <div className="input-group mt-2">
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  <input
                                    type="radio"
                                    value="datetime"
                                    name="replaceField"
                                    aria-label="Radio button for following text input"
                                  />
                                </div>
                              </div>
                              <TextField
                                id="date"
                                type="date"
                                defaultValue={startDate}
                                size="small"
                              />
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary close"
                              data-dismiss="modal"
                              aria-label="Close"
                              onClick={(e) => {
                                handleReplaceCoulmn(
                                  item,
                                  index,
                                  i
                                );
                              }}
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* ) : (
                          ""
                        )} */}
                    </div>
                  </div>

                  <div
                    className="droptargettd"
                    style={{ display: "none" }}
                    draggable="false"
                  >
                    Drop
                  </div>
                </th>
              );
            });
          }
        })}
        <th scope="col" className='text-center' style={{border:'2px solid gray'}}>Action</th>
      </tr>
    </thead>

    <tbody className=''>
      {labelData.map((item, index) => {
        
        return (
          <tr id={`tr${index}`} 
          style={{border:'2px solid gray'}}
          >
            <td className='text-center align-middle'  style={{border:'2px solid gray'}}>{index+1}</td>
            {item.map((element, i) => {
              return handleInputValue(element, i, index);
            })}
            <td className="text-center" 
            style={{border:'2px solid gray'}}
            >
              <Button
                id={`delete${index}`}
                variant="contained"
                style={{
                  background: "red",
                  marginTop: "3px",
                  borderRadius: "50px",
                }}
                onClick={(e) => {
                    if(columnValues.length>1){
                        setColumnValues((prev) => {
                            const temp__details = [...prev];
                            temp__details.splice(index, 1);
                            return temp__details;
                          });
                    }
                  if(labelData.length > 1){
                    setLabelData((prev) => {
                        const temp__details = [...prev];
                        console.log(temp__details);
                        temp__details.splice(index, 1);
                        return temp__details;
                      });
                  }
  
                }}
              >
                X
              </Button>
            </td>
            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title"
                      id="exampleModalLabel"
                    >
                      Modal title
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    >
                      <span aria-hidden="true">
                        &times;
                      </span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {modalSpecificData
                      .filter(
                        (person) =>
                          person.MenuName === "Master Entry"
                      )
                      .map((filteredPerson) => (
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <input
                                type="radio"
                                value={ filteredPerson.SubMenuName}
                                name="dropValueField"
                                aria-label="Radio button for following text input"
                                onClick={(e) => {
                                  setChildMenuId(filteredPerson.MenuId);
                                }}
                              />
                            </div>
                          </div>
                          <h4 className="ms-2">
                            {filteredPerson.SubMenuName}
                          </h4>
                        </div>
                      ))}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={() => {
                        handleDropdownValue(labelPosition);
                        setOpenModal(true);
                      }}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </tr>
        );
      })}
    </tbody>
  </table>
  </div>
  )
}

export default SingleEntryList
