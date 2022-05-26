import { TextField } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import "../styles/AddPackage.css";
import { useTranslation } from "react-i18next";
import CustomText from "./CustomText";

// TODO: there's input delay - should remove onChange and create it as a normal form with onSubmit

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
    const onFieldChange = (name) =>
        (e) => onChange({ ...values, [name]: e.target.value });

    const fieldTypes = {
        type: 'text',
        height: 'number',
        width: 'number',
        depth: 'number',
        weight: 'number',
        amount: 'number',
        priority: 'number',
        profit: 'number',
    }

    return (
        <div className="add-package">
            <div className="package-fields">
                {Object.keys(fieldTypes).map(
                    (field, i) => 
                        <Field 
                            key={`add-package-field-${i}`}
                            type={fieldTypes[field]}
                            onChange={onFieldChange(field)} 
                            name={field} 
                            value={values[field]} 
                        />
                )}
            </div>
            <div className="toggle-boolean-buttons">
                <ToggleButton
                    value="check"
                    selected={values['canRotate']}
                    color="primary"
                    onChange={() => onChange({ ...values, canRotate: !values['canRotate'] })}
                    style={toggleStyle}
                >
                    <CustomText text="canRotate" />
                </ToggleButton>
                <ToggleButton
                    value="check"
                    selected={values['canStackAbove']}
                    color="primary"
                    onChange={() => onChange({ ...values, canStackAbove: !values['canStackAbove'] })}
                    style={toggleStyle}
                >
                    <CustomText text="canStackAbove" />
                </ToggleButton>
            </div>
        </div>
    )
};

export default AddPackage;