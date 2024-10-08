import { Input } from "antd";
import React from "react";

const StyledInput = ({
  value,
  placeholder,
  label,
  onChange,
  name,
  addonBefore,
  addonAfter,
  suffix,
  prefix,
  style,
  type,
  error=false,
  errorMessage="",
}) => {
  return (
    <div className="styledInput">
      <label className="fmx-label">{label}</label>
      <div className="fmx-input-container">
        <Input
          className="fmx-input"
          {...{
            ...value,
            placeholder,
            suffix,
            type,
            prefix,
            addonBefore,
            addonAfter,
          }}
          style={{ ...style, borderColor: error && "red" }}
          onChange={(e) => onChange(e.target.value, name)}
        />
        {error ? <span className="input-error">{errorMessage}</span> : <></>}
      </div>
    </div>
  );
};

export default StyledInput;
