import UnitsOfMeasurement from "./UnitsOfMeasurement";
import { Button } from "@mui/material";
import israelFlag from '../images/israel_flag.png'
import americanFlag from '../images/american_flag.png'
import CustomText from "./CustomText";
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
                <CustomText text={title} style={{fontWeight: 'bold'}} />
                <img src={image}
                    alt={alt}
                    width="90"
                    height="60"/>
            </div>
        </Button>        
    );
};

const SettingsPage = ({units, setUnits}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CustomText text="settings" variant="h4" />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CustomText text="language" variant="h5" style={{ margin: 10 }} />
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <LanguageButton 
                        image={israelFlag} 
                        alt={"Israel Flag"} 
                        title={"hebrew"} 
                        onClick={()=> i18next.changeLanguage('he')} 
                    />
                    <LanguageButton 
                        image={americanFlag} 
                        alt={"American Flag"} 
                        title={"english"} 
                        onClick={()=> i18next.changeLanguage('en')} 
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