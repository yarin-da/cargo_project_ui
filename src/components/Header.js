import {useNavigate} from "react-router-dom";
import React, {useRef, useState} from "react";
import CustomText from "./CustomText";
import CustomAppBar from "./CustomAppBar";
import {Button} from "@mui/material";
import {Typography} from "@material-ui/core";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@mui/material";
import {useTranslation} from "react-i18next";
import {checkSolution} from "./SolutionInputTester";
import {scaledSolution} from "./Util";
import "../styles/Header.css";
import "../styles/Util.css";

const Header = ({units, setUnits, setSolution, setOriginalSolution}) => {
    const {t} = useTranslation();
    const [alertType, setAlertType] = useState('info');
    const [alertText, setAlertText] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const fileInputRef = useRef();

    const updateSolution = (solution) => {
        const scalar = solution['scalar'] ?? 1;
        const scaled = (scalar !== 0) ? scaledSolution(solution, 1 / scalar) : solution;
        setOriginalSolution(scaled);
        setSolution(scaled);
    };

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
                updateSolution(solution);
                navigate('/view');
            }
        }
    };

    return (
        <div className="header-div">
            <div className="head header-background-image cover">
                <div className="header">
                    <div className="header-title" style={{ marginBottom: 25 }}>
                        <Typography
                            className="header-title-text unselectable-text"
                            variant="h2"
                            style={{ color: '#aaa' }}
                        >
                            LET US 
                        </Typography>
                        <Typography
                            className="header-title-text unselectable-text"
                            variant="h2"
                            style={{ color: '#aaa' }}
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
                            <CustomText text="findPacking" variant="h4"/>
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
                            <CustomText text="viewSolution" variant="h4"/>
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