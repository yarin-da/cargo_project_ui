import '../styles/AddCargo.css'
import {TextField} from "@mui/material";

const textFieldStyle = {
    width: 120
}

const AddCargo = () => {
    return (
        <div className="add-cargo-background">
            <div className="add-cargo-title">
                Cargo Details
            </div>
            <div className="cargo-text-filed">
                <TextField
                    className="cargo-height"
                    id="cargo-height"
                    label="Height"
                    type="number"
                    style={textFieldStyle}
                    variant="standard"/>
                <TextField
                    className="cargo-width"
                    id="cargo-width"
                    label="Width"
                    type="number"
                    style={textFieldStyle}
                    variant="standard" />
                <TextField
                    className="cargo-depth"
                    id="cargo-depth"
                    label="Depth"
                    type="number"
                    style={textFieldStyle}
                    variant="standard" />
                <TextField
                    className="cargo-weight"
                    id="cargo-weight"
                    label="Max weight"
                    type="number"
                    style={textFieldStyle}
                    variant="standard" />
                <TextField
                    className="cargo-cost"
                    id="cargo-cost"
                    label="Cost"
                    type="number"
                    style={textFieldStyle}
                    variant="standard" />
            </div>
        </div>
    )
};

export default AddCargo;