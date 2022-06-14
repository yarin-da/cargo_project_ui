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

const validateSolution = (solution) => {
    const rotate = (scale, rotation) => {
        const newScale = [...scale];
        rotation.forEach((r, i) => {
            const [a, b] = [0, 1, 2].filter(a => a !== i);
            let angle = 0;
            const rot = r % 180;
            while (angle < rot) {
                angle += 90;
                const temp = newScale[a];
                newScale[a] = newScale[b];
                newScale[b] = temp;
            }
        });
        return newScale;
    }

    const { width, depth, height } = solution['container'];
    const space = (() => {
        const arr = new Array(width);
        for (let w in arr) {
            arr[w] = new Array(depth);
            for (let d in arr[w]) {
                arr[w][d] = new Array(height);
                for (let h in arr[w][d]) {
                    arr[w][d][h] = false;
                };
            };
        };
        // TODO: not working
        console.log(arr);
        return arr;
    })();

    const packageSize = {};
    return solution['solution'].some(pkg => {
        const pkgType = pkg['type'];
        if (!(pkgType in packageSize)) {
            const {width:w, depth:d, height:h} = solution['packages'].find(x => x['type'] === pkgType);
            packageSize[pkgType] = [w, d, h];
        }
        const { 'rotation-x':rx, 'rotation-y':ry, 'rotation-z':rz } = pkg;
        const rotation = [rx, ry, rz];
        const [w, d, h] = rotate(packageSize[pkgType], rotation);
        const { x, y, z } = pkg;

        if (x < 0 || y < 0 || z < 0 || x+w >= width || y+d >= depth || z+h >= height) return true;
        for (let i = x; i < x + w; i++) {
            for (let j = y; j < y + d; j++) {
                for (let k = z; k < z + h; k++) {
                    if (space[i][j][k]) return true;
                    space[i][j][k] = true;
                }
            }
        }
    });
};

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

const ViewPage = ({ 
    historyIndex, setHistoryIndex,
    historyActions, setHistoryActions,
    solution, setSolution, 
    units, setUnits, 
    originalSolution,
}) => {
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
        if (validateSolution(solution)) {
            downloadSolutionFile(exportType, solution);
        } else {
            console.log('illegal solution!');
        }
    };

    const selectRandomPackage = () => {
        if (!solution) return;
        const randIndex = Math.floor(Math.random() * (solution['solution'].length));
        setSelectedPackages([randIndex]);
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
                        originalSolution={originalSolution}
                        historyFunctions={{ addHistoryAction, resetHistory, undoHistoryAction, redoHistoryAction }}
                    />
                }
            </div>
        </div>
    );
};

export default ViewPage;
