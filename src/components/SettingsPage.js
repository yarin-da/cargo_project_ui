import UnitsOfMeasurement from "./UnitsOfMeasurement";
import { Button } from "@mui/material";
import israelFlag from '../images/israel_flag.png'
import americanFlag from '../images/american_flag.png'
import CustomText from "./CustomText";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";

const LanguageButton = ({ image, title, isSelected, onClick }) => {
    const boxStyle = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    };

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
            <div style={boxStyle}>
                <CustomText text={title} style={{fontWeight: 'bold'}} />
                <img src={image}
                    alt={title}
                    width="90"
                    height="60"/>
            </div>
        </Button>        
    );
};

const SettingsPage = ({units, setUnits}) => {
    const { i18n } = useTranslation();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CustomText text="settings" variant="h4" />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CustomText text="language" variant="h5" style={{ margin: 10 }} />
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CustomText text="unitsOfMeasurement" variant="h5" />
                <UnitsOfMeasurement units={units} setUnits={setUnits}/>
            </div>
        </div>

    )
};

export default SettingsPage;