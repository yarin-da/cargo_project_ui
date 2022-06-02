import { parseValue } from "./Type";
import Package from "./Package";

const headers = "width,height,depth,cost,maxWeight,type,amount,priority,weight,profit,canRotate,canStackAbove".split(',');
const cargoHeaders = "width,height,depth,cost,maxWeight".split(',');
const packageHeaders = "width,height,depth,type,amount,priority,weight,profit,canRotate,canStackAbove".split(',');

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

function containerFields(containerRow, map) {
    const container = {};
    for (const [col, index] of map) {
        if (cargoHeaders.includes(col)) {
            container[col] = parseValue(col, containerRow[index]);
        }
    }
    return container;
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
    parseCSV,
    parseJSONtoCSV,
}

export default parseCSV