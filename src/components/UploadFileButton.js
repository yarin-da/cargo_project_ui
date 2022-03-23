import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const headers = "width,height,depth,cost,maxWeight,type,amount,priority,weight,profit,canRotate,canStackAbove".split(',');
const cargoHeaders = "width,height,depth,cost,maxWeight".split(',')
const packageHeaders = "width,height,depth,type,amount,priority,weight,profit".split(',')

function unexpectedFileFormat(error) {
    console.log(error)
    console.log("oof")
}


function splitRowsToArrays(rows) {
    for (let i = 0; i < rows.length; i++) {
        rows[i] = rows[i].split(',')
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
                unexpectedFileFormat('two col same')
            }
        } else {
            unexpectedFileFormat('invalid col')
        }
    }
    return map
}

function containerFields(containerRow, map) {
    for (const [col, index] of map) {
        if (cargoHeaders.includes(col)) {
            const textFieldId = 'cargo-' + col
            document.getElementById(textFieldId).value = containerRow[index]
            //document.getElementById(textFieldId).style = ? ;
        }
    }
}

function trueOrFalse(str) {
    if (str === 'TRUE') {
        return true
    }
    if (str === 'FALSE') {
        return false
    }
    unexpectedFileFormat('true/false')
}

function packagesFields(packagesRows, map) {
    for (let i = 0; i < packagesRows.length; i++) {
        for (const [col, index] of map) {
            if (packageHeaders.includes(col)) {
                const textFieldId = 'package-' + col + (i).toString()
                console.log(textFieldId)
                document.getElementById(textFieldId).value = packagesRows[i][index];
            }
            if (col === 'canRotate') {
                document.getElementById("canRotate").checked = trueOrFalse(packagesRows[i][index])
            }
            if (col === 'canStackAbove') {
                document.getElementById("canStackAbove").checked = trueOrFalse(packagesRows[i][index])
            }
        }
    }
}

function parseCSV(file) {

    return;
    let rows = file.split(/\r?\n/)
    let firstRow = rows.shift()
    let dataRows = splitRowsToArrays(rows)

    let newFirstRow = firstRow.split(',')
    newFirstRow.shift()
    let headerToIndex = headerToIndexMap(newFirstRow);
    console.log(headerToIndex)

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
            isContainer = true
            containerRow = dataRows[i]
        }
        if (dataRows[i][0] === 'package') {
            packagesRows.push(dataRows[i])
        }
    }

    containerFields(containerRow, headerToIndex)
    packagesFields(packagesRows, headerToIndex)

    // console.log(containerRow)
    // console.log(packagesRows)

}

function clickFileButton() {
    let file = document.getElementById("contained-button-file").files[0]
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function () {
        //console.log(reader.result)
        parseCSV(reader.result)
    }
}

const Input = styled('input')({
    display: 'none',
});

const UploadFileButton = () => {
    return (

        <label htmlFor="contained-button-file">
            <Input
                accept=".csv, application/vnd.openmosix-officiated.spreadsheet.sheet, application/vnd.ms-excel"
                id="contained-button-file"
                onChange={clickFileButton}
                multiple type="file"/>
            <Button
                className="upload-button"
                component="span"
                multiple type="file"
                style={{
                    textTransform: 'none',
                    color: "black",
                    borderColor: "white",
                    marginTop: 13,
                    background: "white"
                }}
                variant="outlined">
                Upload file
            </Button>
        </label>
    )
};

export default UploadFileButton;