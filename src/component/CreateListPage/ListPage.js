import React, { useEffect, useState } from "react";
import Select from "react-select";
import useChildMenu from "../customHooks/useChildMenu";
import { Token } from "../common/Token";
import "./ListPage.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
const ListPage = () => {
  const navigate=useNavigate()
  const token = Token.token;
  const [childMenu, setChildMenu] = useChildMenu([]);
  const [listName, setListName] = useState([]);
  const [tableValue, setTableValue] = useState("");
  const [singleTableColumnData, setSingleTableColumnData] = useState([]);
  const [singleInputValueDataCheckList, setSingleInputValueDataCheckList] =
    useState([]);
  const [detailsInputValueDataCheck, setDetailsInputValueDataCheck] = useState(
    []
  );
  const [detailsTableColumnData, setDetailsTableColumnData] = useState([]);

  console.log(singleInputValueDataCheckList);
  console.log(detailsInputValueDataCheck);
  console.log(detailsTableColumnData);
  console.log(singleTableColumnData);
  useEffect(() => {
    childMenu.map((item, i) => {
      var dataMenuArr = [];
      var dataMenuArrLength = dataMenuArr.length;
      dataMenuArr[dataMenuArrLength] = {};
      dataMenuArr[dataMenuArrLength]["value"] = item.MenuId;
      dataMenuArr[dataMenuArrLength]["label"] = item.SubMenuName;
      setListName((prev) => {
        const temp__details = [...prev];
        temp__details[i] = dataMenuArr[0];
        return temp__details;
      });
    });
  }, [setListName, childMenu]);

  useEffect(() => {
    const modelDataDetails = {
      procedureName: "prc_GetPageInfoDetails",
      parameters: {
        MenuId: tableValue,
      },
    };
    console.log(modelDataDetails);
    fetch(`https://localhost:44372/api/GetData/GetMultipleDataByParam`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(modelDataDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == true) {
          const showSingleData = JSON.parse(data.data);
          console.log(showSingleData);
          setSingleTableColumnData(showSingleData.Tables1);
          setDetailsTableColumnData(showSingleData.Tables2);
        }
      });
  }, []);

  const handleTableColumn = () => {
    const modelDataDetails = {
      procedureName: "prc_GetPageInfoDetails",
      parameters: {
        MenuId: tableValue,
      },
    };
    console.log(modelDataDetails);
    fetch(`https://localhost:44372/api/GetData/GetMultipleDataByParam`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(modelDataDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == true) {
          const showSingleData = JSON.parse(data.data);
          console.log(showSingleData);
          setSingleTableColumnData(showSingleData.Tables1);
          setDetailsTableColumnData(showSingleData.Tables2);
        }
      });
  };

  const handleSubmit = () => {
    var singleObj = singleInputValueDataCheckList.map((item) => ({
      IsListShow: item.IsListShow,
      IsReportShow: item.IsReportShow,
      PageId: item.PageId,
    }));
    var myJsonString = JSON.stringify(singleObj);
    var detailsObj = detailsInputValueDataCheck.map((item) => ({
      IsListShow: item.IsListShow,
      IsReportShow: item.IsReportShow,
      PageId: item.PageId,
    }));
    var detailsJsonString = JSON.stringify(detailsObj);
    // console.log(myJsonString)
    const modelData = {
      procedureName: "",
      parameters: {
        pageInfoJson: myJsonString,
        pageInfoJsonDetails: detailsJsonString,
      },
    };
    modelData.procedureName = "declareChildPageList";
    console.log(modelData);
    const fatchGetDataById = async () => {
      const response = await fetch(
        "https://localhost:44372/api/GetData/GetDataById",
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(modelData),
        }
      );
      const data = await response.json();
      console.log(JSON.stringify(data));
      navigate('/table-list-data')
    };
    fatchGetDataById();
  };

  return (
    <div className="shadow-lg p-4 mb-5">
      <div style={{ width: "80%" }}>
        <div>
          <h2 className="fs-3">Page list</h2>
        </div>
        <div className="d-flex justify-content-between align-content-center">
          <div className="w-75">
            <Select
              class="form-select w-100"
              className="w-[100%] mt-2"
              //   name={`drop${name}`}
              aria-label="Default select example"
              options={listName}
              //   id={`dropValue${name}`}
              onChange={(e) => {
                console.log(e.value);
                setTableValue(e.value);
              }}
              required
            ></Select>
          </div>
          <button
            className="btn btn-showdata mt-2 ml-2"
            onClick={() => {
              if (tableValue == "") {
                swal({
                  title: "Try again",
                  text: "Please select page",
                  icon: "warning",
                  button: "OK",
                });
              } else {
                handleTableColumn();
              }
            }}
          >
            Show Table
          </button>
         
            <button
              className="btn btn-saveListData mt-2 ml-4"
              onClick={() => {
                handleSubmit();
              }}
            >
              Save
            </button>
         
        </div>
      </div>

      <div>
        {singleTableColumnData.length != 0 ? (
          <div div className="w-75 mx-auto">
            {/* <h3
          className="mt-4 fs-5"
          style={{ letterSpacing: "1px", color: "#495057", fontWeight: "bold" }}
        >
          Single Data Info
        </h3> */}
            <table
              className="table   mt-4"
              style={{ border: "1px solid #677788" }}
            >
              <thead style={{ background: "#E2E4FF" }}>
                <tr>
                  <th
                    colSpan={4}
                    className="align-middle"
                    style={{
                      textAlign: "center",
                      border: "1px solid #677788",
                      background:'#ddffdd'
                    }}
                  >
                    Single Data Info
                  </th>
                </tr>
                <tr style={{ border: "1px solid #677788"}}>
                  <th
                    rowSpan={2}
                    className="align-middle"
                    style={{
                      width: "15px",
                      textAlign: "center",
                      border: "1px solid #677788",
                    }}
                  >
                    Sl
                  </th>
                  <th
                    className="align-middle"
                    rowSpan={2}
                    style={{
                      width: "50px",
                      textAlign: "center",
                      border: "1px solid #677788",
                    }}
                  >
                    Column Name
                  </th>
                  <th
                    colSpan={2}
                    style={{
                      width: "30px",
                      textAlign: "center",
                      border: "1px solid #677788",
                    }}
                  >
                    Selection
                  </th>
                </tr>

                <tr>
                  <th
                    style={{
                      width: "15px",
                      textAlign: "center",
                      border: "1px solid #677788",
                    }}
                  >
                    List Show
                  </th>
                  <th
                    style={{
                      width: "15px",
                      textAlign: "center",
                      border: "1px solid #677788",
                    }}
                  >
                    Report Show
                  </th>
                </tr>
              </thead>
              <tbody style={{ color: "#677788" }}>
                {singleTableColumnData.map((item, i) => {
                  return (
                    <tr>
                      <td
                        className="text-center align-middle"
                        style={{ border: "1px solid #677788" }}
                      >
                        {i + 1}
                      </td>
                      <td
                        className="text-center align-middle"
                        style={{ border: "1px solid #677788" }}
                      >
                        {item.ColumnNameWithSpace}
                      </td>
                      <td
                        className="text-center align-middle"
                        style={{ border: "1px solid #677788" }}
                      >
                        <input
                          type="checkbox"
                          name=""
                          id={`id${i}`}
                          checked={item?.IsListShow}
                          onClick={(e) => {
                            const { checked, value } = e.target;
                            setTableValue((prev) => {
                              return { tableValue: item.PageId };
                            });
                            console.log(item.PageId, item?.IsListShow);
                            setSingleTableColumnData((prev) => {
                              const temp_details = prev;
                              if (checked) {
                                temp_details[i]["IsListShow"] = true;
                              } else {
                                temp_details[i]["IsListShow"] = false;
                              }
                              return temp_details;
                            });
                            setSingleInputValueDataCheckList((prev) => {
                              let temp__details = prev;
                              console.log(temp__details);
                              let temp2 = [];
                              temp2["PageId"] = [];
                              temp2["IsListShow"] = [];
                              temp2["IsReportShow"] = [];
                              temp2["PageId"] = item.PageId;
                              const exists = temp__details.find(
                                (x) => x.PageId == item.PageId
                              );
                              if (exists) {
                                if (e.target.checked) {
                                  temp__details[temp__details.length - 1][
                                    "IsListShow"
                                  ] = 1;
                                } else {
                                  temp__details[temp__details.length - 1][
                                    "IsListShow"
                                  ] = 0;
                                }
                                return temp__details;
                              } else {
                                if (e.target.checked) {
                                  temp2["IsListShow"] = 1;
                                  temp2["IsReportShow"] = 0;
                                } else {
                                  temp2["IsListShow"] = 0;
                                  temp2["IsReportShow"] = 0;
                                }
                                temp__details.push(temp2);

                                return temp__details;
                              }
                            });
                          }}
                        />
                      </td>
                      <td
                        className="text-center align-middle"
                        style={{ border: "1px solid #677788" }}
                      >
                        <input
                          type="checkbox"
                          name=""
                          id={`id${i}`}
                          checked={item?.IsReportShow}
                          onClick={(e) => {
                            const { checked, value } = e.target;
                            setTableValue((prev) => {
                              return { tableValue: item.PageId };
                            });

                            setSingleTableColumnData((prev) => {
                              const temp_details = prev;
                              if (checked) {
                                temp_details[i]["IsReportShow"] = true;
                              } else {
                                temp_details[i]["IsReportShow"] = false;
                              }
                              return temp_details;
                            });

                            setSingleInputValueDataCheckList((prev) => {
                              let temp__details = prev;
                              console.log(temp__details, i);
                              let temp2 = [];
                              temp2["PageId"] = [];
                              temp2["IsListShow"] = [];
                              temp2["IsReportShow"] = [];
                              temp2["PageId"] = item.PageId;
                              const exists = temp__details.find(
                                (x) => x.PageId == item.PageId
                              );
                              if (exists) {
                                if (e.target.checked) {
                                  temp__details[temp__details.length - 1][
                                    "IsReportShow"
                                  ] = 1;
                                } else {
                                  temp__details[temp__details.length - 1][
                                    "IsReportShow"
                                  ] = 0;
                                }
                                return temp__details;
                              } else {
                                if (e.target.checked) {
                                  temp2["IsReportShow"] = 1;
                                  temp2["IsListShow"] = 0;
                                } else {
                                  temp2["IsReportShow"] = 0;
                                  temp2["IsListShow"] = 0;
                                }
                                temp__details.push(temp2);
                                return temp__details;
                              }
                            });
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>

      {detailsTableColumnData.length != 0 ? (
        <>
          <table
            className="table w-75 mx-auto mt-4"
            style={{ border: "1px solid #677788" }}
          >
            <thead style={{ background: "#eef0f7" }}>
            <tr>
                  <th
                    colSpan={4}
                    className="align-middle"
                    style={{
                      textAlign: "center",
                      border: "1px solid #677788",
                      background:'#ddffdd'
                    }}
                  >
                   Details Data Info
                  </th>
                </tr>
              <tr style={{ border: "1px solid #677788" }}>
                <th
                  rowSpan={2}
                  className="align-middle"
                  style={{
                    width: "15px",
                    textAlign: "center",
                    border: "1px solid #677788",
                  }}
                >
                  Sl
                </th>
                <th
                  rowSpan={2}
                  className="align-middle"
                  style={{
                    width: "50px",
                    textAlign: "center",
                    border: "1px solid #677788",
                  }}
                >
                  Column Name
                </th>
                <th
                  colSpan={2}
                  style={{
                    width: "30px",
                    textAlign: "center",
                    border: "1px solid #677788",
                  }}
                >
                  Selection
                </th>
              </tr>
              <tr>
                <th
                  style={{
                    width: "15px",
                    textAlign: "center",
                    border: "1px solid #677788",
                  }}
                >
                  List View
                </th>
                <th
                  style={{
                    width: "15px",
                    textAlign: "center",
                    border: "1px solid #677788",
                  }}
                >
                  Report View
                </th>
              </tr>
            </thead>
            <tbody style={{ color: "#677788" }}>
              {detailsTableColumnData.map((item, i) => {
                return (
                  <tr>
                    <td
                      className="text-center align-middle"
                      style={{ border: "1px solid #677788" }}
                    >
                      {i + 1}
                    </td>
                    <td
                      className="text-center align-middle"
                      style={{ border: "1px solid #677788" }}
                    >
                      {item.ColumnNameWithSpace}
                    </td>
                    <td
                      className="text-center align-middle"
                      style={{ border: "1px solid #677788" }}
                    >
                      <input
                        type="checkbox"
                        name=""
                        id={`id${i}`}
                        checked={item?.IsListShow}
                        onClick={(e) => {
                          const { checked, value } = e.target;
                          setTableValue((prev) => {
                            return { tableValue: item.PageId };
                          });
                          console.log(item.PageId, item?.IsListShow);
                          setDetailsTableColumnData((prev) => {
                            const temp_details = prev;
                            if (checked) {
                              temp_details[i]["IsListShow"] = true;
                            } else {
                              temp_details[i]["IsListShow"] = false;
                            }
                            return temp_details;
                          });
                          setDetailsInputValueDataCheck((prev) => {
                            let temp__details = prev;
                            let temp2 = [];
                            temp2["PageId"] = [];
                            temp2["IsListShow"] = [];
                            temp2["IsReportShow"] = [];
                            temp2["PageId"] = item.PageId;
                            const exists = temp__details.find(
                              (x) => x.PageId == item.PageId
                            );
                            if (exists) {
                              if (e.target.checked) {
                                temp__details[temp__details.length - 1][
                                  "IsListShow"
                                ] = 1;
                              } else {
                                temp__details[temp__details.length - 1][
                                  "IsListShow"
                                ] = 0;
                              }
                              return temp__details;
                            } else {
                              if (e.target.checked) {
                                temp2["IsListShow"] = 1;
                                temp2["IsReportShow"] = 0;
                              } else {
                                temp2["IsListShow"] = 0;
                                temp2["IsReportShow"] = 0;
                              }
                              temp__details.push(temp2);
                              return temp__details;
                            }
                          });
                        }}
                      />
                    </td>
                    <td
                      className="text-center align-middle"
                      style={{ border: "1px solid #677788" }}
                    >
                      <input
                        type="checkbox"
                        name=""
                        id={`id${i}`}
                        checked={item?.IsReportShow}
                        onClick={(e) => {
                          const { checked, value } = e.target;
                          setTableValue((prev) => {
                            return { tableValue: item.PageId };
                          });
                          console.log(item.PageId, item?.IsListShow);
                          setDetailsTableColumnData((prev) => {
                            const temp_details = prev;
                            if (checked) {
                              temp_details[i]["IsReportShow"] = true;
                            } else {
                              temp_details[i]["IsReportShow"] = false;
                            }
                            return temp_details;
                          });
                          setDetailsInputValueDataCheck((prev) => {
                            let temp__details = prev;

                            let temp2 = [];
                            temp2["PageId"] = [];
                            temp2["IsReportShow"] = [];
                            temp2["IsListShow"] = [];
                            temp2["PageId"] = item.PageId;
                            const exists = temp__details.find(
                              (x) => x.PageId == item.PageId
                            );
                            if (exists) {
                              if (e.target.checked) {
                                temp__details[temp__details.length - 1][
                                  "IsReportShow"
                                ] = 1;
                              } else {
                                temp__details[temp__details.length - 1][
                                  "IsReportShow"
                                ] = 0;
                              }
                              return temp__details;
                            }
                            if (e.target.checked) {
                              temp2["IsReportShow"] = 1;
                              temp2["IsListShow"] = 0;
                            } else {
                              temp2["IsReportShow"] = 0;
                              temp2["IsListShow"] = 0;
                            }
                            temp__details.push(temp2);
                            return temp__details;
                          });
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ListPage;
