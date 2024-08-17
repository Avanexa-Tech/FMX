import { Input } from "antd";
import React from "react";

const StyledInput = ({
  value,
  placeholder,
  label,
  onChange,
  name,
  suffix,
  prefix,
  style,
  type,
}) => {
  return (
    <div className="styledInput">
      <label className="fmx-label">{label}</label>
      <div className="fmx-input-container">
        <Input
          className="fmx-input"
          onChange={(e) => onChange(e.target.value, name)}
          style={{ ...style }}
          {...{
            ...value,
            placeholder,
            suffix,
            type,
            prefix,
          }}
        />
      </div>
    </div>
  );
};

export default StyledInput;
