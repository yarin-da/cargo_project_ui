import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import CustomText from "../util/CustomText";
import "../../styles/UnitsOfMeasurement.css";

const Preference = ({ preference, setPreference }) => {
    const textStyle = {textTransform: 'none'}
    return (
        <div className="units-of-measurement">
            <div className="toggle-buttons">
                <div className="button-group">
                    <ToggleButtonGroup
                        color="primary"
                        value={preference}
                        orientation="horizontal"
                        exclusive
                        onChange={(_, preference) => preference && setPreference(preference)}
                    >
                        <ToggleButton value="profit" style={textStyle}>
                            <CustomText text="profit" />
                        </ToggleButton>
                        <ToggleButton value="volume" style={textStyle}>
                           <CustomText text="volume" />
                        </ToggleButton>
                        <ToggleButton value="priority" style={textStyle}>
                           <CustomText text="priority" />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        </div>
    )
};

export default Preference;