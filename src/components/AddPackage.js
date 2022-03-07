import {Fab, IconButton, TextField} from "@mui/material";
import AddIcon from '@material-ui/icons/Add';
import '../styles/AddPackage.css'
import ToggleButton from "@mui/material/ToggleButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";

const textFieldStyle = {
    width: 120
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
                    <Fab aria-label="delete" size="large" onClick={onDelete}>
                        <DeleteIcon />
                    </Fab>
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
                        style={textFieldStyle}
                        variant="standard" />
                    <TextField
                        id="package-depth"
                        label="Depth"
                        style={textFieldStyle}
                        variant="standard" />
                    <TextField
                        id="package-weight"
                        label="Weight"
                        style={textFieldStyle}
                        variant="standard" />
                    <TextField
                        id="package-amount"
                        label="Amount"
                        style={textFieldStyle}
                        variant="standard" />
                </div>

                <br/>
                <div className="row2">
                    <TextField
                        id="package-priority"
                        label="Priority"
                        style={textFieldStyle}
                        variant="standard" />
                    <TextField
                        id="package-profit"
                        label="Profit"
                        style={textFieldStyle}
                        variant="standard" />
                    <TextField
                        id="package-type"
                        label="Type"
                        style={textFieldStyle}
                        variant="standard" />
                </div>
            </div>
            <div className="toggles-package">
                <ToggleButton
                    value="check"
                    selected={canRotate}
                    onChange={() => {
                        setRotate(!canRotate);
                    }}
                >
                    Can Rotate
                </ToggleButton>
                <ToggleButton
                    value="check"
                    selected={canStackAbove}
                    onChange={() => {
                        setCanStackAbove(!canStackAbove);
                    }}
                >
                    Can Stack Above
                </ToggleButton>
            </div>
            {addButton ?
                <Fab aria-label="add" onClick={onAdd}>
                    <AddIcon />
                </Fab>
                :
                false
            }

        </div>
    )
};

export default AddPackage;