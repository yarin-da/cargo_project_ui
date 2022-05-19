import {TextField, Typography} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import "../styles/AddPackage.css";
import { useTranslation } from "react-i18next";

const toggleStyle = {
    textTransform: 'none'
};

const Field = ({ name, type, onChange, value }) => {
    const { t } = useTranslation();
    return <TextField
        label={t(name)}
        type={type}
        onChange={onChange}
        value={value}
        style={{ width: 120 }}
        variant="standard"
    />;
}

const AddPackage = ({ values, onChange }) => {
    const { t } = useTranslation();
    const onFieldChange = (name) =>
        (e) => onChange({ ...values, [name]: e.target.value });
    return (
        <div className="add-package">
            <Typography className="package-title" noWrap component="div" variant="h6">
                {t("package_details")}
            </Typography>
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
                    {t("can_rotate")}
                </ToggleButton>
                <ToggleButton
                    value="check"
                    selected={values['canStackAbove']}
                    color="primary"
                    onChange={() => onChange({ ...values, canStackAbove: !values['canStackAbove'] })}
                    style={toggleStyle}
                >
                    {t("can_stack_above")}
                </ToggleButton>
            </div>
        </div>
    )
};

export default AddPackage;