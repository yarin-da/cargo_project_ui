import React, {useState} from "react";
import {LocalShipping} from "@material-ui/icons";
import {Stepper, Step, StepLabel, Box, Fab, Snackbar, Alert} from "@mui/material";
import {Upload} from "@mui/icons-material";
import CustomText from "./CustomText";
import UploadFile from './UploadFile';
import AddContainer from './AddContainer';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import InventoryIcon from '@mui/icons-material/Inventory';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import ConfirmationDialog from "./ConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { getSolution } from "./ServerHandler";
import CircularProgress from '@mui/material/CircularProgress';
import CustomAppBar from "./CustomAppBar";
import '../styles/Config.css';
import ConfigPackageList from "./ConfigPackageList";

const tabs = [
    {
        title: 'uploadFileTab',
        icon: <Upload/>,
    },
    {
        title: 'addContainerTab',
        icon: <LocalShipping/>,
    },
    {
        title: 'addPackagesTab',
        icon: <InventoryIcon/>,
    }
];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: theme.palette.primary.main,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: theme.palette.primary.main,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        background: theme.palette.primary.main,
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        background: theme.palette.primary.main,
    }),
}));
  
function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {tabs[props.icon - 1]['icon']}
        </ColorlibStepIconRoot>
    );
}

const Config = ({
                    units,
                    setUnits,
                    packages,
                    setPackages,
                    container,
                    setContainer,
                    setSolution
                }) => {
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarTitle, setSnackbarTitle] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  
    const { t } = useTranslation();
    const navigate = useNavigate();

    const notifyLoading = async () => {
      await setLoading(true);
      await setSnackbarSeverity("info");
      await setSnackbarTitle("organizingYourPackages");
      await setSnackbarOpen(true);
    };
  
    const notifyError = async () => {
      await setSnackbarSeverity("error");
      await setSnackbarTitle("failedToOrganizeYourPackages");
      await setSnackbarOpen(true);
    };

    const uploadDataToServer = async () => {
        const data = {
            container,
            packages,
        };
        // TODO: check if data is valid?
        try {
            await notifyLoading();
            const solution = await getSolution(data);
            setSolution(solution);
            navigate("/view");
        } catch (e) {
            console.log(e);
            await notifyError();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            width: '100vw', 
            height: '100vh',
        }}>
            <CustomAppBar units={units} setUnits={setUnits} />
            <div style={{ width: '100%', height: '100%' }}>
                <div style={{ display: 'flex',  flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center' }}>
                    <Box sx={{ margin: 5, width: '100%' }}>
                        <Stepper activeStep={currentPage} alternativeLabel connector={<ColorlibConnector />}>
                            {tabs.map((tab) => (
                            <Step key={tab['title']}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>
                                    {t(tab['title'])}
                                </StepLabel>
                            </Step>
                            ))}
                        </Stepper>
                    </Box>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%' }}>
                        {
                            (currentPage === 0 && <UploadFile setContainer={setContainer} setPackages={setPackages} />)
                            ||
                            (currentPage === 1 && <AddContainer container={container} setContainer={setContainer} />)
                            ||
                            (currentPage === 2 &&
                                <ConfigPackageList
                                    units={units}
                                    packages={packages}
                                    setPackages={setPackages}
                                />
                            )
                        }
                    </div>
                    <ConfirmationDialog 
                        title="viewSolution" 
                        text=""
                        open={openConfirmDialog}
                        onConfirm={() => { setOpenConfirmDialog(false); uploadDataToServer(); }} 
                        onCancel={() => setOpenConfirmDialog(false)}
                    />
                    <Fab 
                        disabled={currentPage === 0}
                        color="primary"
                        size="large"
                        variant="extended"
                        style={{ position: 'fixed', left: 50, bottom: 50, minWidth: 100 }}
                        onClick={() => setCurrentPage(curr => curr - 1)}
                    >
                        <ArrowBackRoundedIcon fontSize="large" />
                        <CustomText text="back" style={{ textTransform: 'none' }} />
                    </Fab>
                    <Fab 
                        color={currentPage === tabs.length - 1 ? "secondary" : "primary"}
                        size="large"
                        variant="extended"
                        style={{ position: 'fixed', right: 50, bottom: 50, minWidth: 100 }}
                        onClick={() => {
                            if (currentPage === tabs.length - 1) {
                                setOpenConfirmDialog(true);
                            } else {
                                setCurrentPage(curr => curr + 1);
                            }
                        }
                        }
                    >
                        {loading ? 
                            <CircularProgress size={25} /> :
                            <CustomText 
                                text={currentPage === tabs.length - 1 ? "finish" : "next"} 
                                style={{ textTransform: 'none' }} 
                            />
                        }
                        {currentPage !== tabs.length - 1 && <ArrowForwardRoundedIcon fontSize="large" />}
                    </Fab>
                </div>
            </div>

            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={5000} 
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {t(snackbarTitle)}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Config;