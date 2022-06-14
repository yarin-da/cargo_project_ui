import {useNavigate} from "react-router-dom";
import React, {useRef, useState} from "react";
import CustomText from "./CustomText";
import CustomAppBar from "./CustomAppBar";
import {Button} from "@mui/material";
import {Typography} from "@material-ui/core";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@mui/material";
import {useTranslation} from "react-i18next";
import "../styles/Header.css";
import {t} from "i18next";
import {parseValue, stringTypeTesters, types, typeTesters} from "./Type";


function containerFields(containerObject) {
    const containerKeys = ['width', 'height', 'depth', 'maxWeight']
    const inputKeys = Object.keys(containerObject)

    if (inputKeys.length !== 4) {
        return {error: t('invalidContainer')};
    }

    for (const k of inputKeys) {
        if (!containerKeys.includes(k)) {
            console.log(k)
            return {error: t('invalidContainer')};
        }
    }

    for (const [key, value] of Object.entries(containerObject)) {
        const type = types[key];
        const tester = stringTypeTesters[type];
        if (!tester(value)) {
            return {error: t('inputError', {object: t('container'), key: t(key), type: t(type), value})}
        }
    }
    return '';
}

function packagesFields(packagesObjects) {
    if (!Array.isArray(packagesObjects)) {
        return {error: t('packagesFormat')};
    }

    const packagesKeys = ['type', 'width', 'height', 'depth']
    for (let i = 0; i < packagesObjects.length; i++) {
        if (Object.keys(packagesObjects[i]).length !== 4) {
            return {error: t('packagesFormat')};
        }

        for (const [key, value] of Object.entries(packagesObjects[i])) {
            if (key === 'id') {
                continue;
            }
            if (!packagesKeys.includes(key)) {
                return {error: t('packagesFormat')};
            }
            const type = types[key];
            const tester = stringTypeTesters[type];
            if (!tester(value)) {
                return {error: t('inputError', {object: t('package'), key: t(key), type: t(type), value})}
            }
        }
    }
    return '';
}

function checkSolutionObject(solutionObj) {
    const solKeys = ['type', 'x', 'y', 'z', 'rotation-x', 'rotation-y', 'rotation-z']

    for (const [key, value] of Object.entries(solutionObj)) {
        for (const [k, v] of Object.entries(value)) {
            if (Object.keys(value).length !== 7) {
                return {error: t('invalidSolution')};
            }
            if (!solKeys.includes(k)) {
                return {error: t('invalidSolution')};
            }
            const type = types[k];
            const tester = typeTesters[type];
            if (!tester(v)) {
                return {error: t('inputError', {object: t('solution'), key: t(k), type: t(type), v})}
            }
        }
    }
    return '';
}

function checkStatsObject(statsObj) {
    const statsKeys = ['profit', 'weight', 'box_usage', 'space_usage']

    if (Object.keys(statsObj).length !== 4) {
        return {error: t('invalidStats')};
    }

    for (const [key, value] of Object.entries(statsObj)) {
        if (!statsKeys.includes(key)) {
            return {error: t('invalidStats')};
        }

        if (key === 'box_usage') {
            for (const [k, v] of Object.entries(value)) {
                if (!Number.isInteger(v['used'])) {
                    const val = v['used']
                    return {
                        error: t('inputError', {
                            object: t('stats'),
                            key: 'box_usage',
                            type: t("nonNegativeInteger"),
                            value: val
                        })
                    }
                }
                if (!Number.isInteger(v['total'])) {
                    const val = v['total']
                    return {
                        error: t('inputError', {
                            object: t('stats'),
                            key: 'box_usage',
                            type: t("nonNegativeInteger"),
                            value: val
                        })
                    }
                }
            }
            continue;
        }

        const type = types[key];
        const tester = typeTesters[type];
        if (!tester(value)) {
            return {error: t('inputError', {object: t('stats'), key: t(key), type: t(type), value})}
        }
    }
    return '';

}

const checkSolution = (input) => {
    const keys = ['container', 'packages', 'solution', 'stats']

    if (Object.keys(input).length !== 4) {
        return {error: t('missingData')};
    }

    for (const k of Object.keys(input)) {
        if (!keys.includes(k)) {
            return {error: t('invalidObjectKey')};
        }
    }

    const containerObj = input['container']
    const packagesObj = input['packages']
    const solutionObj = input['solution']
    const statsObj = input['stats']

    const containerRet = containerFields(containerObj)
    const packagesRet = packagesFields(packagesObj)
    const solutionRet = checkSolutionObject(solutionObj)
    const statsRet = checkStatsObject(statsObj)

    if (containerRet.error) return {...containerRet};
    if (packagesRet.error) return {...packagesRet};
    if (solutionRet.error) return {...solutionRet}
    if (statsRet.error) return {...statsRet}

    return ''
};

const Header = ({units, setUnits, setSolution, setOriginalSolution}) => {
    const {t} = useTranslation();
    const [alertType, setAlertType] = useState('info');
    const [alertText, setAlertText] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const fileInputRef = useRef();

    const uploadFile = (event) => {
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            const solution = JSON.parse(reader.result);
            const error = checkSolution(solution);
            if (error) {
                setAlertType('error');
                setAlertText(error.error);
                setShowAlert(true);
            } else {
                setOriginalSolution(solution);
                setSolution(solution);
                navigate('/view');
            }
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column-reverse', width: '100vw', height: '100vh'}}>
            <div className="head">
                <div className="header">
                    <div className="header-title">
                        <Typography
                            className="header-title-text"
                            variant="h2"
                        >
                            LET YOUR SUCCESS
                        </Typography>
                        <Typography
                            className="header-title-text"
                            variant="h2"
                        >
                            RIDE WITH US.
                        </Typography>
                    </div>
                    <div style={{alignSelf: 'center', display: 'flex', flexDirection: 'column'}}>
                        <Button
                            sx={{
                                textTransform: 'none',
                                color: "primary",
                                border: '2px solid',
                                borderColor: "primary",
                                borderRadius: 5,
                                padding: 3,
                                background: 'rgba(30, 30, 45, 0.5)',
                                cursor: 'pointer',
                                margin: 1,
                            }}
                            onClick={() => navigate('/config')}
                        >
                            <CustomText text="findPacking" variant="h3"/>
                        </Button>
                        <Button
                            sx={{
                                textTransform: 'none',
                                color: "primary",
                                border: '2px solid',
                                borderColor: "primary",
                                borderRadius: 5,
                                padding: 3,
                                background: 'rgba(30, 30, 45, 0.5)',
                                cursor: 'pointer',
                                margin: 1,
                            }}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <CustomText text="viewSolution" variant="h3"/>
                            <input
                                hidden
                                type="file"
                                ref={fileInputRef}
                                onChange={uploadFile}
                                accept=".json"
                            />
                        </Button>
                    </div>
                </div>
            </div>
            <Snackbar
                open={showAlert}
                autoHideDuration={10000}
                onClose={() => setShowAlert(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert onClose={() => setShowAlert(false)} severity={alertType} sx={{width: '100%'}}>
                    {t(alertText)}
                </Alert>
            </Snackbar>
            <CustomAppBar units={units} setUnits={setUnits}/>
        </div>
    )
};

export default Header;