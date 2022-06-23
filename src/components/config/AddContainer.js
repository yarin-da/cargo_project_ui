import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import containerPhoto from '../../images/container.png'
import { useTranslation } from "react-i18next";
import CustomText from "../util/CustomText";
import "../../styles/AddContainer.css";
import "../../styles/Util.css";

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
            <div className="container-buttons-div" >
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
                <div className="container-images" >
                    <img
                        src={image}
                        alt={t(title)}
                        width={imageRatio * imageSize}
                        height={imageSize}
                    />
                </div>
                <CustomText className="no-text-transform" text={title} />
            </div>
        </Button>
    );
};

const StandardContainerButtons = ({ standard, onStandardChosen, units, standardSizes }) => {
    return (
        <div className="standard-containers-div">
            <CustomText text="standardSize" variant="h6" />
            <div className="standard-containers-buttons">
                {Object.keys(standardSizes).map(
                    size => 
                        <StandardContainerSize 
                            key={`standard-container-size-button-${size}`}
                            units={units}
                            image={containerPhoto} 
                            imageSize={50 + 10 * size} 
                            title={standardSizes[size]['size']} 
                            standard={standardSizes[size]}
                            isChosen={size === standard}
                            onClick={() => onStandardChosen(size)}
                        />
                )}
            </div>
        </div>
    );
};

const standardSizes = [
    {
        size: 'small',
        width: 200,
        height: 200,
        depth: 400,
        maxWeight: 1240000,
    },
    {
        size: 'medium',
        width: 200,
        height: 200,
        depth: 800,
        maxWeight: 2480000,
    },
    {
        size: 'large',
        width: 200,
        height: 200,
        depth: 1200,
        maxWeight: 3720000,
    }
];

const ContainerForm = ({container, setContainer, units}) => {
    const { t } = useTranslation();
    const [standard, setStandard] = useState(-1); 
    const onChangeHandler = (field) =>
        (event) => setContainer({
            ...container,
            [field]: parseInt(event.target.value, 10)
        });

    useEffect(() => {
        if (standard === -1) return;
        const newContainer = {
            width: getLength(standardSizes[standard]['width'], units),
            height: getLength(standardSizes[standard]['height'], units),
            depth: getLength(standardSizes[standard]['depth'], units),
            maxWeight: getWeight(standardSizes[standard]['maxWeight'], units)
        };
        setContainer(newContainer);
    }, [units, standard, setContainer]);

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