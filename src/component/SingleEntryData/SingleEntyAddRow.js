import swal from "sweetalert";

export const handleAddRow=({columnValues,setGetDate,getDate,twoDimensionData,setLabelData,labelDataCopy,setTwoDimentionData})=>{
  console.log(columnValues)
  columnValues[columnValues?.length] = {};
  setGetDate([...getDate, new Date()]);
  twoDimensionData[twoDimensionData.length] = [];
  setLabelData((prevArr) => {
    const result = [...prevArr];

    result[0].map((element, i) => {
      if (element.ColumnType == "datetime") {
        twoDimensionData[twoDimensionData.length - 1][i] =
          new Date();
      }
      columnValues[columnValues.length - 1][
        element.ColumnName
      ] = "";
    });

    var tempdatanewrow = JSON.parse(
      JSON.stringify(labelDataCopy[0])
    );
    result.push(tempdatanewrow);
    console.log(result);
    return result;
  });
  setTwoDimentionData(twoDimensionData);
}

export const handleDeleteColumn=({setColumnValues,element,setLabelData,index,setLabelDataCopy,setShowDeleteIcon})=>{
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this record",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      setColumnValues((prev) => {
        const temp__details = [
          ...prev,
        ];
        // temp__details.splice(1, 1);
        temp__details.map(
          (item) => {
            delete item[
              element.ColumnName
            ];
          }
        );
        return temp__details;
      });
      setLabelData((prev) => {
        const temp__details = [
          ...prev,
        ];
        temp__details.map(
          (item) => {
            item.splice(index, 1);
          }
        );
        return temp__details;
      });
      setLabelDataCopy((prev) => {
        const temp__details = [
          ...prev,
        ];
        temp__details.map(
          (item) => {
            item.splice(index, 1);
          }
        );
        return temp__details;
      });
      swal("Delete success", {
        icon: "success",
      });
      setShowDeleteIcon(false);
    }
  });
}
