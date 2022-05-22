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

const ViewPage = ({ /* TODO: solution,*/ units, setUnits }) => {
    const [colorMap, setColorMap] = useState(initializeColors(solution));
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
                <View3D solution={solution} colorMap={colorMap} />
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
            </div>
        </div>
        
    );
};

export default ViewPage;


// TODO: remove
const solution = {
    "packages": [
      {
        "type": "Jewelry",
        "width": 2,
        "height": 3,
        "depth": 2
      },
      {
        "type": "Glass",
        "width": 3,
        "height": 4,
        "depth": 2
      },
      {
        "type": "Clothes",
        "width": 5,
        "height": 1,
        "depth": 3
      },
      {
        "type": "Electronic",
        "width": 5,
        "height": 2,
        "depth": 3
      },
      {
        "type": "Food",
        "width": 6,
        "height": 2,
        "depth": 3
      },
      {
        "type": "Shoes",
        "width": 7,
        "height": 2,
        "depth": 3
      }
    ],
    "container": {
      "width": 10,
      "height": 10,
      "depth": 40
    },
    "solution": [
      {
        "type": "Shoes",
        "x": 0,
        "y": 0,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 0,
        "z": 2,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 0,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 0,
        "z": 6,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 0,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 3,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 3,
        "z": 2,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 3,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 3,
        "z": 6,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 3,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 6,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 6,
        "z": 2,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 6,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 6,
        "z": 6,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 6,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 9,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 9,
        "z": 2,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 9,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 9,
        "z": 6,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Shoes",
        "x": 0,
        "y": 9,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Food",
        "x": 0,
        "y": 12,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Food",
        "x": 0,
        "y": 12,
        "z": 2,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Food",
        "x": 0,
        "y": 12,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Food",
        "x": 0,
        "y": 12,
        "z": 6,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Food",
        "x": 0,
        "y": 12,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Food",
        "x": 0,
        "y": 15,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Food",
        "x": 0,
        "y": 15,
        "z": 2,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Food",
        "x": 0,
        "y": 15,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Food",
        "x": 0,
        "y": 15,
        "z": 6,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Food",
        "x": 0,
        "y": 15,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Food",
        "x": 0,
        "y": 18,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Food",
        "x": 0,
        "y": 18,
        "z": 2,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Food",
        "x": 0,
        "y": 18,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Food",
        "x": 0,
        "y": 18,
        "z": 6,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Food",
        "x": 0,
        "y": 18,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 0,
        "y": 21,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 0,
        "y": 21,
        "z": 2,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 0,
        "y": 21,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 0,
        "y": 21,
        "z": 6,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 0,
        "y": 21,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 5,
        "y": 21,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 5,
        "y": 21,
        "z": 2,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 5,
        "y": 21,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 5,
        "y": 21,
        "z": 6,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 5,
        "y": 21,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 0,
        "y": 24,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 0,
        "y": 24,
        "z": 2,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 0,
        "y": 24,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 0,
        "y": 24,
        "z": 6,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 0,
        "y": 24,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 5,
        "y": 24,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 5,
        "y": 24,
        "z": 2,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 5,
        "y": 24,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 5,
        "y": 24,
        "z": 6,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 5,
        "y": 24,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 0,
        "y": 27,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 0,
        "y": 27,
        "z": 2,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 0,
        "y": 27,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 0,
        "y": 27,
        "z": 6,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Electronic",
        "x": 0,
        "y": 27,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Glass",
        "x": 5,
        "y": 27,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Glass",
        "x": 5,
        "y": 27,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Clothes",
        "x": 5,
        "y": 27,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Clothes",
        "x": 5,
        "y": 27,
        "z": 9,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Glass",
        "x": 0,
        "y": 30,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Glass",
        "x": 0,
        "y": 30,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Clothes",
        "x": 0,
        "y": 30,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Clothes",
        "x": 0,
        "y": 30,
        "z": 9,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Glass",
        "x": 5,
        "y": 30,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Glass",
        "x": 5,
        "y": 30,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Clothes",
        "x": 5,
        "y": 30,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Clothes",
        "x": 5,
        "y": 30,
        "z": 9,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Glass",
        "x": 0,
        "y": 33,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Glass",
        "x": 0,
        "y": 33,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Clothes",
        "x": 0,
        "y": 33,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Clothes",
        "x": 0,
        "y": 33,
        "z": 9,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Glass",
        "x": 5,
        "y": 33,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Glass",
        "x": 5,
        "y": 33,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Clothes",
        "x": 5,
        "y": 33,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Clothes",
        "x": 5,
        "y": 33,
        "z": 9,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Glass",
        "x": 0,
        "y": 36,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Glass",
        "x": 0,
        "y": 36,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Clothes",
        "x": 0,
        "y": 36,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Clothes",
        "x": 0,
        "y": 36,
        "z": 9,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Glass",
        "x": 5,
        "y": 36,
        "z": 0,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Glass",
        "x": 5,
        "y": 36,
        "z": 4,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Clothes",
        "x": 5,
        "y": 36,
        "z": 8,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      },
      {
        "type": "Clothes",
        "x": 5,
        "y": 36,
        "z": 9,
        "rotation-x": 0,
        "rotation-y": 0,
        "rotation-z": 0
      }
    ]
  };