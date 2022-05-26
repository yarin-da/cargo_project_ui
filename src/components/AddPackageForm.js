import { useState } from "react";
import { FormControl,InputLabel, Input, Button, Grid } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import "../styles/AddPackage.css";
import CrossIcon from '@mui/icons-material/ClearRounded';
import CustomText from "./CustomText";
import Package from "./Package";

const CustomBooleanInput = ({ initialValue, inputId }) => {
    const [value, setValue] = useState(initialValue);
    const onClick = () => setValue(curr => !curr);
    return (
        <FormControl style={{width:'100%'}}>
            <ToggleButton id={inputId} onClick={onClick} selected={value}>
                <CustomText text={inputId} />
            </ToggleButton>
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
            <Input id={inputId} type={inputType} value={value} onChange={onChange} />
        </FormControl>
    );
};

const CustomNumberInput = ({ initialValue, inputId }) => 
    <CustomInput initialValue={initialValue} inputId={inputId} inputType={'number'} />;

const AddPackageForm = ({ values, onSubmit, onClose }) => {
    const [error, setError] = useState(null);
    return (
        <form 
            onSubmit={(e) => { 
                e.preventDefault();
                const formValues = new Package();
                for (let i = 0; i < 10; i++) {
                    const curr = e.target[i];
                    formValues[curr['id']] = curr['value'];
                }
                
                if (!formValues['type'] || formValues['type'].length === 0) {
                    setError('invalidType');
                    return;
                }
                
                onSubmit(formValues); 
            }}
        >
            <Grid container spacing={1} columns={12} direction="row" justifyContent="center">
                <Grid item xs={6}>
                    <CustomInput initialValue={values['type']} inputId={'type'} inputType={'text'} />
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
                <Grid item xs={6} flex={1}>
                    <CustomBooleanInput initialValue={values['canRotate']} inputId={'canRotate'} />
                </Grid>
                <Grid item xs={6}>
                    <CustomBooleanInput initialValue={values['canStackAbove']} inputId={'canStackAbove'} />
                </Grid>
                <Grid item xs={2} justifySelf="center">
                    <Button type="submit" variant="contained" sx={{ width: 85, height: 50, marginTop: 3 }}>
                        <CustomText text="save" style={{textTransform: 'none'}} />
                    </Button>
                </Grid>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}>
                <Button 
                    sx={{ position: 'absolute', top: 15, right: 5 }}
                    onClick={() => onClose()}
                >
                    <CrossIcon htmlColor="black" fontSize="medium" />
                </Button>
            </div>
            {
                error &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                    <CustomText text={error} style={{ color: 'red' }} />
                </div>
            }
        </form>
    )
};

export default AddPackageForm;