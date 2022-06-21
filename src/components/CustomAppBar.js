import { useState } from "react";
import { Button, AppBar, Toolbar, Box, Modal, Tooltip } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import SettingsPage from './SettingsPage';
import Logo from '../images/logo.png';
import {useLocation, useNavigate} from "react-router-dom";
import ShowInfo from "./ShowInfo";
import {useTranslation} from "react-i18next";
import "../styles/Header.css";
import '../styles/CustomAppBar.css'

const SettingsButton = ({onClick}) => {
    return (
        <Button className="settings-button" onClick={onClick}>
            <SettingsIcon htmlColor="black" fontSize={"medium"} />
        </Button>
    );
};

const Information = ({onClick}) => {
    return (
        <Button className="info-button" onClick={onClick}>
            <InfoSharpIcon htmlColor="black" fontSize={"medium"}/>
        </Button>
    );
};

const CustomAppBar = ({ units, setUnits }) => {
    const { t } = useTranslation();
    const [showSettings, setShowSettings] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const toggleSettingsModal = () => setShowSettings(curr => !curr);
    const toggleInformationModal = () => setShowInfo(curr => !curr);
    const navigate = useNavigate();
    const isConfig =  (useLocation().pathname === '/config')
    return (
        <div className="app-bar">
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
                   <Box sx={{ display: 'flex' }}>
                       {!isConfig ? <Tooltip title={t("help")}>
                           <Toolbar>
                               <Information onClick={toggleInformationModal}/>
                           </Toolbar>
                       </Tooltip> : <div></div>}

                        <Tooltip title={t("settings")}>
                            <Toolbar>
                                <SettingsButton onClick={toggleSettingsModal}/>
                            </Toolbar>
                        </Tooltip>
                   </Box>
                </Toolbar>
            </AppBar>
            <Modal
                className="modal-style"
                open={showSettings}
                onClose={toggleSettingsModal}
            >
                <div className={'settings-modal'}>
                    <SettingsPage units={units} setUnits={setUnits}/>
                </div>
            </Modal>
            <Modal
                className="modal-style"
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