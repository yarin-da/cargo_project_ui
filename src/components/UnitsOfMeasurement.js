import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import "../styles/UnitsOfMeasurement.css";


const UnitsOfMeasurement = ({ units, setUnits }) => {
    const textStyle = {textTransform: 'none'}
    return (
        <div className="units-of-measurement">
            <div className="toggle-buttons">
                <div className="button-group">
                    <h5>Weight</h5>
                    <ToggleButtonGroup
                        color="primary"
                        value={units['weight']}
                        orientation="horizontal"
                        exclusive
                        onChange={(e, weight) => weight && setUnits({ ...units, weight })}
                    >
                        <ToggleButton value="g" style={textStyle}>g</ToggleButton>
                        <ToggleButton value="kg" style={textStyle}>kg</ToggleButton>
                        <ToggleButton value="lb" style={textStyle}>lb</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className="button-group">
                    <h5>Length</h5>
                    <ToggleButtonGroup
                        color="primary"
                        value={units['length']}
                        orientation="horizontal"
                        exclusive
                        onChange={(e, length) => setUnits({ ...units, length })}
                    >
                        <ToggleButton value="cm" style={textStyle}>cm</ToggleButton>
                        <ToggleButton value="m" style={textStyle}>m</ToggleButton>
                        <ToggleButton value="inch" style={textStyle}>inch</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        </div>
    )
};

export default UnitsOfMeasurement;