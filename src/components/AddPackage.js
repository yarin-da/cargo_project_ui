import {TextField} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
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

const AddPackage = ({ values, onChange }) => {
    const onFieldChange = (name) => 
        (e) => onChange({ ...values, [name]: e.target.value });
    return (
        <div className="add-package">
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
                    color="primary"
                    onChange={() => onChange({ ...values, canRotate: !values['canRotate'] })}
                    style={toggleStyle}
                >
                    Can Rotate
                </ToggleButton>
                <ToggleButton
                    value="check"
                    selected={values['canStackAbove']}
                    color="primary"
                    onChange={() => onChange({ ...values, canStackAbove: !values['canStackAbove'] })}
                    style={toggleStyle}
                >
                    Can Stack Above
                </ToggleButton>
            </div>
        </div>
    )
};

export default AddPackage;