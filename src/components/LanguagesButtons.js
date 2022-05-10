import Box from '@mui/material/Box';
import israelFlag from '../images/israel_flag.png'
import americanFlag from '../images/american_flag.png'

const buttonsStyle = {
    display: "flex",
    marginLeft: "30%",
    marginBottom: "30px"
}

const boxStyle = {
    display: "flex",
    align: "center",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20
}

const LanguagesButtons = () => {
    return (
        <div style={buttonsStyle}>
            <Box component="span" sx={{p: 8, border: 1, borderRadius: 3, background: "white", width: 2, height: 2}}>
                <div style={boxStyle}>
                    <img src={israelFlag}
                         alt={"israel flag"}
                         width="90"
                         height="60"/><br/>
                    Hebrew
                </div>
            </Box>

            <div style={{display: "flex", marginLeft: 30}}>
                <Box component="span"
                     sx={{p: 8, border: 1, borderRadius: 3, background: "white", width: 2, height: 2}}>
                    <div style={boxStyle}>
                        <img src={americanFlag} alt={"american flag"} width="90" height="60"/>
                        English
                    </div>
                </Box>
            </div>
        </div>
    )
};

export default LanguagesButtons;