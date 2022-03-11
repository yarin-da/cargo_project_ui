import Button from "@mui/material/Button";
import { saveAs } from "file-saver";
import logo from './images/logo.png'

function downloadFile(){
    saveAs(
        logo,
        "example.png"
    );
}


const ExampleInputFileButton = () => {
    return (

        <Button
            className="upload-button"
            onClick={downloadFile}
            component="span"
            multiple type="file"
            style={{
                textTransform: 'none',
                color: "white",
                borderColor: "white",
                marginTop: 25,
                marginLeft: 40
            }}
            variant="outlined">
            Download Example File
        </Button>

    )
};

export default ExampleInputFileButton;