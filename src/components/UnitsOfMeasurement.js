import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "../styles/UnitsOfMeasurement.css";


const UnitsOfMeasurement = ({ units, setUnits }) => {
    const textStyle = {textTransform: 'none'}
    return (
        <div className="units-of-measurement-background">
            <div className="units-of-measurement-title">
                Units Of Measurement
            </div>
            <div className="toggle-buttons">
                <ToggleButtonGroup
                    color="primary"
                    value={units['weight']}
                    exclusive
                    onChange={(e, weight) => setUnits({ ...units, weight })}
                >
                    <ToggleButton value="g" style={textStyle}>g</ToggleButton>
                    <ToggleButton value="kg" style={textStyle}>kg</ToggleButton>
                    <ToggleButton value="lb" style={textStyle}>lb</ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    color="primary"
                    value={units['length']}
                    exclusive
                    onChange={(e, length) => setUnits({ ...units, length })}
                >
                    <ToggleButton value="cm" style={textStyle}>cm</ToggleButton>
                    <ToggleButton value="m" style={textStyle}>m</ToggleButton>
                    <ToggleButton value="inch" style={textStyle}>inch</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    )

};

export default UnitsOfMeasurement;