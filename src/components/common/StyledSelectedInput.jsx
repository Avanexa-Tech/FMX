import { Input, Select } from "antd";
import React from "react";

const StyledSelectedInput = ({
    type,
    value,
    placeholder,
    options,
    label,
    name,
    style,
    containerStyle,
    onChange,
    error,
    errorMessage,
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
                    type={type}
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
                            style={{ ...selectStyle, width: "auto" }}
                            options={selectOptions}
                            onChange={(value) => onSelectChange(value, selectName)}
                        />
                    }
                    />
                    {error && <span className="input-error">{errorMessage}</span>}
            </div>
        </div>
    );
};

export default StyledSelectedInput;
