import { Input } from "antd";
import React, { useState } from "react";
import StyledButton from "../common/StyledButton";
import TextArea from "antd/es/input/TextArea";
import ProcedureField from "./sub-components/ProcedureField";
import { useDispatch } from "react-redux";
import { addProcedure } from "../../redux/slice/procedureSlice";

const CreateProcedure = () => {
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [newItemList, setNewItemList] = useState([]);
  const dispatch = useDispatch();
  const [procedureForm, setProcedureForm] = useState({
    procedure_name: "",
    procedure_description: "",
    fields: [],
  });

  function handleAddProcedure() {
    dispatch(addProcedure(procedureForm));
  }

  const handleFieldChange = (selectedIndex = null) => {
    if (selectedIndex == null) {
      setProcedureForm((prev) => ({
        ...prev,
        fields: [
          ...prev.fields,
          {
            field_type: "text",
            field_name: "",
            field_value: null,
            required : false
          },
        ],
      }));
    } else {
      setProcedureForm((prev) => {
        const updatedFields = prev.fields.filter(
          (field, index) => index !== selectedIndex
        );
        return { ...prev, fields: updatedFields };
      });
    }
  };

  const handleFieldEdit = (selectedIndex, key, value) => {
    setProcedureForm((prev) => {
      const updatedFields = prev.fields.map((field, index) =>
        index === selectedIndex ? { ...field, [key]: value } : field
      );
      return { ...prev, fields: updatedFields };
    });
  };

  const addNewItem = () => {
    setProcedureForm((prev) => ({
      ...prev,
      fields : [...procedureForm.fields , {
        id: procedureForm.fields.length,
        component: (
          <ProcedureField
            deleteItem={deleteItem}
            procedureFieldIndex={procedureForm.fields}
            handleFieldEdit={handleFieldEdit}
          />
        ),
      }]
    }));
  };

  const deleteItem = (id) => {
    setProcedureForm((prev) => prev.fields.filter((item) => item.id !== id));
  };

  return (
    <section className="procedure-container">
      <StyledButton
        onClick={handleAddProcedure}
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
          {procedureForm.fields.map((item) => (
            <div key={item.id}>{item.component}</div>
          ))}
        </div>
        <div className="field-option">
          <h4>New Item</h4>
          <div
            className="new-item-option"
            onClick={() => {
              addNewItem();
              // handleFieldChange();
            }}
          >
            <i className="fi fi-sr-plus-hexagon"></i>
            <p>Field</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProcedure;
