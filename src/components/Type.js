const types = {
    width: 'number',
    height: 'number',
    depth: 'number',
    weight: 'number',
    maxWeight: 'number',
    amount: 'number',
    cost: 'number',
    profit: 'number',
    priority: 'number',
    type: 'string',
    canRotate: 'boolean',
    canStackAbove: 'boolean',
};

function trueOrFalse(str) {
    const upperCaseStr = str.toUpperCase();
    if (upperCaseStr === 'TRUE') return true;
    if (upperCaseStr === 'FALSE') return false;
    return false;
}

function parseValue(field, value) {
    const type = types[field];
    switch(type) {
        case 'boolean':
            return trueOrFalse(value);
        case 'number':
            return Math.round(parseFloat(value));
        default:
            return value;
    }
}

export {
    types,
    trueOrFalse,
    parseValue,
}