import { Select } from "antd";
import React from "react";

const CustomSelect = ({
  mode,
  dropdownRender,
  options,
  placeholder = null,
}) => {
  return (
    <Select
      mode={mode}
      placeholder={placeholder}
      dropdownRender={dropdownRender}
      options={options}
      notFoundContent={<></>}
    />
  );
};

export default CustomSelect;
