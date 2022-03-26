import React, {useState} from "react";
import {TextField} from "@mui/material";
import "../styles/ContainerForm.css";

const textFieldStyle = {
    width: 120
};

const NonNegativeNumberField = ({ name, label, value, onChange }) =>
    <TextField
        id={`cargo-${name}`}
        label={label}
        type="number"
        style={textFieldStyle}
        value={value}
        InputProps={{
            inputProps: { min: 0 }
        }}
        onChange={onChange}
        variant="standard"
    />;

const ContainerForm = ({ container, setContainer }) => {
    const onChangeHandler = (field) =>
        (event) => setContainer({ 
            ...container, 
            [field]: parseInt(event.target.value, 10)
        });

    return (
        <div className="add-cargo-background">
            <div className="add-cargo-title">
                Cargo Details
            </div>
            <div className="cargo-text-field">
                {Object.keys(container).map((field, index) =>
                    <NonNegativeNumberField
                        key={index}
                        name={field}
                        label={field}
                        value={container[field]}
                        onChange={onChangeHandler(field)}
                    />
                )}
            </div>
        </div>
    );
};

export default ContainerForm;