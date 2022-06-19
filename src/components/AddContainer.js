import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import containerPhoto from '../images/container.png'
import { useTranslation } from "react-i18next";
import CustomText from "./CustomText";
import "../styles/AddContainer.css";
import "../styles/Util.css";

const getLength = (cmLength, units) => {
    if (units['length'] === 'm') return Math.floor(cmLength / 100);
    if (units['length'] === 'inch') return Math.floor(cmLength / 2.54);
    return cmLength;
};
const getWeight = (gWeight, units) => {
    if (units['weight'] === 'kg') return Math.floor(gWeight / 1000);
    if (units['weight'] === 'lb') return Math.floor(gWeight / 453.5924);
    return gWeight;
};

const NonNegativeNumberField = ({name, style, value, onChange}) =>
    <TextField
        label={name}
        type="number"
        style={style}
        value={value ?? ''}
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
                    {getLength(standard['width'], units)}
                    &times;
                    {getLength(standard['height'], units)}
                    &times;
                    {getLength(standard['depth'], units)}
                    {units['length']}
                </small>
                <small className="no-text-transform">
                    {getWeight(standard['maxWeight'], units)}
                    {units['weight']}
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

const StandardContainerButtons = ({ standard, onStandardChosen, units, standardSizes }) => {
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
                            isChosen={i === standard}
                            onClick={() => onStandardChosen(i)}
                        />
                )}
            </div>
        </div>
    );
};

const ContainerForm = ({container, setContainer, units}) => {
    const { t } = useTranslation();
    const [standard, setStandard] = useState(-1); 
    const onChangeHandler = (field) =>
        (event) => setContainer({
            ...container,
            [field]: parseInt(event.target.value, 10)
        });

    const standardSizes = [
        {
            width: 200,
            height: 200,
            depth: 400,
            maxWeight: 1240000,
        },
        {
            width: 200,
            height: 200,
            depth: 800,
            maxWeight: 2480000,
        },
        {
            width: 200,
            height: 200,
            depth: 1200,
            maxWeight: 3720000,
        }
    ];

    useEffect(() => {
        if (standard === -1) return;
        const newContainer = {
            width: getLength(standardSizes[standard]['width'], units),
            height: getLength(standardSizes[standard]['height'], units),
            depth: getLength(standardSizes[standard]['depth'], units),
            maxWeight: getWeight(standardSizes[standard]['maxWeight'], units)
        };
        debugger;
        setContainer(newContainer);
    }, [units, standard]);

    return (
        <div className="add-cargo">
            <div className="container-title">
                <CustomText text="containerDetails" variant="h4" />
            </div>
            <StandardContainerButtons 
                units={units} 
                onStandardChosen={(standard) => setStandard(standard)} 
                standardSizes={standardSizes}
                standard={standard}
            />
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