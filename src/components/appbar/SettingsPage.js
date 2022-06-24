import UnitsOfMeasurement from "./UnitsOfMeasurement";
import { Button } from "@mui/material";
import israelFlag from '../../images/israel_flag.png'
import americanFlag from '../../images/american_flag.png'
import CustomText from "../util/CustomText";
import Preference from "./Preference";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";

const LanguageButton = ({ image, title, isSelected, onClick }) => {
    const buttonStyle = { 
        padding: 20, 
        margin: 10,
        border: '1px solid black', 
        borderRadius: 10,
        background: isSelected ? '#e7e7f7' : '#f7f7f7',
        textTransform: 'none'
    };

    return (
        <Button component="span" style={buttonStyle} onClick={onClick}>
            <div className="box-languages-button">
                <CustomText text={title} style={{fontWeight: 'bold'}} />
                <img src={image}
                    alt={title}
                    width="90"
                    height="60"/>
            </div>
        </Button>        
    );
};

const SettingsPage = ({units, setUnits, preference, setPreference}) => {
    const { i18n } = useTranslation();
    return (
        <div className="settings-page" >
            <CustomText text="settings" variant="h4" />
            <div className="languages-div">
                <CustomText text="language" variant="h5" style={{ margin: 10 }} />
                <div className="languages-buttons" >
                    <LanguageButton 
                        image={israelFlag} 
                        title={"hebrew"} 
                        isSelected={i18n.language === 'he'}
                        onClick={()=> changeLanguage('he')} 
                    />
                    <LanguageButton 
                        image={americanFlag} 
                        title={"english"} 
                        isSelected={i18n.language === 'en'}
                        onClick={()=> changeLanguage('en')} 
                    />
                </div>
            </div>
            <div className="units-of-measurement-div">
                <CustomText text="unitsOfMeasurement" variant="h5" />
                <UnitsOfMeasurement units={units} setUnits={setUnits}/>
            </div>
            <div className="units-of-measurement-div">
                <CustomText text="preference" variant="h5" />
                <Preference preference={preference} setPreference={setPreference}/>
            </div>
        </div>

    )
};

export default SettingsPage;