<<<<<<< HEAD
import { useState } from "react";
import { Button, AppBar, Toolbar, Box, Modal, Tooltip } from "@mui/material";
=======
import {useState} from "react";
import {Button, AppBar, Toolbar, Box, Modal} from "@mui/material";
>>>>>>> 324a00c7792b1b9cc9eace45953bc389206b7522
import SettingsIcon from '@mui/icons-material/Settings';
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import SettingsPage from './SettingsPage';
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import Logo from '../images/logo.png';
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import ShowInfo from "./ShowInfo";
import {useTranslation} from "react-i18next";
import "../styles/Header.css";
=======
import {useNavigate} from "react-router-dom";
import ShowInfo from "./ShowInfo";
import {Tooltip} from "@material-ui/core";
import {useTranslation} from "react-i18next";
>>>>>>> 324a00c7792b1b9cc9eace45953bc389206b7522

const SettingsButton = ({onClick}) => {
    return (
<<<<<<< HEAD
        <Button className="settings-button" onClick={onClick}>
            <SettingsIcon htmlColor="black" fontSize={"medium"} />
=======
        <Button onClick={onClick}>
            <SettingsIcon htmlColor="black" fontSize={"medium"}/>
>>>>>>> 324a00c7792b1b9cc9eace45953bc389206b7522
        </Button>
    );
};

const Information = ({onClick}) => {
    return (
        <Button onClick={onClick}>
            <InfoSharpIcon htmlColor="black" fontSize={"medium"}/>
        </Button>
    );
};

<<<<<<< HEAD
const CustomAppBar = ({ units, setUnits }) => {
    const { t } = useTranslation();
=======
const CustomAppBar = ({units, setUnits}) => {
    const {t} = useTranslation();
>>>>>>> 324a00c7792b1b9cc9eace45953bc389206b7522
    const [showSettings, setShowSettings] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const toggleSettingsModal = () => setShowSettings(curr => !curr);
    const toggleInformationModal = () => setShowInfo(curr => !curr);
    const navigate = useNavigate();
    return (
        <div style={{boxShadow: '10px 3px 10px rgba(0,0,0,0.25)', zIndex: 1}}>
            <AppBar position="static" style={{backgroundColor: '#42A5F5'}}>
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box
                        onClick={() => navigate('/')}
                        component="img"
                        sx={{
                            padding: 1,
                            height: 64,
                            cursor: 'pointer',
                        }}
                        alt="Your logo."
                        src={Logo}
                    />
<<<<<<< HEAD
                   <Box sx={{ display: 'flex' }}>
                        <Tooltip title={t("help")}>
                            <Toolbar>
                                <Information onClick={toggleInformationModal}/>
                            </Toolbar>
                        </Tooltip>
                        <Tooltip title={t("settings")}>
                            <Toolbar>
                                <SettingsButton onClick={toggleSettingsModal}/>
                            </Toolbar>
                        </Tooltip>
                   </Box>
=======
                    <Tooltip title={t("settings")}>
                        <Toolbar>
                            <SettingsButton onClick={toggleSettingsModal}/>
                        </Toolbar>
                    </Tooltip>
                    <Tooltip title={t("help")}>
                        <Toolbar>
                            <Information onClick={toggleInformationModal}/>
                        </Toolbar>
                    </Tooltip>
>>>>>>> 324a00c7792b1b9cc9eace45953bc389206b7522
                </Toolbar>
            </AppBar>
            <Modal
                style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                open={showSettings}
                onClose={toggleSettingsModal}
            >
                <div className={'settings-modal'}>
                    <SettingsPage units={units} setUnits={setUnits}/>
                </div>
            </Modal>
            <Modal
                style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                open={showInfo}
                onClose={toggleInformationModal}
            >
                <div>
                    <ShowInfo/>
                </div>
            </Modal>
            <Modal
                style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                open={showInfo}
                onClose={toggleInformationModal}
            >
                <div>
                    <ShowInfo/>
                </div>
            </Modal>
        </div>
    );
};

export default CustomAppBar;