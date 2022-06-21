import {parseValue, types, stringTypeTesters} from "./Type";
import Package from "./Package";
import {t} from "i18next";

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

function parseJSONFile(file) {
    file = file.trim();
    const data = JSON.parse(file)

    for (const k of Object.keys(data)) {
        if (k !== 'container' && k !== 'packages') {
            return {error: t('invalidObjectKey')};
        }
    }

    if (file.split('container').length - 1 > 1) {
        return {error: t('mustBeOnlyOneContainer')};
    }

    const containerObj = data['container']
    const packagesObj = data['packages']
    const containerRet = containerFields(containerObj)
    const packagesRet = packagesFields(packagesObj)

    if (containerRet.error) return {...containerRet};
    if (packagesRet.error) return {...packagesRet};

    const {container} = containerRet
    const {packages} = packagesRet

    return {container, packages}
}

function parseJSON(file, handler) {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        const parsedData = parseJSONFile(reader.result);
        if (parsedData.error) throw parsedData.error;
        handler(parsedData);
    }
};

function parseArrayToCSV(array) {
    let ret = '';
    if (array.length > 0) {
        const keys = Object.keys(array[0]);
        ret += keys.join(',') + '\n';
        array.forEach(element => {
            ret += keys.map(key => element[key]).join(',') + '\n';
        });
    }
    return ret;
}

function parseJSONtoCSV(json) {
    // is 'json' an array?
    if (!!json && json.constructor === Array) return parseArrayToCSV(json);
    // is 'json' an object?
    if (json === Object(json)) return Object.keys(json).map(prop => `\n${prop}\n` + parseJSONtoCSV(json[prop])).join('\n');
    // 'json' is primitive
    return json;
};

export {
    parseJSON,
    parseJSONtoCSV,
    parseJSONFile,
}

export default parseJSON