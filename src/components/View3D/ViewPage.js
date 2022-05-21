import { useState } from "react";
import View3D from "./View3D";
import { getColorsByHash } from "./Color";
import { HexColorPicker } from "react-colorful" 
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CustomText from "../CustomText";
import { useTranslation } from "react-i18next";
import { Tooltip, Fab, Modal, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { saveAs } from "file-saver";
import { parseJSONtoCSV } from "../CSVParser";

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
            <HexColorPicker
                onChange={(newColor) => setColor(newColor)}
                onClick={() => onColorPicked(color)}
                onDoubleClick={onClose}
            />
        </Modal>
    );
}

const initializeColors = (solution) => {  
    const colorMap = {};
    if (solution['packages']) {
        solution['packages'].forEach(pkg => {
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

const ViewPage = ({ solution }) => {
    const [colorMap, setColorMap] = useState(initializeColors(solution));
    const [showExportDialog, setShowExportDialog] = useState(false);
    const { t } = useTranslation();
    const onClose = () => setShowExportDialog(false);
    const onDownload = (exportType) => {
        downloadSolutionFile(exportType, solution);
        onClose();
    };
    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <View3D solution={solution} colorMap={colorMap} />
            <ColorMap colorMap={colorMap} setColorMap={setColorMap} />
            <Tooltip title={t('exportSolution')}>
                <Fab 
                    sx={{ position: 'absolute', right: 50, bottom: 50, padding: 5 }}
                    variant="circular"
                    size="large"
                    color="secondary"
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
        </div>
    );
};

export default ViewPage;