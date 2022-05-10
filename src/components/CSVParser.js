import Package from "./Package";

const headers = "width,height,depth,cost,maxWeight,type,amount,priority,weight,profit,canRotate,canStackAbove".split(',');
const cargoHeaders = "width,height,depth,cost,maxWeight".split(',');
const packageHeaders = "width,height,depth,type,amount,priority,weight,profit,canRotate,canStackAbove".split(',');

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

function unexpectedFileFormat(error) {
    console.log(error);
}

function splitRowsToArrays(rows) {
    for (let i = 0; i < rows.length; i++) {
        rows[i] = rows[i].split(',');
    }
    return rows
}

function headerToIndexMap(firstRow) {
    const map = new Map();
    for (let i = 0; i < firstRow.length; i++) {
        if (headers.includes(firstRow[i])) {
            if (!map.has(firstRow[i])) {
                map.set(firstRow[i], i + 1);
            } else {
                unexpectedFileFormat(`column ${firstRow[i]} appears more than once`);
            }
        } else {
            unexpectedFileFormat(`invalid column ${firstRow[i]}`);
        }
    }
    return map
}

function parseValue(field, value) {
    const type = types[field];
    switch(type) {
        case 'boolean':
            return trueOrFalse(value);
        case 'number':
            return parseFloat(value);
        default:
            return value;
    }
}

function containerFields(containerRow, map) {
    const container = {};
    for (const [col, index] of map) {
        if (cargoHeaders.includes(col)) {
            container[col] = parseValue(col, containerRow[index]);
        }
    }
    return container;
}

function trueOrFalse(str) {
    const upperCaseStr = str.toUpperCase();
    if (upperCaseStr === 'TRUE') return true;
    if (upperCaseStr === 'FALSE') return false;
    unexpectedFileFormat('true/false');
}

function packagesFields(packagesRows, map) {
    const packages = [];
    for (let i = 0; i < packagesRows.length; i++) {
        const p = new Package();
        for (const [col, index] of map) {
            if (packageHeaders.includes(col)) {
                p[col] = parseValue(col, packagesRows[i][index]);
            }
        }
        packages.push(p);
    }
    return packages;
}

function parseCSVFile(file) {
    // split file text to rows (take into account possible carriage return in windows)
    let rows = file.split(/\r?\n/);
    // delete titles
    let firstRow = rows.shift();
    let dataRows = splitRowsToArrays(rows);

    let newFirstRow = firstRow.split(',');
    newFirstRow.shift();
    let headerToIndex = headerToIndexMap(newFirstRow);

    let isContainer = false;
    let containerRow = [];
    let packagesRows = [];
    for (let i = 0; i < dataRows.length; i++) {
        if (dataRows[i][0] === 'container' && isContainer) {
            unexpectedFileFormat('more than 1 container')
            containerRow.length = 0;
            packagesRows.length = 0;
            break;
        }
        if (dataRows[i][0] === 'container' && !isContainer) {
            isContainer = true;
            containerRow = dataRows[i];
        }
        if (dataRows[i][0] === 'package') {
            packagesRows.push(dataRows[i]);
        }
    }

    const container = containerFields(containerRow, headerToIndex);
    const packages = packagesFields(packagesRows, headerToIndex);
    return { container, packages }
}

function parseCSV(file, handler) {
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
        const parsedData = parseCSVFile(reader.result);
        handler(parsedData);
    }
};

export default parseCSV