import React from "react";
import {TextField} from "@mui/material";
import translate from "./translations/Translate";
import "../styles/AddContainer.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import containerPhoto from '../images/container.png'
import { useTranslation } from "react-i18next";


const textFieldStyle = {
    width: 120
};

const NonNegativeNumberField = ({name, value, onChange}) =>
    <TextField
        label={translate(name)}
        type="number"
        style={textFieldStyle}
        value={value}
        InputProps={{
            inputProps: {min: 0}
        }}
        onChange={onChange}
        variant="standard"
    />;

const boxStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
}

const StandardContainerSize = ({image, height, width, title, alt, size}) => {
    const buttonStyle = {
        padding: 20,
        margin: 10,
        border: '1px solid black',
        borderRadius: 10,
        background: 'white'
    };
    return (
        <Box component="span" style={buttonStyle}>
            <div style={boxStyle}>
                <img src={image}
                     alt={alt}
                     width={width}
                     height={height}/>
                <small>{size}</small>
                <b>{title}</b>
            </div>
        </Box>
    );
};

const ContainerForm = ({container, setContainer}) => {
    const { t } = useTranslation();
    const onChangeHandler = (field) =>
        (event) => setContainer({
            ...container,
            [field]: parseInt(event.target.value, 10)
        });

    return (

        <div className="add-cargo">
            <div className="container-title">
                <Typography variant="h6">
                    {t("container_details")}
                </Typography>
            </div>
            <div style={{display: "flex", justifyContent: "space-evenly"}}>
                <Typography variant="h7">
                    {t("standard_size")}
                </Typography>
                <br/>
                <StandardContainerSize image={containerPhoto} height={40} width={70} title={t("small")} alt={"Small"}
                                       size={"100x200x100"}/>
                <StandardContainerSize image={containerPhoto} height={60} width={90} title={t("medium")} alt={"Medium"}
                                       size={"100x300x100"}/>
                <StandardContainerSize image={containerPhoto} height={80} width={100} title={t("large")} alt={"Large"}
                                       size={"100x400x100"}/>
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