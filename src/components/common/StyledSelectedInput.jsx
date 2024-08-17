import { Input, Select } from "antd";
import React from "react";

const StyledSelectedInput = ({
    value,
    placeholder,
    options,
    label,
    name,
    style,
    containerStyle,
    onChange,
    selectPlaceholder,
    selectName,
    selectStyle,
    selectValue,
    selectOptions,
    onSelectChange,
}) => {

    return (
        <div className="styledInput" style={{ ...containerStyle }}>
            <label className="fmx-label">{label}</label>
            <div className="fmx-input-container">
                <Input
                    className="fmx-input"
                    onChange={(e) => onChange(e.target.value, name)}
                    {...{
                        ...value,
                        placeholder,
                        style
                    }}
                    addonBefore={
                        <Select
                            className="fmx-select"
                            value={selectValue}
                            placeholder={selectPlaceholder}
                            style={{ ...selectStyle }}
                            options= {selectOptions}
                            onChange={(value) => onSelectChange(value, selectName)}
                        />
                    }
                />
            </div>
        </div>
    );
};

export default StyledSelectedInput;
