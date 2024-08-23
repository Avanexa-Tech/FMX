import { Button, Input } from "antd";
import React, { useState } from "react";
import StyledButton from "../common/StyledButton";
import TextArea from "antd/es/input/TextArea";
import ProcedureField from "./sub-components/ProcedureField";

const CreateProcedure = () => {
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [newItemList, setNewItemList] = useState([]);
  const [procedureForm, setProcedureForm] = useState({
    procedure_name: "",
    procedure_description: "",
    fields: [],
  });
  
  const handleFieldChange = () => {
    setProcedureForm((prev) => ({
      ...prev,
      fields: [
        ...prev.fields,
        {
          field_type: "text",
          field_name: "",
          field_value: null,
        },
      ],
    }));
  }


  const handleFieldNameChange = (selectedIndex, value) => {
    const newData = {...procedureForm}
    newData.fields[selectedIndex].field_name = value;
    setProcedureForm(newData);
  }


  const addNewItem = () => {
    setNewItemList((prevList) => [
      ...prevList,
      {
        id: prevList.length,
        component: (
          <ProcedureField
            deleteItem={deleteItem}
            procedureFieldIndex={prevList.length}
            handleFieldNameChange={handleFieldNameChange}
          />
        ),
      },
    ]);
    handleFieldChange()
  };

  const deleteItem = (id) => {
    setNewItemList(prevList => prevList.filter(item => item.id !== id));
  };

  console.log("asdasdsd" , procedureForm)

  return (
    <section className="procedure-container">
      <StyledButton
        // onClick={() => setShowDescriptionInput(true)}
        text={"Add Procedure"}
        icon={<i className="fi fi-br-plus"></i>}
        btnClassName="add-procedure-btn"
      />
      <Input
        className="procedure-name-input"
        placeholder="Enter Procedure Name"
        onChange={(e) =>
          setProcedureForm((prev) => ({
            ...prev,
            procedure_name: e.target.value,
          }))
        }
      />
      <div>
        {showDescriptionInput ? (
          <TextArea
            className="procedure-description-input"
            placeholder="What is this procedure for?"
            onChange={(e) =>
              setProcedureForm((prev) => ({
                ...prev,
                procedure_description: e.target.value,
              }))
            }
          />
        ) : (
          <StyledButton
            onClick={() => setShowDescriptionInput(true)}
            text={"Add Description"}
            icon={<i className="fi fi-br-plus"></i>}
            btnClassName="add-description-btn"
          />
        )}
      </div>
      <div className="procedure-fields-container">
        <div className="procedure-fields">
          {newItemList.map((item) => (
            <div key={item.id}>{item.component}</div>
          ))}
        </div>
        <div className="field-option">
          <h4>New Item</h4>
          <div className="new-item-option" onClick={addNewItem}>
            <i className="fi fi-sr-plus-hexagon"></i>
            <p>Field</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProcedure;
