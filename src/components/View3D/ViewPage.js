import { useState } from "react";
import View3D from "./View3D";
import { getColorsByHash } from "./Color";
import { HexColorPicker } from "react-colorful" 
import { Modal } from "@material-ui/core";

const ColorPicker = ({ open, colorMap, pkg, onColorPicked, onClose }) => {
    return (
        <Modal 
            style={{ position: 'absolute', top: 50, left: 50 }}
            open={open} 
            onClose={onClose}
        >
            <HexColorPicker
                color={colorMap[pkg]}
                onChange={(newColor) => onColorPicked(newColor, pkg)}
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

    const onColorPicked = (newColor, pkg) => {
        setColorMap(curr => ({ ...curr, [pkg]: newColor }));
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
                onClose={() => setOpenColorPicker(curr => !curr)}
                colorMap={colorMap}
                pkg={clickedPkg}
                onColorPicked={onColorPicked}
            />
        </div>
    );
};

const ViewPage = ({ solution }) => {
    const [colorMap, setColorMap] = useState(initializeColors(solution));
    return (
        <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', border: '5px solid black' }}>
                <View3D solution={solution} colorMap={colorMap} />
                <ColorMap colorMap={colorMap} setColorMap={setColorMap} />
            </div>
        </div>
    );
};

export default ViewPage;