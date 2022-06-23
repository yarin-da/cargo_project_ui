import { Button, Tooltip } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CustomText from "../util/CustomText";
import { useTranslation } from "react-i18next";
import '../../styles/PackageControl.css'

const PackageControl = ({ 
    solution, 
    setSolution, 
    selectedPackages, 
    originalSolution,
    historyFunctions,
    scaleDim
}) => {
    
    const { t } = useTranslation();
    const { addHistoryAction, resetHistory, undoHistoryAction, redoHistoryAction } = historyFunctions;
    
    const update = (prop, value) => {
        // to make sure we can undo this action
        addHistoryAction({ packages: selectedPackages, prop, value });

        // create a copy of the current solution and apply the action on it
        const newSolution = [...solution];
        selectedPackages.forEach(selectedPackage => {
            const newPackage = {...solution[selectedPackage]};
            newPackage[prop] += scaleDim * value;
            newSolution[selectedPackage] = newPackage;  
        });

        // finally update the actual solution
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
        <div className="edit-solution-popup">
            <CustomText className="edit-solution-title" variant="h5" text="editSolution" />
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
                    <Button className="control-button" style={buttonStyle} onClick={() => undoHistoryAction()}>
                        <UndoIcon />
                    </Button>
                </Tooltip>
                <Tooltip title={t('redo')}>
                    <Button className="control-button" style={buttonStyle} onClick={() => redoHistoryAction()}>
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

export default PackageControl;