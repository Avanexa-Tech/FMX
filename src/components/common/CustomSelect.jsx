import { Select } from "antd";
import React from "react";

const CustomSelect = ({
  value,
  mode,
  dropdownRender,
  options,
  placeholder = null,
  onChange
}) => {
  console.log(value, 'qwerq21faxZ')
  const filterOption = (input, option) => 
    option.label.toLowerCase().includes(input.toLowerCase());
  return (
    <Select
      value={value?.name ? value.name : value}
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
