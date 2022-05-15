import Button from "@mui/material/Button";
import { saveAs } from "file-saver";
import demo from "../demo.csv";

function downloadFile(){
    saveAs(
        demo,
        "input_example.csv"
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
                background: "black",
                color: "white",
                borderColor: "black",
                marginTop: 15,
                marginBottom: 20,
                marginLeft: "50%"
            }}
            variant="outlined">
            Download example file
        </Button>
    )
};

export default ExampleInputFileButton;