import Button from "@mui/material/Button";
import styled from "@emotion/styled";
const headers = ",width,height,length,cost,maxWeight,type,amount,priority,weight,profit,canRotate,canStackAbove";

function parseCSV(file) {
    let rows = file.split(/\r?\n/)
    if (rows[0] !== headers) {
        console.log("oof")
    }
    console.log(rows)
}

function clickFileButton(){
    let file = document.getElementById("contained-button-file").files[0]
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function (){
        console.log(reader.result)
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
                multiple type="file" />
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