import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from "@mui/material";
import { useTranslation } from "react-i18next";

const ConfirmationDialog = ({ open, title, text, onConfirm, onCancel }) => {
    const { t } = useTranslation();
    const buttonStyle = { textTransform: 'none' };
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>
                {t(title)}
            </DialogTitle>
            {/* <DialogContent>
                <DialogContentText>
                    {t(text)}
                </DialogContentText>
            </DialogContent> */}
            <DialogActions>
                <Button style={buttonStyle} onClick={onCancel}>{t("cancel")}</Button>
                <Button style={buttonStyle} onClick={onConfirm} autoFocus>{t("confirm")}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;