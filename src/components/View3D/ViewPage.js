import React, { useState } from "react";
import { Tooltip, Box, Typography, Fab, Modal, Button, SpeedDial, SpeedDialAction, LinearProgress } from "@mui/material";
import { getColorsByHash } from "./Color";
import { HexColorPicker } from "react-colorful" 
import { useTranslation } from "react-i18next";
import { parseJSONtoCSV } from "../CSVParser";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import JavascriptIcon from '@mui/icons-material/Javascript';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import EditIcon from '@mui/icons-material/Edit';
import CustomAppBar from "../CustomAppBar";
import CustomText from "../CustomText";
import { saveAs } from "file-saver";
import View3D from "./View3D";
import '../../styles/ViewPage.css';

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress sx={{ filter: 'brightness(85%)', height: 5 }} color="secondary" variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                    {`${Math.round(props.value,)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

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
                    <div className="color-type-name unselectable-text">{k}</div>
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
    history,
}) => {
    const { t } = useTranslation();
    const update = (prop, value) => {
        const newSolution = [...solution];
        selectedPackages.forEach(selectedPackage => {
            const newPackage = {...solution[selectedPackage]};
            newPackage[prop] += value;
            newSolution[selectedPackage] = newPackage;  
        });
        if (history.length === 0) {
            addHistory(selectedPackages.map(idx => ({index: idx, pkg: solution[idx]})));
        }
        addHistory(selectedPackages.map(idx => ({index: idx, pkg: newSolution[idx]})));
        setSolution(curr => ({...curr, solution: newSolution}));
    };

    const buttonStyle = {
        borderRadius: 10,
        border: '1px solid #446',
        background: '#ddf',
        color: '#223',
        width: 45,
        height: 45,
        margin: 5,
        fontWeight: 'bold',
        fontSize: 20,
        cursor: 'pointer',
    };

    return (
        <div style={{ 
            position: 'absolute', 
            top: 10, 
            right: 10, 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            background: 'rgba(170, 170, 200, 0.33)',
            boxShadow: '1px 2px 0 0 rgba(0, 0, 0, 0.33)',
            borderRadius: 25,
        }}>
            <CustomText variant="h5" text="editSolution" style={{marginBottom: 5}} />
            <div className="control-button-group">
                <Tooltip title={t('reset')}>
                    <Button className="control-button" style={buttonStyle} onClick={() => {
                        setSolution(originalSolution);
                        resetHistory();
                    }}>
                        <RestartAltIcon />
                    </Button> 
                </Tooltip>  
                <Tooltip title={t('undo')}>
                    <Button className="control-button" style={buttonStyle} onClick={() => changeHistoryIndex(1)}>
                        <UndoIcon />
                    </Button>
                </Tooltip>
                <Tooltip title={t('redo')}>
                    <Button className="control-button" style={buttonStyle} onClick={() => changeHistoryIndex(-1)}>
                        <RedoIcon />
                    </Button>   
                </Tooltip>
            </div>
            <div className="control-button-group">
                <Button className="control-button" style={{...buttonStyle, background: 'rgba(255,0,0,0.15)'}} onClick={() => update('x', -1)}>-</Button>
                <Button className="control-button" style={{...buttonStyle, background: 'rgba(255,0,0,0.15)'}} onClick={() => update('x', +1)}>+</Button>    
                <Button className="control-button" style={{...buttonStyle, background: 'rgba(255,0,0,0.15)'}} onClick={() => update('rotation-x', 90)}><ThreeSixtyIcon /></Button>
            </div>
            <div className="control-button-group">
                <Button className="control-button" style={{...buttonStyle, background: 'rgba(0,0,255,0.15)'}} onClick={() => update('y', -1)}>-</Button>
                <Button className="control-button" style={{...buttonStyle, background: 'rgba(0,0,255,0.15)'}} onClick={() => update('y', +1)}>+</Button>
                <Button className="control-button" style={{...buttonStyle, background: 'rgba(0,0,255,0.15)'}} onClick={() => update('rotation-y', 90)}><ThreeSixtyIcon /></Button>
            </div>
            <div className="control-button-group">
                <Button className="control-button" style={{...buttonStyle, background: 'rgba(0,255,0,0.15)'}} onClick={() => update('z', -1)}>-</Button>
                <Button className="control-button" style={{...buttonStyle, background: 'rgba(0,255,0,0.15)'}} onClick={() => update('z', +1)}>+</Button>
                <Button className="control-button" style={{...buttonStyle, background: 'rgba(0,255,0,0.15)'}} onClick={() => update('rotation-z', 90)}><ThreeSixtyIcon /></Button>
            </div>
        </div>
    );
};

const Stats = ({ stats, container }) => {
    const divStyle = {
        position: 'absolute', 
        top: 10, 
        right: 10, 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0 0 10px 20px',
        background: 'rgba(170, 170, 200, 0.33)',
        boxShadow: '1px 2px 0 0 rgba(0, 0, 0, 0.33)',
        borderRadius: 10,
    };
    return (
        <div style={divStyle}>
            <div>
                <div className="unselectable-text" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 10 }}>
                    <h4>Stats</h4>
                    <span style={{ gridColumn: 1 }}>
                        Profit
                    </span>
                    <span style={{ gridColumn: 2 }}>
                        {stats['profit']}
                    </span>
                    <span style={{ gridColumn: 1 }}>
                        Weight
                    </span>
                    <span style={{ gridColumn: 2 }}>
                        {/* {stats['weight']} / {container['maxWeight']} */}
                        <LinearProgressWithLabel value={100 * stats['weight'] / container['maxWeight']} />
                    </span>
                    <span style={{ gridColumn: 1 }}>
                        Space
                    </span>
                    <span style={{ gridColumn: 2 }}>
                        <LinearProgressWithLabel value={100 * stats['space_usage']} />
                    </span>
                    <h4>Boxes Used</h4>
                    {Object.keys(stats['box_usage']).map(t => 
                    <React.Fragment key={`box-usage-${t}`}>
                        <span style={{ gridColumn: 1 }}>
                            {t}
                        </span>
                        <span style={{ gridColumn: 2 }}>
                            {stats['box_usage'][t]['used']} / {stats['box_usage'][t]['total']}
                        </span>
                    </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

const MAX_HISTORY = 50;

const ViewPage = ({ solution, setSolution, units, setUnits, originalSolution }) => {
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [selectedPackages, setSelectedPackages] = useState([]);
    const [colorMap, setColorMap] = useState(initializeColors(solution ? (solution['packages'] ?? []) : []));
    const { t } = useTranslation();

    const onDownload = (exportType) => {
        downloadSolutionFile(exportType, solution);
    };

    const addHistory = (h) => {
        const currIndex = Math.max(historyIndex, 0);
        setHistory(curr => [h, ...curr.slice(currIndex, Math.min(curr.length, currIndex + MAX_HISTORY - 1))]);
        setHistoryIndex(0);
    };

    const changeHistoryIndex = (step) => {
        const currIndex = historyIndex;
        const newIndex = currIndex + step;
        if (0 <= newIndex && newIndex < history.length) {
            const newSolution = {...solution};
            history[newIndex].forEach(hist => newSolution['solution'][hist['index']] = hist['pkg']);
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
                <div style={{ position: 'absolute', right: 50, bottom: 50, display: 'flex', flexDirection: 'column' }}>
                    <Tooltip title={t('exportSolution')} arrow>
                        <SpeedDial 
                            ariaLabel="export" 
                            FabProps={{ sx: { padding: 5 } }}
                            icon={<FileDownloadIcon fontSize="large" />}
                        >
                            <SpeedDialAction 
                                icon={<JavascriptIcon fontSize="large" />} 
                                tooltipTitle={"json"} 
                                onClick={() => onDownload('json')} 
                                FabProps={{ sx: { width: 60, height: 60 } }}
                            />
                        </SpeedDial>
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
                        addHistory={addHistory}
                        changeHistoryIndex={changeHistoryIndex}
                        originalSolution={originalSolution}
                        resetHistory={resetHistory}
                        history={history}
                    />
                }
            </div>
        </div>
    );
};

export default ViewPage;
