import { useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { useTranslation } from "react-i18next";
import { parseCSVFile } from "./CSVParser";
import {parseJSONFile} from "./JSONParser";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";

const Dropzone = ({ setContainer, setPackages }) => {
    const { t } = useTranslation();
    const [alertType, setAlertType] = useState('info');
    const [alertText, setAlertText] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [inputError, setInputError] = useState(false);

    const onAlert = (variant) => {
        if (!inputError) {
            const isError = (variant === 'error');
            setAlertType(isError ? 'error' : 'success');
            setAlertText(isError ? 'uploadError' : 'uploadSuccess');
            setShowAlert(true);    
        }
    };

    const onDrop = (droppedFiles) => {
        let reader = new FileReader();
        reader.readAsText(droppedFiles[0]);
        reader.onload = () => {
            let parsedData;
            const fileName = droppedFiles[0].name;
            if (fileName.substring(fileName.length - 5) === ".json") {
                parsedData = parseJSONFile(reader.result)
            } else {
                parsedData = parseCSVFile(reader.result);
            }

            if (parsedData.error) {
                setAlertType('error');
                setAlertText(parsedData.error);
                setShowAlert(true);
                setInputError(true);
            } else {
                setInputError(false);
                const { container, packages } = parsedData;
                setContainer(container);
                setPackages(packages);
            }
        }
    };

    // TODO: Change reject background on drop for json files
    return (
        <>
            <DropzoneArea
                dropzoneText={t("dropOrClick")}
                filesLimit={1}
                acceptedFiles={[".json, application/json, text/json, .csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
                showPreviewsInDropzone={false}
                showFileNames={true}
                previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                showAlerts={false}
                onAlert={(_, variant) => onAlert(variant)}
                onDrop={onDrop}
                
            />
            <Snackbar 
                open={showAlert} 
                autoHideDuration={10000} 
                onClose={() => setShowAlert(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setShowAlert(false)} severity={alertType} sx={{ width: '100%' }}>
                    {t(alertText)}
                </Alert>
            </Snackbar>
        </>
    )
};

export default Dropzone;