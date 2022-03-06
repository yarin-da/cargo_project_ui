import '../styles/UnitsOfMeasurement.css'
import {useState} from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


const UnitsOfMeasurement = () => {
    const [weight, setWeight] = useState('kg');
    const handleChangeWeight = (event, newAlignment) => {
        setWeight(newAlignment);
    }

    const [meters, setMeters] = useState('m');
    const handleChangeMeters = (event, newAlignment) => {
        setMeters(newAlignment);
    }

    const textStyle = {textTransform: 'none'}

    return (
        <div className="units-of-measurement-background">
            <div className="units-of-measurement-title">
                Units Of Measurement
            </div>
            <div className="toggle-buttons">
                <ToggleButtonGroup
                    color="primary"
                    value={weight}
                    exclusive
                    onChange={handleChangeWeight}
                >
                    <ToggleButton value="g" style={textStyle}>g</ToggleButton>
                    <ToggleButton value="kg" style={textStyle}>kg</ToggleButton>
                    <ToggleButton value="lb" style={textStyle}>lb</ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    color="primary"
                    value={meters}
                    exclusive
                    onChange={handleChangeMeters}
                >
                    <ToggleButton value="cm" style={textStyle}>cm</ToggleButton>
                    <ToggleButton value="m" style={textStyle}>m</ToggleButton>
                    <ToggleButton value="inch" style={textStyle}>inch</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>

            </div>
        </div>
    )

};

export default UnitsOfMeasurement;