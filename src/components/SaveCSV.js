import {saveAs} from "file-saver";

const CSVheaders = "width,height,depth,maxWeight,type,amount,priority,weight,profit,canRotate,canStackAbove".split(',');
const CSVheadersRow = ",width,height,depth,maxWeight,type,amount,priority,weight,profit,canRotate,canStackAbove";

function jsonToCSV(data) {
    const container = data['container']
    const packages = data['packages']

    let csv = ""
    csv = csv.concat(CSVheadersRow)
    csv = csv.concat('\n')

    let containerRow = "container,"
    let containerKeys = Object.keys(container)
    for (let i = 0; i < CSVheaders.length; i++) {
        if (containerKeys.includes(CSVheaders[i])) {
            let value = container[CSVheaders[i]].toString().concat(",")
            containerRow = containerRow.concat(value)
        } else {
            containerRow = containerRow.concat('-,')
        }

        if (i === CSVheaders.length - 1) {
            containerRow = containerRow.slice(0, -1);
        }
    }
    containerRow = containerRow.concat("\n")
    csv = csv.concat(containerRow)

    for (let i = 0; i < packages.length; i++) {
        let packRow = "package,"
        const packKeys = Object.keys(packages[i])
        for (let j = 0; j < CSVheaders.length; j++) {
            if (packKeys.includes(CSVheaders[j])) {
                let value = packages[i][CSVheaders[j]].toString().concat(",")
                packRow = packRow.concat(value)
            } else {
                packRow = packRow.concat('-,')
            }

            if (j === CSVheaders.length - 1) {
                packRow = packRow.slice(0, -1);
            }
        }
        packRow = packRow.concat("\n")
        csv = csv.concat(packRow)
    }

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const blob = new Blob([csv], { type: fileType });
    return blob
}

function saveCSV(filename, data) {
    let blob = jsonToCSV(data);
    saveAs(blob, `${filename}.csv`);
}

export default saveCSV;