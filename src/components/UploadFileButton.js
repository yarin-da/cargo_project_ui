import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import parseCSV from "./CSVParser";

const Input = styled('input')({
    display: 'none',
});

const UploadFileButton = ({ setContainer, setPackages }) => {
    function clickFileButton() {
        let file = document.getElementById("contained-button-file").files[0];
        parseCSV(
            file, 
            ({ container, packages }) => {
                setContainer(container);
                setPackages(packages);    
            }
        );
    }

    return (
        <label htmlFor="contained-button-file">
            <Input
                accept=".csv, application/vnd.openmosix-officiated.spreadsheet.sheet, application/vnd.ms-excel"
                id="contained-button-file"
                onChange={clickFileButton}
                type="file"/>
            <Button
                className="upload-button"
                component="span"
                type="file"
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