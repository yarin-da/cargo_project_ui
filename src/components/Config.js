import React, {useState} from "react";
import {LocalShipping, Settings} from "@material-ui/icons";
import {AppBar, Toolbar, Box, Button, Modal} from "@mui/material";
import {Upload} from "@mui/icons-material";
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsPage from './SettingsPage';
import Logo from '../images/logo.png';
import LeftMenu from './LeftMenu';
import UploadFile from './UploadFile';
import AddContainer from './AddContainer';
import PackagesList from './PackagesList';
import '../styles/Config.css';

const SettingsButton = ({ onClick }) => {
    return (
        <Button onClick={onClick}>
            <SettingsIcon htmlColor="black" fontSize={"medium"} />
        </Button>
    );
};

const Heading = ({ onClickSettings }) => {
    return (
        <AppBar position="static">
            <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                <Box
                    component="img"
                    sx={{
                        padding: 1,
                        height: 64,
                    }}
                    alt="Your logo."
                    src={Logo}
                />
                <Toolbar>
                    <SettingsButton onClick={onClickSettings} />
                </Toolbar>
            </Toolbar>
        </AppBar>
    );
};

const Config = ({
                    units,
                    setUnits,
                    packages,
                    setPackages,
                    currentPackage,
                    setCurrentPackage,
                    container,
                    setContainer
                }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        {
            title: 'Settings',
            icon: <Settings/>,
        },
        {
            title: 'Upload file (optional)',
            icon: <Upload/>,
        },
        {
            title: 'Container',
            icon: <LocalShipping/>,
        },
        {
            title: 'Packages',
            icon: <Settings/>,
        }
    ];

    const [showSettings, setShowSettings] = useState(false);
    const toggleSettingsModal = () => setShowSettings(curr => !curr);
    return (
        <div>
            <Heading onClickSettings={toggleSettingsModal} />

            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                <LeftMenu buttons={pages} selected={currentPage} notifyButtonClicked={setCurrentPage}/>
                <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                {
                    currentPage === 0 && <SettingsPage units={units} setUnits={setUnits}/>
                }
                {
                    currentPage === 1 && <UploadFile setContainer={setContainer} setPackages={setPackages} />
                }
                {
                    currentPage === 2 && <AddContainer
                        container={container}
                        setContainer={setContainer}
                    />
                }
                {
                    currentPage === 3 && <PackagesList
                        units={units}
                        packages={packages}
                        setPackages={setPackages}
                        currentPackage={currentPackage}
                        setCurrentPackage={setCurrentPackage}
                    />
                }
                </div>
            </div>

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

export default Config;