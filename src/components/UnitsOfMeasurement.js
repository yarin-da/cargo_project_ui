import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "../styles/UnitsOfMeasurement.css";


const UnitsOfMeasurement = ({ units, setUnits }) => {
    const textStyle = {textTransform: 'none'}
    return (
        <div className="units-of-measurement">
            <div className="toggle-buttons">
                <div style={{fontWeight: 'bold'}}>Weight</div>
                <ToggleButtonGroup
                    color="primary"
                    value={units['weight']}
                    orientation="horizontal"
                    fullWidth
                    exclusive
                    onChange={(e, weight) => setUnits({ ...units, weight })}
                >
                    <ToggleButton value="g" style={textStyle}>g</ToggleButton>
                    <ToggleButton value="kg" style={textStyle}>kg</ToggleButton>
                    <ToggleButton value="lb" style={textStyle}>lb</ToggleButton>
                </ToggleButtonGroup>
                <div style={{fontWeight: 'bold'}}>Length</div>
                <ToggleButtonGroup
                    color="primary"
                    value={units['length']}
                    orientation="horizontal"
                    fullWidth
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