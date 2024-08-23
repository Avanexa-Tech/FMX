import React, { useState } from "react";
import { Checkbox, Dropdown, Input, Menu, Select, Switch } from "antd";
import StyledButton from "../../common/StyledButton";

let fieldTypeOptions = [
    {
      key: "checkbox",
      icon: <i class="fi fi-sr-checkbox"></i>,
      colorCode: "#117864",
      childern: (
        <div className="field-type-input">
          <p
            style={{
              background: "#11786450",
            }}
          >
            <i class="fi fi-sr-checkbox" style={{ color: "#117864" }}></i>
          </p>
          <p>Checkbox</p>
        </div>
      ),
    },
    {
      key: "text",
      icon: <i class="fi fi-rr-text"></i>,
      colorCode: "#9c640c",
      childern: (
        <div className="field-type-input">
          <p
            style={{
              background: "#9c640c20",
            }}
          >
            <i class="fi fi-rr-text" style={{ color: "#9c640c" }}></i>
          </p>
          <p>Text Field</p>
        </div>
      ),
    },
    {
      key: "checklist",
      icon: <i class="fi fi-rr-list"></i>,
      colorCode: "#633974",
      childern: (
        <div className="field-type-input">
          <p
            style={{
              background: "#63397420",
            }}
          >
            <i class="fi fi-rr-list" style={{ color: "#633974" }}></i>
          </p>
          <p>Checklist</p>
        </div>
      ),
    },
  ];
  

const ProcedureField = ({
    deleteItem,
    procedureFieldIndex
}) => {
  const [selectedField, setSelectedField] = useState();
  const [checkboxes, setCheckboxes] = useState([]);

  function addCheckbox() {
    setCheckboxes([...checkboxes, { key: checkboxes.length}]);
  }
  function removeCheckbox(index) {
    console.log(index , checkboxes , "1121das")
    setCheckboxes([...checkboxes.filter((item , checklistIndex) => {
      console.log(checklistIndex ,index)
    })]);
  }

  function renderField() {
    switch (selectedField) {
      case "checkbox":
        return null;
      case "text":
        return <Input placeholder="Text will be entered here" />;
      case "checklist":
        return (
          <div className="checklist-inputs">
            {checkboxes.map((item, index) => (
              <div key={index} className="checklist-single-input">
                <Input
                  placeholder={`Option ${index + 1}`}
                  className="checklist-input"
                />
                <i
                  class="fi fi-rr-cross"
                  onClick={() => removeCheckbox(index)}
                ></i>
              </div>
            ))}
            <StyledButton
              text={"Add Option"}
              icon={<i class="fi fi-rs-plus"></i>}
              onClick={addCheckbox}
              btnClassName="add-checklist-btn"
            />
          </div>
        );
      default:
        break;
    }
  }
  return (
    <div className="procedure-single-card" key={procedureFieldIndex}>
      <div className="pf-head">
        <Input placeholder="Field Name" />
        <Select
          style={{
            width: "250px",
          }}
          onChange={(value) => setSelectedField(value)}
        >
          {fieldTypeOptions.map((item, index) => (
            <Select.Option value={item.key} key={item.key + index}>
              {item.childern}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="pf-main">{renderField()}</div>
      <div className="pf-foot">
        <div
          className="quick-options"
          onClick={() => deleteItem(procedureFieldIndex)}
        >
          <i className="fi fi-rs-trash delete"></i>
        </div>
        <div className="required-switch">
          <p>Required</p>
          <Switch defaultChecked size="small" />
        </div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>Add Description</Menu.Item>
              <Menu.Item>Duplicate</Menu.Item>
            </Menu>
          }
          className="other-options-dropdown"
        >
          <p>
            <i class="fi fi-br-menu-dots-vertical"></i>
          </p>
        </Dropdown>
      </div>
    </div>
  );
};

export default ProcedureField;
