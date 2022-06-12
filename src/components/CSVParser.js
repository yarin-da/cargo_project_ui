import { parseValue, types, stringTypeTesters } from "./Type";
import Package from "./Package";
import { t } from "i18next";

const headers = "width,height,depth,cost,maxWeight,type,amount,priority,weight,profit,canRotate,canStackAbove".split(',');
const cargoHeaders = "width,height,depth,cost,maxWeight".split(',');
const packageHeaders = "width,height,depth,type,amount,priority,weight,profit,canRotate,canStackAbove".split(',');

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
                return { error: t('duplicateColumn', { column: firstRow[i] }) };
            }
        } else {
            return { error: t('invalidColumn', { column: firstRow[i] }) };
        }
    }
    return { map };
}

function containerFields(containerRow, map) {
    const container = {};
    for (const [col, index] of map) {
        if (cargoHeaders.includes(col)) {
            const type = types[col];
            const tester = stringTypeTesters[type];
            const value = containerRow[index]
            if (tester(value)) {
                container[col] = parseValue(col, value);
            } else {
                return { error: t('inputError', { object: t('container'), key: t(col), type: t(type), value }) }
            }
        }
    }
    return { container };
}

function packagesFields(packagesRows, map) {
    const packages = [];
    for (let i = 0; i < packagesRows.length; i++) {
        const p = new Package();
        for (const [col, index] of map) {
            if (packageHeaders.includes(col)) {
                const type = types[col];
                const tester = stringTypeTesters[type];
                const value = packagesRows[i][index];
                if (tester(value)) {
                    p[col] = parseValue(col, value);
                } else {
                    return { error: t('inputError', { object: t('package'), key: t(col), type: t(type), value }) }
                }
            }
        }
        packages.push(p);
    }
    return { packages };
}

function parseCSVFile(file) {
    // split file text to rows (take into account possible carriage return in windows)
    let rows = file.split(/\r?\n/);
    // delete titles
    let firstRow = rows.shift();
    let dataRows = splitRowsToArrays(rows);

    let newFirstRow = firstRow.split(',');
    newFirstRow.shift();
    let { map: headerToIndex, error } = headerToIndexMap(newFirstRow);
    if (error) return { error };

    let seenContainer = false;
    let containerRow = [];
    let packagesRows = [];
    for (let i = 0; i < dataRows.length; i++) {
        if (dataRows[i][0] === 'container' && seenContainer) {
            containerRow.length = 0;
            packagesRows.length = 0;
            return { error: t('mustBeOnlyOneContainer') };
        }
        if (dataRows[i][0] === 'container') {
            seenContainer = true;
            containerRow = dataRows[i];
        }
        if (dataRows[i][0] === 'package') {
            packagesRows.push(dataRows[i]);
        }
    }

    const containerRet = containerFields(containerRow, headerToIndex);
    if (containerRet.error) return {...containerRet};
    const packagesRet = packagesFields(packagesRows, headerToIndex);
    if (packagesRet.error) return {...packagesRet};

    const { packages } = packagesRet;
    const { container } = containerRet;
    return { container, packages }
}

function parseCSV(file, handler) {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        const parsedData = parseCSVFile(reader.result);
        if (parsedData.error) throw parsedData.error;
        handler(parsedData);
    }
};

export {
    parseCSV,
    parseCSVFile,
}

export default parseCSV