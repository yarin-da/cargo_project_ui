import React, {useState} from "react";
import {LocalShipping} from "@material-ui/icons";
import {Stepper, Step, StepLabel, Box, Fab, Snackbar, Alert, SpeedDial, SpeedDialAction} from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import { getSolution } from "./ServerHandler";
import CircularProgress from '@mui/material/CircularProgress';
import CustomAppBar from "./CustomAppBar";
import ConfigPackageList from "./ConfigPackageList";
import SaveIcon from '@mui/icons-material/Save';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import { isInputValid } from "./Type";
import { createStyles, makeStyles } from '@mui/styles';
import saveJson from "./SaveJson";
import saveCSV from "./SaveCSV"
import '../styles/Config.css';
import '../styles/Util.css'

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

const useStyles = makeStyles((theme) =>
  createStyles({
    StaticTooltipLabel: {
        whiteSpace: "nowrap",
        maxWidth: "none",
    },
  }),
);

const Config = ({
                    units,
                    setUnits,
                    packages,
                    setPackages,
                    container,
                    setContainer,
                    setSolution,
                    setOriginalSolution,
                }) => {
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [saveInputDialog, setSaveInputDialog] = useState(false)
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
  
    const notifyError = async (err) => {
      await setSnackbarSeverity("error");
      await setSnackbarTitle(err);
      await setSnackbarOpen(true);
    };

    const uploadDataToServer = async () => {
        try {
            const data = { container, packages };
            await notifyLoading();
            const err = isInputValid(data)
            if (err) throw err;
            const solution = await getSolution(data);
            setSolution(solution);
            setOriginalSolution(solution);
            navigate("/view");
        } catch (e) {
            await notifyError(e.message ?? e);
        } finally {
            await setLoading(false);
        }
    };

    const classes = useStyles();

    return (
        <div className="config-div">
            <CustomAppBar units={units} setUnits={setUnits} />
            <div style={{ width: '100%', height: '100%' }}>
                <div className="stepper-div" >
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
                    <div className="pages" >
                        {
                            (currentPage === 0 && <UploadFile setContainer={setContainer} setPackages={setPackages} />)
                            ||
                            (currentPage === 1 && <AddContainer units={units} container={container} setContainer={setContainer} />)
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
                    <Fab 
                        disabled={currentPage === 0}
                        color="primary"
                        size="large"
                        variant="extended"
                        style={{ position: 'fixed', left: 50, bottom: 50, minWidth: 100 }}
                        onClick={() => setCurrentPage(curr => curr - 1)}
                    >
                        <ArrowBackRoundedIcon fontSize="large" />
                        <CustomText text="back" className="no-text-transform" />
                    </Fab>
                    {
                        currentPage === tabs.length - 1 ?
                        <SpeedDial 
                            ariaLabel="exportInput" 
                            FabProps={{
                                color: "secondary",
                                size: "large",
                                variant: "extended",
                                style: {minWidth: 100},
                            }}
                            icon={<DoneIcon fontSize="large" />}
                            style={{ position: 'fixed', right: 50, bottom: 50 }}
                            onClick={() => setOpenConfirmDialog(true)}
                        >
                            <SpeedDialAction 
                                classes={{ staticTooltipLabel: classes.StaticTooltipLabel }}
                                icon={<SaveIcon fontSize="large" />} 
                                tooltipTitle={t("saveInput")} 
                                onClick={() => setSaveInputDialog(true)}
                                FabProps={{ sx: { width: 60, height: 60 } }}
                                tooltipOpen
                            />
                            <SpeedDialAction 
                                classes={{ staticTooltipLabel: classes.StaticTooltipLabel }}
                                icon={<LocalShippingIcon fontSize="large" />} 
                                tooltipTitle={t("pack")} 
                                onClick={() => uploadDataToServer()} 
                                FabProps={{ sx: { width: 60, height: 60 } }}
                                tooltipOpen
                            />
                        </SpeedDial>
                        :
                        <Fab 
                            color="primary"
                            size="large"
                            variant="extended"
                            style={{ position: 'fixed', right: 50, bottom: 50, minWidth: 100 }}
                            onClick={() => setCurrentPage(curr => curr + 1)}
                        >
                            <CustomText text="next" className="no-text-transform" />
                            <ArrowForwardRoundedIcon fontSize="large" />
                        </Fab>
                    }
                </div>
            </div>
            {loading && 
                <CircularProgress 
                    style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} 
                    size={50} />
            }
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

            <Dialog
                open={saveInputDialog}
                onClose={() => setSaveInputDialog(false)}
            >
                <DialogTitle id="alert-dialog-title">
                    <CustomText text="saveInputFile" variant="h5"/>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <CustomText text="saveFileDialogText"/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => saveJson('user_input', {container, packages})}>Json</Button>
                    <Button onClick={() => saveCSV('user_input', {container, packages})}>
                        CSV
                    </Button>
                    <Button onClick={() => setSaveInputDialog(false)}>{t("cancel")}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Config;