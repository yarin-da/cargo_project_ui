import { useState } from "react";
import View3D from "./View3D";
import { getColorsByHash } from "./Color";
import { HexColorPicker } from "react-colorful" 
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import CustomText from "../CustomText";
import { useTranslation } from "react-i18next";
import { Tooltip, Fab, Modal, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { saveAs } from "file-saver";
import { parseJSONtoCSV } from "../CSVParser";
import CustomAppBar from "../CustomAppBar";
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const jsonToBlob = (data) => {
    const str = JSON.stringify(data, null, 2);
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], { type: "application/json;charset=utf-8" });
    return blob;
};

const csvToBlob = (data) => {
    const csv = parseJSONtoCSV(data);
    const bytes = new TextEncoder().encode(csv);
    const blob = new Blob([bytes], { type: "text/csv" });
    return blob;
};

const getSolutionBlob = (exportType, solution) => {
    if (exportType === 'csv') {
        return csvToBlob(solution);
    }
    return jsonToBlob(solution);
};

function downloadSolutionFile(exportType, solution){
    let blob = getSolutionBlob(exportType, solution);
    saveAs(blob, `packing_solution.${exportType}`);
}

const ColorPicker = ({ open, onColorPicked, initialColor, onClose }) => {
    const [color, setColor] = useState(initialColor);
    return (
        <Modal 
            style={{ position: 'absolute', top: 50, left: 50 }}
            open={open} 
            onClose={onClose}
        >
            <span>
                <HexColorPicker
                    onChange={(newColor) => setColor(newColor)}
                    onClick={() => onColorPicked(color)}
                    onDoubleClick={onClose}
                />
            </span>
        </Modal>
    );
}

const initializeColors = (packages) => {  
    const colorMap = {};
    if (packages) {
        packages.forEach(pkg => {
            const pkgType = pkg['type'];
            const pkgColor = getColorsByHash(pkgType);
            colorMap[pkgType] = pkgColor;
        });    
    }
    return colorMap;
};

const ColorMap = ({ colorMap, setColorMap }) => {
    const [openColorPicker, setOpenColorPicker] = useState(false);
    const [clickedPkg, setClickPkg] = useState(null);

    const onPackageClicked = (pkg) => {
        setClickPkg(pkg);
        setOpenColorPicker(curr => !curr);
    };

    const onFinish = () => {
        setOpenColorPicker(curr => !curr);
    };

    const onColorPicked = (newColor) => {
        setColorMap(curr => ({ ...curr, [clickedPkg]: newColor }));
    };

    // TODO: add some indication for the user that he can change the colors by clicking the circles
    return (
        <div className="color-map">
            {Object.keys(colorMap).map(k => 
                <li key={`color-map-${k}`} className="color-item">
                    <div 
                        className="color-sample" 
                        onClick={() => onPackageClicked(k)}
                        style={{background: colorMap[k]}} 
                    />
                    <div className="color-type-name">{k}</div>
                </li>
            )}
            <ColorPicker
                open={openColorPicker}
                onClose={onFinish}
                initialColor={colorMap[clickedPkg]}
                onColorPicked={onColorPicked}
            />
        </div>
    );
};

const PackageControl = ({ 
    solution, 
    container,
    packages,
    setSolution, 
    selectedPackages, 
    addHistory, 
    changeHistoryIndex, 
    originalSolution,
    resetHistory,
}) => {
    
    const isLegal = (pkg) => {
        // TODO: implement (handle rotations)
        return true;
    };

    const update = (prop, value) => {
        const newSolution = [...solution];
        addHistory(selectedPackages.map(idx => ({index: idx, pkg: solution[idx]})));
        selectedPackages.forEach(selectedPackage => {
            const newPackage = {...solution[selectedPackage]};
            newPackage[prop] += value;
            if (isLegal(newPackage)) {
                newSolution[selectedPackage] = newPackage;    
            }
        });
        setSolution(curr => ({...curr, solution: newSolution}));
    };

    const buttonStyle = {
        borderRadius: '10px',
        border: '1px solid #446',
        background: '#ddf',
        color: '#446',
        width: 45,
        height: 45,
        margin: 5,
        fontWeight: 'bold',
        fontSize: 20,
        cursor: 'pointer',
    };

    const rowStyle = {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-evenly'
    };
    
    return (
        selectedPackages.length === 0 ? <></> :
        <div style={{ 
            position: 'absolute', 
            top: 10, 
            right: 10, 
            background: '#ddd', 
            border: '1px solid #446',
            padding: 10,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={rowStyle}>
                <Button style={buttonStyle} onClick={() => {
                    setSolution(originalSolution);
                    resetHistory();
                }}>
                    <RestartAltIcon />
                </Button>   
                <Button style={buttonStyle} onClick={() => changeHistoryIndex(1)}>
                    <UndoIcon />
                </Button>
                <Button style={buttonStyle} onClick={() => changeHistoryIndex(-1)}>
                    <RedoIcon />
                </Button>   
            </div>
            <div style={rowStyle}>
                {/* <span style={{fontSize: 22, fontWeight: 'bold', color: 'red'}}>X</span> */}
                <Button style={{...buttonStyle, color: 'red'}} onClick={() => update('x', -1)}>-</Button>
                <Button style={{...buttonStyle, color: 'red'}} onClick={() => update('x', +1)}>+</Button>    
                <Button style={{...buttonStyle, color: 'red'}} onClick={() => update('rotation-x', 90)}><ThreeSixtyIcon /></Button>
            </div>
            <div style={rowStyle}>
                {/* <span style={{fontSize: 22, fontWeight: 'bold', color: 'blue'}}>Y</span> */}
                <Button style={{...buttonStyle, color: 'blue'}} onClick={() => update('y', -1)}>-</Button>
                <Button style={{...buttonStyle, color: 'blue'}} onClick={() => update('y', +1)}>+</Button>
                <Button style={{...buttonStyle, color: 'blue'}} onClick={() => update('rotation-y', 90)}><ThreeSixtyIcon /></Button>
            </div>
            <div style={rowStyle}>
                {/* <span style={{fontSize: 22, fontWeight: 'bold', color: 'green'}}>Z</span> */}
                <Button style={{...buttonStyle, color: 'green'}} onClick={() => update('z', -1)}>-</Button>
                <Button style={{...buttonStyle, color: 'green'}} onClick={() => update('z', +1)}>+</Button>
                <Button style={{...buttonStyle, color: 'green'}} onClick={() => update('rotation-z', 90)}><ThreeSixtyIcon /></Button>
            </div>
        </div>
    );
};

const MAX_HISTORY = 10;

const ViewPage = ({ solution, setSolution, units, setUnits, originalSolution }) => {
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [selectedPackages, setSelectedPackages] = useState([]);
    const [colorMap, setColorMap] = useState(initializeColors(solution ? (solution['packages'] ?? []) : []));
    const [showExportDialog, setShowExportDialog] = useState(false);
    const { t } = useTranslation();
    const onClose = () => setShowExportDialog(false);
    const onDownload = (exportType) => {
        downloadSolutionFile(exportType, solution);
        onClose();
    };

    const addHistory = (h) => {
        setHistory(curr => [h, ...curr.slice(historyIndex, Math.min(curr.length, historyIndex + MAX_HISTORY - 1))]);
        setHistoryIndex(0);
    };

    const changeHistoryIndex = (step) => {
        const currIndex = historyIndex;
        const newIndex = currIndex + step;
        if (newIndex >= 0 && newIndex <= history.length) {
            const newSolution = {...solution};
            history[step < 0 ? newIndex : currIndex].forEach(hist => newSolution['solution'][hist['index']] = hist['pkg']);
            setSolution(newSolution);
            setHistoryIndex(newIndex);
        }
    };

    const selectRandomPackage = () => {
        if (!solution) return;
        const randIndex = Math.floor(Math.random() * (solution['solution'].length));
        setSelectedPackages([randIndex]);
    };

    const resetHistory = () => {
        setHistory([]);
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
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
                <div style={{ position: 'absolute', right: 50, bottom: 50 }}>
                    <Tooltip title={t('editSolution')}>
                        <Fab 
                            sx={{ padding: 5, margin: 1 }}
                            variant="circular"
                            size="large"
                            color="primary"
                            onClick={() => selectedPackages.length > 0 ? setSelectedPackages([]) : selectRandomPackage()}
                        >
                            <EditIcon fontSize="large" />
                        </Fab>
                    </Tooltip>
                    <Tooltip title={t('exportSolution')}>
                        <Fab 
                            sx={{ padding: 5, margin: 1 }}
                            variant="circular"
                            size="large"
                            color="primary"
                            onClick={() => setShowExportDialog(curr => !curr)}
                        >
                            <FileDownloadIcon fontSize="large" />
                        </Fab>
                    </Tooltip>
                </div>
                <Dialog open={showExportDialog} onClose={onClose}>
                    <DialogTitle>
                        <CustomText text="exportSolution" />
                    </DialogTitle>
                    <DialogActions>
                        <Button style={{ textTransform: 'none' }} onClick={onClose}>{t("cancel")}</Button>
                        <Button style={{ textTransform: 'none' }} onClick={() => onDownload('csv')} autoFocus>{t("exportCSV")}</Button>
                        <Button style={{ textTransform: 'none' }} onClick={() => onDownload('json')} autoFocus>{t("exportJSON")}</Button>
                    </DialogActions>
                </Dialog>
                <PackageControl 
                    solution={solution ? solution['solution'] : []} 
                    container={solution ? solution['container'] : {}} 
                    packages={solution ? solution['packages'] : []} 
                    setSolution={setSolution} 
                    selectedPackages={selectedPackages} 
                    addHistory={addHistory}
                    changeHistoryIndex={changeHistoryIndex}
                    originalSolution={originalSolution}
                    resetHistory={resetHistory}
                />
            </div>
        </div>
    );
};

export default ViewPage;
