import React, { useState } from "react";
import { getColors } from "./Color";
import { Tooltip, Fab, Snackbar, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import CustomAppBar from "../CustomAppBar";
import saveJson from "../SaveJson";
import View3D from "./View3D";
import Stats from "./Stats";
import ColorMap from "./ColorMap";
import PackageControl from "./PackageControl";
import outputSolutionTester from "../OutputSolutionTester";
import '../../styles/ViewPage.css';

const scaledSolution = (solution) => {
    const scalar = solution['scalar'];
    if (!scalar || scalar == 1) return solution;
    
    const dims = ['width', 'depth', 'height'];
    const pos = ['x', 'y', 'z'];
    const newSolution = {...solution};

    dims.forEach(dim => {
        newSolution['container'][dim] *= scalar;
    });
    for (let idx in newSolution['packages']) {
        dims.forEach(dim => {
            newSolution['packages'][idx][dim] *= scalar;
        });
    }
    
    for (let idx in newSolution['solution']) {
        pos.forEach(p => {
            newSolution['solution'][idx][p] *= scalar;
        });
    }

    return newSolution;
};

function downloadSolutionFile(exportType, solution){
    const scaled = scaledSolution(solution);
    saveJson('packing_solution', scaled);
}

const initializeColors = (packages) => {  
    const colorMap = {};
    if (packages) {
        packages.forEach(pkg => {
            const pkgType = pkg['type'];
            const pkgColor = getColors();
            colorMap[pkgType] = pkgColor;
        });    
    }
    return colorMap;
};

const MAX_HISTORY = 50;

const ViewPage = ({ 
    historyIndex, setHistoryIndex,
    historyActions, setHistoryActions,
    solution, setSolution, 
    units, setUnits, 
    originalSolution,
}) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarTitle, setSnackbarTitle] = useState(false);
    const [selectedPackages, setSelectedPackages] = useState([]);
    const [colorMap, setColorMap] = useState(initializeColors(solution ? (solution['packages'] ?? []) : []));
    const { t } = useTranslation();

    const redo = (action) => {
        const newSolution = {...solution};
        action.packages.forEach(pkg => {
            newSolution['solution'][pkg][action.prop] += action.value;
        });
        setSolution(newSolution);
    };
    
    const undo = (action) => {
        const newSolution = {...solution};
        action.packages.forEach(pkg => {
            newSolution['solution'][pkg][action.prop] -= action.value;
        });
        setSolution(newSolution);
    };

    const resetHistory = () => {
        setHistoryActions([]);
        setHistoryIndex(0);
    }

    const addHistoryAction = (action) => {
        const start = historyIndex;
        const end = Math.min(historyActions.length, start + MAX_HISTORY - 1);
        setHistoryActions(curr => [action, ...curr.slice(start, end)]);
    }

    const undoHistoryAction = () => {
        const newIndex = historyIndex + 1;
        if (newIndex <= historyActions.length) {
            const action = historyActions[historyIndex];
            undo(action);
            setHistoryIndex(newIndex);
        }
    }

    const redoHistoryAction = () => {
        const newIndex = historyIndex - 1;
        if (newIndex >= 0) {
            const action = historyActions[newIndex];
            redo(action);
            setHistoryIndex(newIndex);
        }
    }

    const onDownload = (exportType) => {
        const ret = outputSolutionTester(solution);
        if (!ret.error) {
            downloadSolutionFile(exportType, solution);
        } else {
            setSnackbarOpen(true);
            setSnackbarTitle(ret.error);
        }
    };

    const selectRandomPackage = () => {
        if (!solution) return;
        const randIndex = Math.floor(Math.random() * (solution['solution'].length));
        setSelectedPackages([randIndex]);
    };

    const divStyle = {
        position: 'relative', 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
    };

    return (
        <div style={divStyle}>
            <CustomAppBar units={units} setUnits={setUnits} />
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <View3D 
                    solution={solution ? (solution['solution'] ?? []) : []} 
                    setSolution={setSolution} 
                    packages={solution ? (solution['packages'] ?? []) : []}
                    container={solution ? (solution['container'] ?? {}) : {}}
                    colorMap={colorMap} 
                    selectedPackages={selectedPackages} 
                    setSelectedPackages={setSelectedPackages} 
                />
                <ColorMap colorMap={colorMap} setColorMap={setColorMap} />
                <div style={{ position: 'absolute', right: 50, bottom: 50, display: 'flex', flexDirection: 'column' }}>
                    <Tooltip title={t('exportSolution')} arrow>
                        <Fab sx={{ padding: 5, margin: 2 }} onClick={() => onDownload('json')} color="primary">
                            <FileDownloadIcon fontSize="large" />
                        </Fab>
                    </Tooltip>
                    <Tooltip title={t('editSolution')} arrow>
                        <Fab 
                            sx={{ padding: 5, margin: 2 }}
                            variant="circular"
                            size="large"
                            color={selectedPackages.length > 0 ? "secondary" : "primary"}
                            onClick={() => selectedPackages.length > 0 ? setSelectedPackages([]) : selectRandomPackage()}
                        >
                            <EditIcon fontSize="large" />
                        </Fab>
                    </Tooltip>
                </div>
                {
                    selectedPackages.length === 0 ?
                    <Stats 
                        stats={solution ? solution['stats'] : {}} 
                        container={solution ? solution['container'] : {}} 
                    />
                    :
                    <PackageControl 
                        solution={solution ? solution['solution'] : []} 
                        container={solution ? solution['container'] : {}} 
                        packages={solution ? solution['packages'] : []} 
                        setSolution={setSolution} 
                        selectedPackages={selectedPackages} 
                        originalSolution={originalSolution}
                        historyFunctions={{ addHistoryAction, resetHistory, undoHistoryAction, redoHistoryAction }}
                    />
                }
            </div>
            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={5000} 
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={'error'} sx={{ width: '100%' }}>
                    {t(snackbarTitle)}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ViewPage;
