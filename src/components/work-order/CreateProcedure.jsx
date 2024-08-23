import { Input } from "antd";
import React, { useState } from "react";
import StyledButton from "../common/StyledButton";
import TextArea from "antd/es/input/TextArea";
import ProcedureField from "./sub-components/ProcedureField";

const CreateProcedure = () => {
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [newItemList, setNewItemList] = useState([]);
  
  const addNewItem = () => {
    setNewItemList(prevList => [
      ...prevList,
      { id: prevList.length, component: <ProcedureField deleteItem={deleteItem} procedureFieldIndex={prevList.length} /> },
    ]);
  };

  const deleteItem = (id) => {
    setNewItemList(prevList => prevList.filter(item => item.id !== id));
  };

  return (
    <section className="procedure-container">
      <Input
        className="procedure-name-input"
        placeholder="Enter Procedure Name"
      />
      <div>
        {showDescriptionInput ? (
          <TextArea
            className="procedure-description-input"
            placeholder="What is this procedure for?"
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
          {newItemList.map(item => (
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
