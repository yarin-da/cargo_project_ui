import Button from "@mui/material/Button";
import { saveAs } from "file-saver";
import logo from './images/logo.png'
import {Tooltip} from "@mui/material";

function downloadFile(){
    saveAs(
        logo,
        "example.png"
    );
}

const ExampleInputFileButton = () => {
    return (
        <Tooltip title="Click here if you want to see the file format">
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
        </Tooltip>

    )
};

export default ExampleInputFileButton;