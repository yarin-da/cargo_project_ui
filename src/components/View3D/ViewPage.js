import React, { useState } from "react";
import { Tooltip, Fab, SpeedDial, SpeedDialAction } from "@mui/material";
import { getColorsByHash } from "./Color";
import { useTranslation } from "react-i18next";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import JavascriptIcon from '@mui/icons-material/Javascript';
import EditIcon from '@mui/icons-material/Edit';
import CustomAppBar from "../CustomAppBar";
import { saveAs } from "file-saver";
import View3D from "./View3D";
import Stats from "./Stats";
import ColorMap from "./ColorMap";
import PackageControl from "./PackageControl";
import '../../styles/ViewPage.css';

const jsonToBlob = (data) => {
    const str = JSON.stringify(data, null, 2);
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], { type: "application/json;charset=utf-8" });
    return blob;
};

const getSolutionBlob = (exportType, solution) => {
    return jsonToBlob(solution);
};

function downloadSolutionFile(exportType, solution){
    let blob = getSolutionBlob(exportType, solution);
    saveAs(blob, `packing_solution.${exportType}`);
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
