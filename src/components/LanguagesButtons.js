import Box from '@mui/material/Box';
import israelFlag from '../images/israel_flag.png'
import americanFlag from '../images/american_flag.png'

const buttonsStyle = {
    display: "flex",
}

const boxStyle = {
    display: "flex",
    align: "center",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
}

const LanguageButton = ({ image, title, alt }) => {
    return (
        <Box component="span" sx={{p: 8, border: 1, borderRadius: 3, background: "white", width: 2, height: 2}}>
            <div style={boxStyle}>
                <img src={image}
                    alt={alt}
                    width="90"
                    height="60"/><br/>
                {title}
            </div>
        </Box>        
    );
};

const LanguagesButtons = () => {
    return (
        <div style={buttonsStyle}>
            <LanguageButton image={israelFlag} alt={"Israel Flag"} title={"Hebrew"} />
            <LanguageButton image={americanFlag} alt={"American Flag"} title={"English"} />
        </div>
    )
};

export default LanguagesButtons;