import { useState } from "react";
import { Modal } from "@mui/material";
import { HexColorPicker } from "react-colorful";

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

export default ColorMap;