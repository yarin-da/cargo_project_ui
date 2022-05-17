import Button from "@mui/material/Button";
import { saveAs } from "file-saver";

function downloadFile(pathToCSV){
    saveAs(
        pathToCSV,
        "Solution.csv"
    );
}

const ExportSolutionButton = ({pathToCSV}) => {
    return (
        <Button
            className="upload-button"
            onClick={() => downloadFile(pathToCSV)}
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
            Export
        </Button>
    )
};

export default ExportSolutionButton;