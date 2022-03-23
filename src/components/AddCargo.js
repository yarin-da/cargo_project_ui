import React from "react";
import '../styles/AddCargo.css';
import {TextField} from "@mui/material";
import {useEffect, useState} from "react";

const textFieldStyle = {
    width: 120
}

const NonNegativeNumberField = ({ name, label, value, onChange }) => {
    useEffect(() => console.log('hello'), [value]);
    return (
        <TextField
            id={`cargo-${name}`}
            label={label}
            type="number"
            style={textFieldStyle}
            value={value}
            onChange={onChange}
            variant="standard"/>
    );
};

const AddCargo = () => {
    const [fieldValues, setFieldValues] = useState({
        height: {
            label: "Height",
            value: 0,
        },
        width: {
            label: "Width",
            value: 0,
        },
        depth: {
            label: "Depth",
            value: 0,
        },
        maxWeight: {
            label: "Max Weight",
            value: 0,
        },
        cost: {
            label: "Cost",
            value: 0,
        },
    });

    const onChangeHandler = (fieldName) =>
        (event) => setFieldValues(curr => {
            curr[fieldName]['value'] = parseInt(event.target.value);
            return curr;
        })

    return (
        <div className="add-cargo-background">
            <div className="add-cargo-title">
                Cargo Details
            </div>
            <div className="cargo-text-filed">
                {Object.keys(fieldValues).map((fieldName, index) =>
                    <NonNegativeNumberField
                        key={index}
                        name={fieldName}
                        label={fieldValues[fieldName]['label']}
                        value={fieldValues[fieldName]['value']}
                        onChange={onChangeHandler(fieldName)}
                    />
                )}
            </div>
        </div>
    )
};

export default AddCargo;