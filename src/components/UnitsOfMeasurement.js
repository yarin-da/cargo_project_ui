import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import CustomText from "./CustomText";
import "../styles/UnitsOfMeasurement.css";


const UnitsOfMeasurement = ({ units, setUnits }) => {
    const textStyle = {textTransform: 'none'}
    return (
        <div className="units-of-measurement">
            <div className="toggle-buttons">
                <div className="button-group">
                    <CustomText text="Weight" />
                    <ToggleButtonGroup
                        color="primary"
                        value={units['weight']}
                        orientation="horizontal"
                        exclusive
                        onChange={(_, weight) => weight && setUnits({ ...units, weight })}
                    >
                        <ToggleButton value="g" style={textStyle}>
                            <CustomText text="g" />
                        </ToggleButton>
                        <ToggleButton value="kg" style={textStyle}>
                           <CustomText text="kg" />
                        </ToggleButton>
                        <ToggleButton value="lb" style={textStyle}>
                            <CustomText text="lb" />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className="button-group">
                    <CustomText text="Length" />
                    <ToggleButtonGroup
                        color="primary"
                        value={units['length']}
                        orientation="horizontal"
                        exclusive
                        onChange={(e, length) => setUnits({ ...units, length })}
                    >
                        <ToggleButton value="cm" style={textStyle}>
                            <CustomText text="cm" />
                        </ToggleButton>
                        <ToggleButton value="m" style={textStyle}>
                            <CustomText text="m" />
                        </ToggleButton>
                        <ToggleButton value="inch" style={textStyle}>
                            <CustomText text="inch" />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        </div>
    )
};

export default UnitsOfMeasurement;