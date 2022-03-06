import {Fab, TextField} from "@mui/material";
import AddIcon from '@material-ui/icons/Add';
import '../styles/AddPackage.css'
import ToggleButton from "@mui/material/ToggleButton";
import {useState} from "react";

const textFieldStyle = {
    width: 120
}

const AddPackage = () => {
    const [canRotate, setRotate] = useState()
    const [canStackAbove, setCanStackAbove] = useState()

    return (
        <div className="add-package-background">
            <div className="add-package-title">
                Package Details
            </div>
            <div className="package-text-filed">
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
                <br/>

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
            <Fab aria-label="add">
                <AddIcon />
            </Fab>
        </div>
    )
};

export default AddPackage;