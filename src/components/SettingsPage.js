import UnitsOfMeasurement from "./UnitsOfMeasurement";
import { Button, Typography } from "@mui/material";
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

const LanguageButton = ({ image, title, alt, onClick }) => {
    const buttonStyle = { 
        padding: 20, 
        margin: 10,
        border: '1px solid black', 
        borderRadius: 10,
        background: '#f7f7f7',
        'text-transform': 'none'
    };
    return (
        <Button component="span" style={buttonStyle} onClick={onClick}>
            <div style={boxStyle}>
                <Typography style={{fontWeight: 'bold'}}>{title}</Typography>
                <img src={image}
                    alt={alt}
                    width="90"
                    height="60"/>
            </div>
        </Button>        
    );
};

const SettingsPage = ({units, setUnits}) => {
    const { t } = useTranslation();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h4">{t("settings")}</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography style={{margin:10}} variant="h5">{t("language")}</Typography>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <LanguageButton 
                        image={israelFlag} 
                        alt={"Israel Flag"} 
                        title={t("hebrew")} 
                        onClick={()=> i18next.changeLanguage('he')} 
                    />
                    <LanguageButton 
                        image={americanFlag} 
                        alt={"American Flag"} 
                        title={t("english")} 
                        onClick={()=> i18next.changeLanguage('en')} 
                    />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h5">{t("units_of_measurement")}</Typography>
                <UnitsOfMeasurement units={units} setUnits={setUnits}/>
            </div>
        </div>

    )
};

export default SettingsPage;