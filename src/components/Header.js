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
import Package from "./Package";


function containerFields(containerObject) {
    const container = {};
    for (const [key, value] of Object.entries(containerObject)) {
        const type = types[key];
        const tester = stringTypeTesters[type];
        if (tester(value)) {
            container[key] = parseValue(key, value);
        } else {
            return {error: t('inputError', {object: t('container'), key: t(key), type: t(type), value})}
        }
    }
    return {container};
}

function packagesFields(packagesObjects) {
    const packages = [];
    for (let i = 0; i < packagesObjects.length; i++) {
        const p = new Package();
        for (const [key, value] of Object.entries(packagesObjects[i])) {
            if (key === 'id') {
                continue;
            }
            const type = types[key];
            const tester = stringTypeTesters[type];
            if (tester(value)) {
                p[key] = parseValue(key, value);
            } else {
                return {error: t('inputError', {object: t('package'), key: t(key), type: t(type), value})}
            }
        }
        packages.push(p);
    }
    return {packages};
}

function checkSolutionObject(solutionObj) {
    let solution = {};
    for (const [key, value] of Object.entries(solutionObj)) {
        const obj = {}
        for (const [k, v] of Object.entries(value)) {
            const type = types[k];
            const tester = typeTesters[type];
            if (tester(v)) {
                obj[k] = parseValue(k, v);
            } else {
                return {error: t('inputError', {object: t('solution'), key: t(k), type: t(type), v})}
            }
        }
        solution = {...obj}
    }
    return {solution};
}

function checkStatsObject(statsObj) {
    let stats = {};
    for (const [key, value] of Object.entries(statsObj)) {
        if (key === 'box_usage') {
            for (const [k, v] of Object.entries(value)) {
                if (!Number.isInteger(v['used'])) {
                    const val = v['used']
                    return {
                        error: t('inputError', {
                            object: t('stats'),
                            key: 'box_usage',
                            type: t("nonNegativeInteger"),
                            val
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
                            val
                        })
                    }
                }
            }
            stats = {...statsObj['box_usage']}
            continue;
        }

        const type = types[key];
        const tester = typeTesters[type];
        if (tester(value)) {
            stats[key] = parseValue(key, value);
        } else {
            return {error: t('inputError', {object: t('stats'), key: t(key), type: t(type), value})}
        }
    }
    return {stats};

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
    console.log('hi1')
    if (packagesRet.error) return {...packagesRet};
    console.log('hi2')
    if (solutionRet.error) return {...solutionRet}
    console.log('hi3')
    if (statsRet.error) return {...statsRet}
    console.log('hi4')


    const {container} = containerRet
    const {packages} = packagesRet
    const {solution} = solutionRet
    const {stats} = statsRet

    console.log({container, packages, solution, stats})
    return {container, packages, solution, stats}


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
                setAlertText(error);
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