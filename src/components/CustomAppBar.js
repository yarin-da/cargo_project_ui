import { useState } from "react";
import { Button, AppBar, Toolbar, Box, Modal } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsPage from './SettingsPage';
import Logo from '../images/logo.png';
import { useNavigate } from "react-router-dom";

const SettingsButton = ({ onClick }) => {
    return (
        <Button onClick={onClick}>
            <SettingsIcon htmlColor="black" fontSize={"medium"} />
        </Button>
    );
};

const CustomAppBar = ({ units, setUnits }) => {
    const [showSettings, setShowSettings] = useState(false);
    const toggleSettingsModal = () => setShowSettings(curr => !curr);
    const navigate = useNavigate();
    return (
        <div style={{ boxShadow: '10px 3px 10px rgba(0,0,0,0.25)' }}>
            <AppBar position="static">
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
                    <Toolbar>
                        <SettingsButton onClick={toggleSettingsModal} />
                    </Toolbar>
                </Toolbar>
            </AppBar>
            <Modal 
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                open={showSettings} 
                onClose={toggleSettingsModal}
            >
                <div className={'settings-modal'}>
                    <SettingsPage units={units} setUnits={setUnits} />
                </div>
            </Modal>
        </div>
    );
};

export default CustomAppBar;