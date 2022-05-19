import React, {useState} from "react";
import {LocalShipping, Settings} from "@material-ui/icons";
import {AppBar, Toolbar, Box, Button, Modal, Fab} from "@mui/material";
import {Upload} from "@mui/icons-material";
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsPage from './SettingsPage';
import Logo from '../images/logo.png';
import LeftMenu from './LeftMenu';
import UploadFile from './UploadFile';
import AddContainer from './AddContainer';
import PackagesList from './PackagesList';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
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
            title: 'Upload file (optional)',
            icon: <Upload/>,
            url: '/config/upload_file'
        },
        {
            title: 'Container',
            icon: <LocalShipping/>,
            url: '/config/add_container'
        },
        {
            title: 'Packages',
            icon: <Settings/>,
            url: '/config/add_packages'
        }
    ];

    const [showSettings, setShowSettings] = useState(false);
    const toggleSettingsModal = () => setShowSettings(curr => !curr);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            <Heading onClickSettings={toggleSettingsModal} />

            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                <LeftMenu buttons={pages} selected={currentPage} notifyButtonClicked={setCurrentPage}/>
                <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        currentPage === 0 && <UploadFile setContainer={setContainer} setPackages={setPackages} />
                    }
                    {
                        currentPage === 1 && <AddContainer container={container} setContainer={setContainer} />
                    }
                    {
                        currentPage === 2 &&
                        <PackagesList
                            units={units}
                            packages={packages}
                            setPackages={setPackages}
                            currentPackage={currentPackage}
                            setCurrentPackage={setCurrentPackage}
                        />
                    }
                    <Fab 
                        color="primary"
                        size="large"
                        variant="extended"
                        style={{ position: 'absolute', right: 50, bottom: 50 }}
                        onClick={() => setCurrentPage((currentPage + 1) % pages.length)}
                    >
                        NEXT
                        <ArrowForwardRoundedIcon fontSize="large" />
                    </Fab>
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