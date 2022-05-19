import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const Text = (props) => {
    const { text } = props;
    const { t, i18n } = useTranslation();
    const alignment = (i18n.language === 'he') ? 'right' : 'left';
    return (
        <Typography {...props} align={alignment}>{t(text)}</Typography>
    );
};

export default Text;