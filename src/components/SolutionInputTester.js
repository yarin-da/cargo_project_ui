import {t} from "i18next";
import {stringTypeTesters, types, typeTesters} from "./Type";

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

export const checkSolution = (input) => {
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