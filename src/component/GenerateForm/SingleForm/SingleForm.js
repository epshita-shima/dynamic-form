import { Formik } from "formik";
import React, { useRef } from "react";

const SingleForm = ({ count,setCount }) => {
  const handleSort = () => {
    let _count = [...count];
    const draggedItemContent = _count.splice(dragItem.current, 1)[0];
    _count.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setCount(_count);
  };

  const dragItem = useRef();
  const dragOverItem = useRef();
  return (
    <div>
          <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {}}
        render={({ values, setFieldValue, handleSubmit }) => (
                <form
                  onSubmit={""}
                >
                  <div className="grid-container">
        {count.map((result, index) => {
          console.log(result);
          return (
            <div
              key={index}
              draggable
              onDragStart={(e) => {
                dragItem.current = index;
              }}
              onDragEnter={(e) => {
                dragOverItem.current = index;
              }}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault}
              className="grid-item"
            >
              {result}
            </div>
          );
        })}
      </div>
                </form>
        )}
      />
      
    </div>
  );
};

export default SingleForm;
