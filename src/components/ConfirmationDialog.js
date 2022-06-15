import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomText from "./CustomText";

const ConfirmationDialog = ({ open, title, text, onConfirm, onCancel, extraButtons }) => {
    const { t } = useTranslation();
    const buttonStyle = { textTransform: 'none' };
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>
                {t(title)}
            </DialogTitle>
            <DialogContent>
                <CustomText text="finishDialogContent" />
            </DialogContent>
            <DialogActions>
                {extraButtons && 
                extraButtons.map((b, i) =>
                    <Button 
                        key={`confirm-dialog-button-${i}`} 
                        style={buttonStyle} 
                        onClick={b['onClick']}
                    >
                        {t(b['title'] ?? '')}
                    </Button>
                )}
                <Button style={buttonStyle} onClick={onCancel}>{t("cancel")}</Button>
                <Button style={buttonStyle} onClick={onConfirm} autoFocus>{t("confirm")}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;