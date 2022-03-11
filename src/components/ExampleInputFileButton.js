import Button from "@mui/material/Button";
import { saveAs } from "file-saver";
import demo from '../demo.csv'
import {Tooltip} from "@mui/material";

function downloadFile(){
    saveAs(
        demo,
        "input_example.csv"
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
                    marginTop: 13,
                    marginLeft: 40
                }}
                variant="outlined">
                Download example file
            </Button>
        </Tooltip>
    )
};

export default ExampleInputFileButton;