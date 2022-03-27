import {Fab, TextField} from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import ToggleButton from "@mui/material/ToggleButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Tooltip, Divider} from "@mui/material";
import translate from "./translations/Translate";
import "../styles/AddPackage.css";

const textFieldStyle = {
    width: 120,
};

const toggleStyle = {
    textTransform: 'none'
};

const Field = ({ name, type, onChange, value }) =>
    <TextField
        label={translate(name)}
        type={type}
        onChange={onChange}
        value={value}
        style={textFieldStyle}
        variant="standard"
    />;

const AddPackage = ({ values, addButton, onAdd, onDelete, onChange, index }) => {
    const onFieldChange = (name) => 
        (e) => onChange({ ...values, [name]: e.target.value });
    return (
        <div className="add-package">
            <div className="add-package-title">
                Package {index + 1}
            </div>
            <div className="package-fields">
                <Field type="text"   onChange={onFieldChange("type")} name="type" value={values["type"]} />
                <Field type="number" onChange={onFieldChange("height")} name="height" value={values["height"]} />
                <Field type="number" onChange={onFieldChange("width")} name="width" value={values["width"]} />
                <Field type="number" onChange={onFieldChange("depth")} name="depth" value={values["depth"]} />
                <Field type="number" onChange={onFieldChange("weight")} name="weight" value={values["weight"]} />
                <Field type="number" onChange={onFieldChange("amount")} name="amount" value={values["amount"]} />
                <Field type="number" onChange={onFieldChange("priority")} name="priority" value={values["priority"]} />
                <Field type="number" onChange={onFieldChange("profit")} name="profit" value={values["profit"]} />
            </div>
            <div className="toggle-boolean-buttons">
                <ToggleButton
                    value="check"
                    selected={values['canRotate']}
                    onChange={() => onChange({ ...values, canRotate: !values['canRotate'] })}
                    style={toggleStyle}
                >
                    Can Rotate
                </ToggleButton>
                <ToggleButton
                    value="check"
                    selected={values['canStackAbove']}
                    onChange={() => onChange({ ...values, canStackAbove: !values['canStackAbove'] })}
                    style={toggleStyle}
                    color='standard'
                >
                    Can Stack Above
                </ToggleButton>
            </div>
            <div className="package-button">
                {
                    // should add button be displayed?
                    addButton ?
                    // then display the add button
                    <Tooltip title="Add Packages">
                        <Fab aria-label="add" onClick={onAdd}>
                            <AddIcon/>
                        </Fab>
                    </Tooltip>
                    :
                    // otherwise display the delete button
                    <Tooltip title="Delete Packages">
                        <Fab aria-label="delete" size="large" onClick={() => onDelete(values)}>
                            <DeleteIcon/>
                        </Fab>
                    </Tooltip>
                }
            </div>
            <Divider />
        </div>
    )
};

export default AddPackage;