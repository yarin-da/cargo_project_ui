import { useState } from "react";
import { FormControl,InputLabel, Input, Button, Grid } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import CustomText from "../util/CustomText";
import Package from "../Package";
import { parseValue, typeTesters } from "../parsers/Type";
import CrossIcon from '@mui/icons-material/ClearRounded';
import "../../styles/AddPackage.css";
import { useTranslation } from "react-i18next";
import '../../styles/Util.css'

const CustomBooleanInput = ({ value, setValue, inputId }) => {
    const onClick = () => setValue(curr => !curr);
    return (
        <FormControl style={{width:'100%'}}>
            <ToggleButton value={"none"} selected={value} htmlFor={inputId} onClick={onClick}>
                <CustomText text={inputId}  className="no-text-transform"/>
            </ToggleButton>
            <Input id={inputId} type="hidden" value={value} />
        </FormControl>
    );
};

const CustomInput = ({ initialValue, inputId, inputType }) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => setValue(e.target.value);
    return (
        <FormControl>
            <InputLabel htmlFor={inputId}>
                {<CustomText text={inputId} />}
            </InputLabel>
            <Input id={inputId} type={inputType} value={value ?? ''} onChange={onChange} />
        </FormControl>
    );
};

const CustomNumberInput = ({ initialValue, inputId }) => 
    <CustomInput initialValue={initialValue} inputId={inputId} inputType={'number'} />;

const AddPackageForm = ({ values:inputValues, onSubmit, onClose }) => {
    const { t } = useTranslation();
    const values = Object.keys(inputValues).length === 0 ? new Package() : inputValues;
    const [error, setError] = useState(null);
    const [canRotate, setCanRotate] = useState(values['canRotate']);
    const [canStackAbove, setCanStackAbove] = useState(values['canStackAbove']);

    return (
        <form 
            onSubmit={(e) => { 
                e.preventDefault();
                const formValues = new Package();
                for (let i = 0; i < 8; i++) {
                    const curr = e.target[i];
                    const varType = curr['id'];
                    const value = parseValue(curr['id'], curr['value']);
                    if (value == null || (!typeTesters['string'](value) && isNaN(value))) {
                        setError(t('emptyFormValue', { varType: t(varType) }));
                        return;
                    }

                    formValues[curr['id']] = value;
                }
                
                formValues['canRotate'] = canRotate;
                formValues['canStackAbove'] = canStackAbove;

                if (!formValues['type'] || formValues['type'].length === 0) {
                    setError('invalidType');
                    return;
                }
                
                onSubmit(formValues); 
            }}
        >
            <Grid container spacing={1} columns={12} direction="row" justifyContent="center">
                <Grid item xs={6}>
                    <CustomInput initialValue={values['type'] ?? ''} inputId={'type'} inputType={'text'} />
                </Grid>
                <Grid item xs={6}>
                    <CustomNumberInput initialValue={values['width']} inputId={'width'} />
                </Grid>
                <Grid item xs={6}>
                    <CustomNumberInput initialValue={values['height']} inputId={'height'} />
                </Grid>
                <Grid item xs={6}>
                    <CustomNumberInput initialValue={values['depth']} inputId={'depth'} />
                </Grid>
                <Grid item xs={6}>
                    <CustomNumberInput initialValue={values['weight']} inputId={'weight'} />
                </Grid>
                <Grid item xs={6}>
                    <CustomNumberInput initialValue={values['amount']} inputId={'amount'} />
                </Grid>
                <Grid item xs={6}>
                    <CustomNumberInput initialValue={values['profit']} inputId={'profit'} />
                </Grid>
                <Grid item xs={6}>
                    <CustomNumberInput initialValue={values['priority']} inputId={'priority'} />
                </Grid>
                <Grid item xs={6}>
                    <CustomBooleanInput value={canStackAbove} setValue={setCanStackAbove} inputId={'canStackAbove'} />
                </Grid>
                <Grid item xs={6} flex={1}>
                    <CustomBooleanInput value={canRotate} setValue={setCanRotate} inputId={'canRotate'} />
                </Grid>
                <Grid item xs={2} justifySelf="center">
                    <Button type="submit" variant="contained" sx={{ width: 85, height: 50, marginTop: 3 }}>
                        <CustomText text="save" className="no-text-transform" />
                    </Button>
                </Grid>
            </Grid>
            <div className="cross-button" >
                <Button 
                    sx={{ position: 'absolute', top: 15, right: 5 }}
                    onClick={() => onClose()}
                >
                    <CrossIcon htmlColor="black" fontSize="medium" />
                </Button>
            </div>
            {
                error &&
                <div className="error-div" >
                    <CustomText text={error} style={{ color: 'red' }} />
                </div>
            }
        </form>
    )
};

export default AddPackageForm;