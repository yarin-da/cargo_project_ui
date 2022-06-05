import { t } from "i18next";

const testBooleanType = (value) => typeof value === 'boolean';
const testStringType = (value) => Object.prototype.toString.call(value) === '[object String]';
const testNonNegativeNumberType = (value) => typeof value === 'number' && value >= 0
const testPositiveIntegerType = (value) => Number.isInteger(value) && value > 0;

const testBooleanString = (value) => /^(true)|(false)$/i.test(value);
const testPositiveIntegerString = (value) => /^\d*[1-9]\d*$/.test(value);
const testNonNegativeNumberString = (value) => /^(\d*\.?\d+)|(\d+\.?\d*)$/.test(value);

const types = {
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
    "cost": 'nonNegativeNumber',
    "maxWeight": 'nonNegativeNumber',
};

const typeTesters = {
    "positiveInteger": testPositiveIntegerType,
    "nonNegativeNumber": testNonNegativeNumberType,
    "string": testStringType,
    "boolean": testBooleanType,
};

const stringTypeTesters = {
    "positiveInteger": testPositiveIntegerString,
    "nonNegativeNumber": testNonNegativeNumberString,
    "boolean": testBooleanString,
    "string": (value) => true,
}

const isInputValid = (data) => {
    const { container, packages } = data;
    
    for (let key of Object.keys(container)) {
        const keyType = types[key];
        const tester = typeTesters[keyType];
        const value = container[key];
        if (tester && !tester(value)) {
            debugger;
            return t('inputError', { object: 'container', key, type: keyType, value: value });
        }
    }

    for (let pkg of packages) {
        for (let key of Object.keys(pkg)) {
            const keyType = types[key];
            const tester = typeTesters[keyType];
            const value = pkg[key];
            if (tester && !tester(value)) {
                return t('inputError', { object: 'package', key, type: keyType, value: value });
            }
        }    
    }

    return undefined;
}


function parseBool(str) {
    const upperCaseStr = str.toUpperCase();
    if (upperCaseStr === 'TRUE') return true;
    if (upperCaseStr === 'FALSE') return false;
    return undefined;
}

function parseValue(field, value) {
    const type = types[field];
    switch(type) {
        case 'boolean':
            return parseBool(value);
        case 'positiveInteger':
            return parseInt(value);
        case 'nonNegativeNumber':
            return parseFloat(value);
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