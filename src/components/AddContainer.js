import React from "react";
import {TextField} from "@mui/material";
import translate from "./translations/Translate";
import "../styles/AddContainer.css";
import Typography from "@mui/material/Typography";

const textFieldStyle = {
    width: 120
};

const NonNegativeNumberField = ({ name, value, onChange }) =>
    <TextField
        label={translate(name)}
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

        <div className="add-cargo">
            <div className="container-title">
                <Typography variant="h6">
                    Container details
                </Typography>
            </div>
            <div className="cargo-text-field">
                {Object.keys(container).map((field, index) =>
                    <NonNegativeNumberField
                        key={index}
                        name={field}
                        value={container[field]}
                        onChange={onChangeHandler(field)}
                    />
                )}
            </div>
        </div>
    );
};

export default ContainerForm;