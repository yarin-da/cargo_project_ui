import {useState} from "react";
import {DropzoneArea} from "material-ui-dropzone";
import { useTranslation } from "react-i18next";
import parseCSV from "./CSVParser";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";

const Dropzone = ({ setContainer, setPackages }) => {
    const { t } = useTranslation();
    const [alertType, setAlertType] = useState('info');
    const [alertText, setAlertText] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const onAlert = (variant) => {
        const isError = (variant === 'error');
        setAlertType(isError ? 'error' : 'success');
        setAlertText(isError ? 'uploadError' : 'uploadSuccess');
        setShowAlert(true);
    };

    return (
        <>
            <DropzoneArea
                dropzoneText={t("dropOrClick")}
                filesLimit={1}
                acceptedFiles={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
                showPreviewsInDropzone={false}
                showFileNames={true}
                previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                showAlerts={false}
                onAlert={(_, variant) => onAlert(variant)}
                onDrop={(droppedFiles) => {
                    parseCSV(
                        droppedFiles[0], 
                        ({ container, packages }) => {
                            setContainer(container);
                            setPackages(packages);
                        }
                    );
                }}
            />
            <Snackbar 
                open={showAlert} 
                autoHideDuration={5000} 
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