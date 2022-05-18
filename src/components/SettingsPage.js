import UnitsOfMeasurement from "./UnitsOfMeasurement";
import {Box} from "@mui/material";
import israelFlag from '../images/israel_flag.png'
import americanFlag from '../images/american_flag.png'
import { useTranslation } from "react-i18next";
import i18next from "i18next";

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
    const { t } = useTranslation();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>{t("settings")}</h1>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h3>Language</h3>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <button onClick={()=> i18next.changeLanguage('he')} >
                        Hebrew
                    </button>
                    <button onClick={()=> i18next.changeLanguage('en')} >
                        English
                    </button>
                    <LanguageButton image={israelFlag} alt={"Israel Flag"} title={"Hebrew"} onClick={()=> i18next.changeLanguage('he')}>
                    </LanguageButton>
                    <LanguageButton image={americanFlag} alt={"American Flag"} title={"English"} onClick={()=> i18next.changeLanguage('en')}>
                    </LanguageButton>
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