import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import containerPhoto from '../images/container.png'
import { useTranslation } from "react-i18next";
import CustomText from "./CustomText";
import "../styles/AddContainer.css";


const NonNegativeNumberField = ({name, style, value, onChange}) =>
    <TextField
        label={name}
        type="number"
        style={style}
        value={value}
        InputProps={{
            inputProps: {min: 0}
        }}
        onChange={onChange}
        variant="standard"
    />;

const StandardContainerSize = ({image, imageSize, title, standard, isChosen, onClick}) => {
    const buttonStyle = {
        padding: 20,
        margin: 10,
        border: '1px solid black',
        borderRadius: 10,
        background: isChosen ? 'lightgrey' : 'white'
    };

    const { t } = useTranslation();
    const imageRatio = 1.4;

    return (
        <Button component="span" style={buttonStyle} onClick={onClick}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                <small>{standard['width']}&times;{standard['height']}&times;{standard['depth']}</small>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <img 
                        src={image}
                        alt={t(title)}
                        width={imageRatio * imageSize}
                        height={imageSize}
                    />
                </div>
                <CustomText style={{ textTransform: 'none' }} text={title} />
            </div>
        </Button>
    );
};

const StandardContainerButtons = ({ onContainerSizeChosen }) => {
    const [chosen, setChosen] = useState(-1);

    const standardSizes = {
        small: {
            width: 10,
            height: 10,
            depth: 20,
            maxWeight: 1500,
            cost: 500,
        },
        medium: {
            width: 10,
            height: 10,
            depth: 30,
            maxWeight: 2000,
            cost: 600,
        },
        large: {
            width: 10,
            height: 10,
            depth: 40,
            maxWeight: 2500,
            cost: 700,
        },
    };

    return (
        <div style={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
            <CustomText text="standardSize" variant="h6" />
            <div style={{display: "flex", justifyContent: "space-evenly"}}>
                {Object.keys(standardSizes).map(
                    (size, i) => 
                        <StandardContainerSize 
                            key={`standard-container-size-button-${i}`}
                            image={containerPhoto} 
                            imageSize={50 + 10 * i} 
                            title={size} 
                            standard={standardSizes[size]}
                            isChosen={i === chosen}
                            onClick={() => {
                                onContainerSizeChosen(standardSizes[size]);
                                setChosen(i);
                            }}
                        />
                )}
            </div>
        </div>
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
                <CustomText text="containerDetails" variant="h4" />
            </div>
            <StandardContainerButtons onContainerSizeChosen={(standard) => setContainer(standard)} />
            <div className="cargo-text-field">
                {Object.keys(container).map((field, index) =>
                    <NonNegativeNumberField
                        key={index}
                        name={t(field)}
                        value={container[field]}
                        style={{ width: 100, margin: 10 }}
                        onChange={onChangeHandler(field)}
                    />
                )}
            </div>
        </div>
    );
};

export default ContainerForm;