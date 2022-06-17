import {useNavigate} from "react-router-dom";
import React, {useRef, useState} from "react";
import CustomText from "./CustomText";
import CustomAppBar from "./CustomAppBar";
import {Button, Box} from "@mui/material";
import {Typography} from "@material-ui/core";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@mui/material";
import {useTranslation} from "react-i18next";
import { ReactComponent as HeaderWorldSvg } from '../images/header-world.svg';
import "../styles/Header.css";
import {checkSolution} from "./SolutionInputTester";

const Header = ({units, setUnits, setSolution, setOriginalSolution}) => {
    const {t} = useTranslation();
    const [alertType, setAlertType] = useState('info');
    const [alertText, setAlertText] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const fileInputRef = useRef();

    const uploadFile = (event) => {
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            const solution = JSON.parse(reader.result);
            const error = checkSolution(solution);
            if (error) {
                setAlertType('error');
                setAlertText(error.error);
                setShowAlert(true);
            } else {
                setOriginalSolution(solution);
                setSolution(solution);
                navigate('/view');
            }
        }
    };

    const imageStyle = {
        position: 'absolute',
        right: 0,
        top: 0,
    };
    const divStyle = {
        display: 'flex', 
        flexDirection: 'column-reverse', 
        width: '100vw', 
        height: '100vh', 
    }

    return (
        <div style={divStyle}>
            <div className="head header-background-image">
                <Box style={imageStyle}>
                    <HeaderWorldSvg />
                </Box>
                <div className="header">
                    <div className="header-title">
                        <Typography
                            className="header-title-text"
                            variant="h2"
                            style={{ color: 'black', fontWeight: 'bold' }}
                        >
                            LET US 
                        </Typography>
                        <Typography
                            className="header-title-text"
                            variant="h2"
                            style={{ color: 'black', fontWeight: 'bold' }}
                        >
                            DO THE PACKING.
                        </Typography>
                    </div>
                    <div style={{alignSelf: 'flex-start', display: 'flex', flexDirection: 'row'}}>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                textTransform: 'none',
                                color: "white",
                                border: '2px solid',
                                borderColor: "#42A5F5",
                                borderRadius: 5,
                                padding: 3,
                                background: '#42A5F5',
                                cursor: 'pointer',
                                margin: 1,
                                '&:hover': {
                                    filter: 'brightness(90%)',
                                },
                            }}
                            onClick={() => navigate('/config')}
                        >
                            <CustomText text="findPacking" variant="h3"/>
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                textTransform: 'none',
                                color: '#42A5F5',
                                '&:hover': {
                                    background: 'rgba(0, 0, 0, 0.1)',
                                },
                                border: '2px solid',
                                borderColor: "#42A5F5",
                                borderRadius: 5,
                                padding: 3,
                                background: 'white',
                                cursor: 'pointer',
                                margin: 1,
                            }}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <CustomText text="viewSolution" variant="h3"/>
                            <input
                                hidden
                                type="file"
                                ref={fileInputRef}
                                onChange={uploadFile}
                                accept=".json"
                            />
                        </Button>
                    </div>
                </div>
            </div>
            <Snackbar
                open={showAlert}
                autoHideDuration={10000}
                onClose={() => setShowAlert(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert onClose={() => setShowAlert(false)} severity={alertType} sx={{width: '100%'}}>
                    {t(alertText)}
                </Alert>
            </Snackbar>
            <CustomAppBar units={units} setUnits={setUnits}/>
        </div>
    )
};

export default Header;