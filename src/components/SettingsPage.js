import LanguagesButtons from "./LanguagesButtons";
import UnitsOfMeasurement from "./UnitsOfMeasurement";
import {Typography} from "@mui/material";

const titleStyle = {
    marginLeft: "25%",
}

const subtitlesStyle = {
    display: "flex",
    marginLeft: "25%",
    marginBottom: "10px"
}

const SettingsPage = ({units, setUnits}) => {
    return (
        <div>
            <Typography variant="h6" style={titleStyle}>
                Settings
            </Typography>
            <Typography variant="h8" style={subtitlesStyle}>
                Language
            </Typography>
           <LanguagesButtons/>
            <Typography variant="h8" style={subtitlesStyle}>
                Units of measurement
            </Typography>
            <UnitsOfMeasurement units={units} setUnits={setUnits}/>
        </div>

    )
};

export default SettingsPage;