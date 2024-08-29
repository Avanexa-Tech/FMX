import { Select } from "antd";
import React from "react";

const CustomSelect = ({
  mode,
  dropdownRender,
  options,
  placeholder = null,
  onChange
}) => {
  const filterOption = (input, option) => 
    option.label.toLowerCase().includes(input.toLowerCase());
  return (
    <Select
      showSearch
      mode={mode}
      placeholder={placeholder}
      dropdownRender={dropdownRender}
      filterOption={filterOption}
      options={options}
      notFoundContent={<></>}
      onChange={onChange}
    />
  );
};

export default CustomSelect;
