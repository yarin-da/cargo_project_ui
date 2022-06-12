import { useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import CustomText from "./CustomText";
import CustomAppBar from "./CustomAppBar";
import { Button } from "@mui/material";
import { Typography } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import "../styles/Header.css";

const checkSolution = (input) => {
    return '';
};

const Header = ({ units, setUnits, setSolution, setOriginalSolution }) => {
    const { t } = useTranslation();
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
                setAlertText(error);
                setShowAlert(true);
            } else {
                setOriginalSolution(solution);
                setSolution(solution);
                navigate('/view');
            }
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column-reverse', width: '100vw', height: '100vh' }}>
            <div className="head">
                <div className="header">
                    <div className="header-title">
                        <Typography 
                            className="header-title-text"
                            variant="h2"
                        >
                            LET YOUR SUCCESS
                        </Typography>
                        <Typography 
                            className="header-title-text" 
                            variant="h2"
                        >
                            RIDE WITH US.
                        </Typography>
                    </div>
                    <div style={{alignSelf: 'center', display: 'flex', flexDirection: 'column'}}>
                        <Button
                            sx={{
                                textTransform: 'none',
                                color: "primary",
                                border: '2px solid',
                                borderColor: "primary",
                                borderRadius: 5,
                                padding: 3,
                                background: 'rgba(30, 30, 45, 0.5)',
                                cursor: 'pointer',
                                margin: 1,
                            }}
                            onClick={() => navigate('/config')}
                        >
                            <CustomText text="findPacking" variant="h3" />
                        </Button>
                        <Button
                            sx={{
                                textTransform: 'none',
                                color: "primary",
                                border: '2px solid',
                                borderColor: "primary",
                                borderRadius: 5,
                                padding: 3,
                                background: 'rgba(30, 30, 45, 0.5)',
                                cursor: 'pointer',
                                margin: 1,
                            }}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <CustomText text="viewSolution" variant="h3" />
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setShowAlert(false)} severity={alertType} sx={{ width: '100%' }}>
                    {t(alertText)}
                </Alert>
            </Snackbar>
            <CustomAppBar units={units} setUnits={setUnits} />
        </div>
    )
};

export default Header;