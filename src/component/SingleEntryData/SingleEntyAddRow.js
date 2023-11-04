import swal from "sweetalert";

export const handleAddRow=({columnValues,childPageType,setGetDate,getDate,twoDimensionData,setLabelData,labelDataCopy,setTwoDimentionData, selectedImage,
  setSelectedImage})=>{
    console.log(childPageType.PageType)
    console.log(columnValues)
  console.log(labelDataCopy)
  columnValues[columnValues?.length] = {};
  setGetDate([...getDate, new Date()]);
  twoDimensionData[twoDimensionData.length] = [];
  selectedImage[selectedImage.length]=[]
  
  setLabelData((prevArr) => {
    const result = [...prevArr];
    console.log(result,labelDataCopy)
    result[0].map((element, i) => {
      console.log(Object.keys(element))
      if (element.ColumnType == "datetime") {
        twoDimensionData[twoDimensionData.length - 1][i] =
          new Date();
      }
      if (element.ColumnType == "image") {
        selectedImage[selectedImage.length-1[i]]=''
      }
      columnValues[columnValues.length - 1][
        element.ColumnName
      ] = "";
      if(childPageType.PageType=="singleEntryPage"){
        columnValues[columnValues.length - 1][
          [Object.keys(element)[0]]
        ] = "newID()";
      }
      if(childPageType.PageType=="doubleEntryPage"){
        columnValues[columnValues.length - 1][
          [Object.keys(element)[0]]
        ] = "newID()";
        columnValues[columnValues.length - 1][
          [Object.keys(element)[1]]
        ] = "";
      }
     
    });

    var tempdatanewrow = JSON.parse(
      JSON.stringify(labelDataCopy[0])
    );
    result.push(tempdatanewrow);
    console.log(result);
    return result;
  });

  setTwoDimentionData(twoDimensionData);
  setSelectedImage(selectedImage);
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
