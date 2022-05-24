import { useEffect, useState } from "react";
import View3D from "./View3D";
import { getColorsByHash } from "./Color";
import { HexColorPicker } from "react-colorful" 
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CustomText from "../CustomText";
import { useTranslation } from "react-i18next";
import { Tooltip, Fab, Modal, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { saveAs } from "file-saver";
import { parseJSONtoCSV } from "../CSVParser";
import CustomAppBar from "../CustomAppBar";

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

const PackageControl = ({ solution, setSolution, selectedPackage }) => {
    
    const update = (prop, value) => {
        try {
            const newPackage = {...solution[selectedPackage]};
            newPackage[prop] += value;
            console.log(prop, value, selectedPackage, solution[selectedPackage], newPackage);
            const newSolution = [...solution];
            newSolution[selectedPackage] = newPackage;
            setSolution(newSolution);
        }
        catch (e) {
            console.log(e);
        }

    };

    const buttonStyle = {
        borderRadius: '50%',
        border: '2px solid #ddf',
        background: '#446',
        color: '#ddf',
        width: 50,
        height: 50,
        margin: 5,
        fontWeight: 'bold',
        fontSize: 20,
        cursor: 'pointer',
        '&:hover': {
            background: '#669'
        }
    };
    
    return (
        selectedPackage === -1 ? <></> :
        <div style={{ 
            position: 'absolute', 
            top: 20, 
            right: 20, 
            background: 'rgba(64, 64, 96, 0.35)', 
            padding: 5,
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div>
                <button style={buttonStyle} onClick={() => update('rotation-x', 90)}>x</button>
                <button style={buttonStyle} onClick={() => update('x', -1)}>-x</button>
                <button style={buttonStyle} onClick={() => update('x', +1)}>+x</button>    
            </div>
            <div>
                <button style={buttonStyle} onClick={() => update('rotation-y', 90)}>y</button>
                <button style={buttonStyle} onClick={() => update('y', -1)}>-y</button>
                <button style={buttonStyle} onClick={() => update('y', +1)}>+y</button>
            </div>
            <div>
                <button style={buttonStyle} onClick={() => update('rotation-z', 90)}>z</button>
                <button style={buttonStyle} onClick={() => update('z', -1)}>-z</button>
                <button style={buttonStyle} onClick={() => update('z', +1)}>+z</button>
            </div>
        </div>
    );
};

const ViewPage = ({ solution:inputSolution, units, setUnits }) => {
    const [solution, setSolution] = useState(inputSolution && inputSolution['solution'] ? inputSolution['solution'] : []);
    const [container, setContainer] = useState(inputSolution && inputSolution['container'] ? inputSolution['container'] : {});
    const [packages, setPackages] = useState(inputSolution && inputSolution['packages'] ? inputSolution['packages'] : []);
    const [selectedPackage, setSelectedPackage] = useState(-1);
    const [colorMap, setColorMap] = useState(initializeColors(packages));
    const [showExportDialog, setShowExportDialog] = useState(false);
    const { t } = useTranslation();
    const onClose = () => setShowExportDialog(false);
    const onDownload = (exportType) => {
        downloadSolutionFile(exportType, solution);
        onClose();
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <CustomAppBar units={units} setUnits={setUnits} />
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <View3D 
                    solution={solution} 
                    setSolution={setSolution} 
                    packages={packages}
                    container={container}
                    colorMap={colorMap} 
                    selectedPackage={selectedPackage} 
                    setSelectedPackage={setSelectedPackage} 
                />
                <ColorMap colorMap={colorMap} setColorMap={setColorMap} />
                <Tooltip title={t('exportSolution')}>
                    <Fab 
                        sx={{ position: 'absolute', right: 50, bottom: 50, padding: 5 }}
                        variant="circular"
                        size="large"
                        color="primary"
                        onClick={() => setShowExportDialog(curr => !curr)}
                    >
                        <FileDownloadIcon fontSize="large" />
                    </Fab>
                </Tooltip>
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
                <PackageControl solution={solution} setSolution={setSolution} selectedPackage={selectedPackage} />
            </div>
        </div>
        
    );
};

export default ViewPage;
