import Box from '@mui/material/Box';

const LanguagesButtons = () => {
    return (
        <div>
            <Box component="span" sx={{ p: 8, border: 1, borderRadius: 3}}>
                Hebrew
            </Box>
            <Box component="span" sx={{ p: 8, border: 1, borderRadius: 3}}>
                English
            </Box>
        </div>
    )
};

export default LanguagesButtons;