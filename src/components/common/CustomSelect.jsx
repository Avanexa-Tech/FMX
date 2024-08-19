import { Select } from "antd";
import React from "react";

const CustomSelect = ({
  mode,
  dropdownRender,
  options,
  placeholder = null,
  onChange
}) => {
  return (
    <Select
      mode={mode}
      placeholder={placeholder}
      dropdownRender={dropdownRender}
      options={options}
      notFoundContent={<></>}
      onChange={onChange}
    />
  );
};

export default CustomSelect;
