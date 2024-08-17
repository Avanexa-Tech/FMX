import { Select } from "antd";
import React from "react";

const StyledSelect = ({ value, placeholder, options, label, onChange, name, style, containerStyle }) => {

    return (
        <div className="styledInput" style={{ ...containerStyle }}>
            <label className="fmx-label">{label}</label>
            <div className="fmx-input-container">
                <Select
                    className="fmx-input"
                    onChange={(e) => onChange(e.target.value, name)}
                    style={{ ...style }}
                    {...{
                        ...value,
                        placeholder,
                        options
                    }}
                />
            </div>
        </div>
    );
};

export default StyledSelect;
