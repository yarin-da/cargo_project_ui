import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const getAlignment = (language) => language.includes('he') ? 'right' : 'left';

const Text = (props) => {
    const { text } = props;
    const { t, i18n } = useTranslation();
    const alignment = getAlignment(i18n.language);
    return (
        <Typography {...props} align={alignment}>{t(text)}</Typography>
    );
};

export default Text;