import {ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import { useTranslation } from "react-i18next";
import "../styles/UnitsOfMeasurement.css";


const UnitsOfMeasurement = ({ units, setUnits }) => {
    const { t } = useTranslation();
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
                        <ToggleButton value="cm" style={textStyle}>
                            <Typography>{t('cm')}</Typography>
                        </ToggleButton>
                        <ToggleButton value="m" style={textStyle}>
                            <Typography>{t('m')}</Typography>
                        </ToggleButton>
                        <ToggleButton value="inch" style={textStyle}>
                            <Typography>{t('inch')}</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        </div>
    )
};

export default UnitsOfMeasurement;