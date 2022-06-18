import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import containerPhoto from '../images/container.png'
import { useTranslation } from "react-i18next";
import CustomText from "./CustomText";
import "../styles/AddContainer.css";
import "../styles/Util.css";

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

const StandardContainerSize = ({image, imageSize, title, standard, isChosen, onClick, units}) => {
    const buttonStyle = {
        padding: 20,
        margin: 10,
        border: '1px solid black',
        borderRadius: 10,
        background: isChosen ? '#e4e4e4' : 'white'
    };

    const { t } = useTranslation();
    const imageRatio = 1.4;

    return (
        <Button className="hover-effect" component="span" style={buttonStyle} onClick={onClick}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                <small className="no-text-transform">
                    {standard['width']}&times;{standard['height']}&times;{standard['depth']}{units['length']}
                </small>
                <small className="no-text-transform">
                    {standard['maxWeight']}{units['weight']}
                </small>
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

const StandardContainerButtons = ({ onContainerSizeChosen, units }) => {
    const [chosen, setChosen] = useState(-1);

    const getLength = (cmLength) => {
        if (units['length'] === 'm') return Math.floor(cmLength / 100);
        if (units['length'] === 'inch') return Math.floor(cmLength / 2.54);
        return cmLength;
    };
    const getWeight = (gWeight) => {
        if (units['weight'] === 'kg') return Math.floor(gWeight / 1000);
        if (units['weight'] === 'lb') return Math.floor(gWeight / 453.5924);
        return gWeight;
    };

    const standardSizes = {
        small: {
            width: getLength(200),
            height: getLength(200),
            depth: getLength(400),
            maxWeight: getWeight(1240000),
            cost: 500,
        },
        medium: {
            width: getLength(200),
            height: getLength(200),
            depth: getLength(800),
            maxWeight: getWeight(2480000),
            cost: 600,
        },
        large: {
            width: getLength(200),
            height: getLength(200),
            depth: getLength(1200),
            maxWeight: getWeight(3720000),
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
                            units={units}
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

const ContainerForm = ({container, setContainer, units}) => {
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
            <StandardContainerButtons units={units} onContainerSizeChosen={(standard) => setContainer(standard)} />
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