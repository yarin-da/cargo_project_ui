import {t} from "i18next";

// test the type of the provided value
const testBooleanType = (value) => typeof value === 'boolean';
const testStringType = (value) => Object.prototype.toString.call(value) === '[object String]';
const testNonNegativeNumberType = (value) => typeof value === 'number' && value >= 0
const testPositiveIntegerType = (value) => Number.isInteger(value) && value > 0;
const testNonNegativeIntegerType = (value) => Number.isInteger(value) && value >= 0;

// test the type representation of strings
const testBooleanString = (value) => /^(true)|(false)$/i.test(value);
const testPositiveIntegerString = (value) => /^\d*[1-9]\d*$/.test(value);
const testNonNegativeIntegerString = (value) => /^\d*[0-9]\d*$/.test(value);
const testNonNegativeNumberString = (value) => /^(\d*\.?\d+)|(\d+\.?\d*)$/.test(value);

// map each prop to its type
const types = {
    "scalar": 'positiveInteger',
    "width": 'positiveInteger',
    "depth": 'positiveInteger',
    "height": 'positiveInteger',
    "priority": 'positiveInteger',
    "amount": 'positiveInteger',
    "weight": 'nonNegativeNumber',
    "profit": 'nonNegativeNumber',
    "canRotate": 'boolean',
    "canStackAbove": 'boolean',
    "type": 'string',
    "maxWeight": 'nonNegativeNumber',
    "x": 'nonNegativeInteger',
    "y": 'nonNegativeInteger',
    "z": 'nonNegativeInteger',
    "rotation-x": 'nonNegativeInteger',
    "rotation-y": 'nonNegativeInteger',
    "rotation-z": 'nonNegativeInteger',
    "space_usage": 'nonNegativeNumber',

};

// map type to type-tester
const typeTesters = {
    "positiveInteger": testPositiveIntegerType,
    "nonNegativeNumber": testNonNegativeNumberType,
    "nonNegativeInteger": testNonNegativeIntegerType,
    "string": testStringType,
    "boolean": testBooleanType,
};
// map type to string-tester
const stringTypeTesters = {
    "positiveInteger": testPositiveIntegerString,
    "nonNegativeNumber": testNonNegativeNumberString,
    "nonNegativeInteger": testNonNegativeIntegerString,
    "boolean": testBooleanString,
    "string": (value) => true,
}

const isInputValid = (data) => {
    const {container, packages} = data;

    // check the container's props' types
    for (let key of Object.keys(container)) {
        const keyType = types[key];
        const tester = typeTesters[keyType];
        const value = container[key];
        if (tester && !tester(value)) {
            return t('inputError', {object: 'container', key, type: t(keyType), value: value ?? 'null'});
        }
    }
    
    // check each package props' types
    for (let pkg of packages) {
        for (let key of Object.keys(pkg)) {
            const keyType = types[key];
            const tester = typeTesters[keyType];
            const value = pkg[key];
            if (tester && !tester(value)) {
                return t('inputError', {object: 'package', key, type: t(keyType), value: value ?? 'null'});
            }
        }
    }

    return undefined;
}

function parseBool(str) {
    const upperCaseStr = str.toString().toUpperCase();
    if (upperCaseStr === 'TRUE') return true;
    if (upperCaseStr === 'FALSE') return false;
    return undefined;
}

function parseValue(field, value) {
    const type = types[field];
    switch (type) {
        case 'boolean':
            return parseBool(value);
        case 'positiveInteger':
            return parseInt(value);
        case 'nonNegativeNumber':
            return parseFloat(value);
        case 'nonNegativeInteger':
            return parseInt(value);
        default:
            return value;
    }
}

export {
    types,
    stringTypeTesters,
    typeTesters,
    parseValue,
    isInputValid,
}