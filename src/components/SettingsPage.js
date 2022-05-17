import UnitsOfMeasurement from "./UnitsOfMeasurement";
import {Box} from "@mui/material";
import israelFlag from '../images/israel_flag.png'
import americanFlag from '../images/american_flag.png'

const boxStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
}

const LanguageButton = ({ image, title, alt }) => {
    const buttonStyle = { 
        padding: 20, 
        margin: 10,
        border: '1px solid black', 
        borderRadius: 10,
        background: '#f7f7f7'
    };
    return (
        <Box component="span" style={buttonStyle}>
            <div style={boxStyle}>
                <img src={image}
                    alt={alt}
                    width="90"
                    height="60"/>
                <b>{title}</b>
            </div>
        </Box>        
    );
};

const SettingsPage = ({units, setUnits}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Settings</h1>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h3>Language</h3>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <LanguageButton image={israelFlag} alt={"Israel Flag"} title={"Hebrew"} />
                    <LanguageButton image={americanFlag} alt={"American Flag"} title={"English"} />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h3>Units of measurement</h3>
                <UnitsOfMeasurement units={units} setUnits={setUnits}/>
            </div>
        </div>

    )
};

export default SettingsPage;