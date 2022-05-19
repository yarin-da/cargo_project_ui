import Button from "@mui/material/Button";
import { saveAs } from "file-saver";
import demo from "../demo.csv";
import { useTranslation } from "react-i18next";

function downloadFile(){
    saveAs(
        demo,
        "input_example.csv"
    );
}

const ExampleInputFileButton = () => {
    const { t } = useTranslation();
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
            {t("download_example_file")}
        </Button>
    )
};

export default ExampleInputFileButton;