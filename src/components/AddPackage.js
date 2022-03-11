import {Fab, IconButton, TextField} from "@mui/material";
import AddIcon from '@material-ui/icons/Add';
import '../styles/AddPackage.css'
import ToggleButton from "@mui/material/ToggleButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {Tooltip} from "@mui/material";
import {useState} from "react";

const textFieldStyle = {
    width: 120
}

const toggleStyle = {
    textTransform: 'none'
}

const AddPackage = ({addButton, onAdd, onDelete}) => {
    const [canRotate, setRotate] = useState(false)
    const [canStackAbove, setCanStackAbove] = useState(false)

    return (
        <div className="add-package-background">
            <div className="add-package-title">
                Package Details
            </div>
            <div className="cancel-button">
                {addButton ?
                    false
                    :
                    <Tooltip title="Delete Packages">
                        <Fab aria-label="delete" size="large" onClick={onDelete}>
                            <DeleteIcon/>
                        </Fab>
                    </Tooltip>
                }

            </div>
            <div className="package-text-filed">
                <div className="row1">
                    <TextField
                        id="package-height"
                        label="Height"
                        type="number"
                        style={textFieldStyle}
                        variant="standard"/>
                    <TextField
                        id="package-width"
                        label="Width"
                        type="number"
                        style={textFieldStyle}
                        variant="standard"/>
                    <TextField
                        id="package-depth"
                        label="Depth"
                        type="number"
                        style={textFieldStyle}
                        variant="standard"/>
                    <TextField
                        id="package-weight"
                        label="Weight"
                        type="number"
                        style={textFieldStyle}
                        variant="standard"/>
                    <TextField
                        id="package-amount"
                        label="Amount"
                        type="number"
                        style={textFieldStyle}
                        variant="standard"/>
                </div>

                <br/>
                <div className="row2">
                    <TextField
                        id="package-priority"
                        label="Priority"
                        type="number"
                        style={textFieldStyle}
                        variant="standard"/>
                    <TextField
                        id="package-profit"
                        label="Profit"
                        type="number"
                        style={textFieldStyle}
                        variant="standard"/>
                    <TextField
                        id="package-type"
                        label="Type"
                        type="text"
                        style={textFieldStyle}
                        variant="standard"/>
                </div>
            </div>
            <div className="toggles-package">
                <ToggleButton
                    value="check"
                    selected={canRotate}
                    onChange={() => {
                        setRotate(!canRotate);
                    }}
                    style={toggleStyle}
                >
                    Can Rotate
                </ToggleButton>
                <ToggleButton
                    value="check"
                    selected={canStackAbove}
                    onChange={() => {
                        setCanStackAbove(!canStackAbove);
                    }}
                    style={toggleStyle}
                >
                    Can Stack Above
                </ToggleButton>
            </div>
            {addButton ?
                <Tooltip title="Add Packages">
                    <Fab aria-label="add" onClick={onAdd}>
                        <AddIcon/>
                    </Fab>
                </Tooltip>
                :
                false
            }

        </div>
    )
};

export default AddPackage;