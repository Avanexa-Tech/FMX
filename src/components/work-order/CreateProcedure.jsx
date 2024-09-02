import { Input } from "antd";
import React, { useEffect, useState } from "react";
import StyledButton from "../common/StyledButton";
import TextArea from "antd/es/input/TextArea";
import ProcedureField from "./sub-components/ProcedureField";
import { useDispatch, useSelector } from "react-redux";
import { addProcedure, updateProcedure } from "../../redux/slice/procedureSlice";
import { useLocation, useNavigate } from "react-router-dom";

const CreateProcedure = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [procedureForm, setProcedureForm] = useState({
    procedure_name: "",
    procedure_description: "",
    fields: [],
  });

  useEffect(() => {
    if (location.state?.procedure_name)
      setProcedureForm(location.state);
    if (location.state?.procedure_description)
      setShowDescriptionInput(true);
  }, [location.state]);

  function handleAddProcedure() {
    const copyFields = procedureForm;
    copyFields.fields = copyFields.fields.map(item => (
      {
        ...item,
        field_value: Array.isArray(item.field_value) && item.field_value.length !== 0 ?
          [...item.field_value.filter(obj => obj.value.length != 0)] : item?.field_value
      }));
    
    if (copyFields?.id) {
      dispatch(updateProcedure(copyFields));
      navigate(-1);
    } else {
      dispatch(addProcedure(copyFields));
      navigate(-1);
    }
  }

  const handleFieldChange = (selectedIndex = null) => {
    if (selectedIndex == null) {
      setProcedureForm((prev) => ({
        ...prev,
        fields: [
          ...prev.fields,
          {
            id: prev.fields.id ? prev.fields.id + 1 : 1,
            field_type: "text",
            field_name: "",
            field_value: null,
            required: false
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


  const deleteItem = (id) => {
    setProcedureForm((prev) => prev.fields.filter((item) => item.id !== id));
  };

  return (
    <section className="procedure-container">
      <StyledButton
        onClick={handleAddProcedure}
        text={procedureForm?.id ? "Update Procedure" : "Add Procedure"}
        icon={!procedureForm?.id && <i className="fi fi-br-plus"></i>}
        btnClassName="add-procedure-btn"
      />
      <Input
        value={procedureForm?.procedure_name}
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
            value={procedureForm?.procedure_description}
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
          {procedureForm.fields.map((item, index) => (
            <div key={item.id}><ProcedureField
              procedureData={item}
              deleteItem={deleteItem}
              procedureFieldIndex={index}
              handleFieldEdit={handleFieldEdit}
            /></div>
          ))}
        </div>
        <div className="field-option">
          <h4>New Item</h4>
          <div
            className="new-item-option"
            onClick={() => handleFieldChange()}
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
