import Button from "@mui/material/Button";
import { saveAs } from "file-saver";
import demo from "../demo.csv";
import CustomText from "./CustomText";

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
            }}
            variant="outlined">
            <CustomText text="downloadExampleFile" />
        </Button>
    )
};

export default ExampleInputFileButton;