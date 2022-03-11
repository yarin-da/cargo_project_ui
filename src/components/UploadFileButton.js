import Button from "@mui/material/Button";
import styled from "@emotion/styled";


function clickFileButton(){
    console.log("")
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
                multiple type="file" />
            <Button
                className="upload-button"
                onClick={clickFileButton}
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