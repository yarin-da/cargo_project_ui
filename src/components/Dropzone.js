import { createStyles, makeStyles } from '@material-ui/core/styles';
import {DropzoneArea} from "material-ui-dropzone";

const useStyles = makeStyles(theme => createStyles({
    previewChip: {
        minWidth: 160,
        maxWidth: 210
    },
}));

//const classes = useStyles();

const Dropzone = () => {
    return (
        <DropzoneArea
            showPreviews={true}
            // ADD TYPE FILE
            showPreviewsInDropzone={false}
            showFileNames={true}
            useChipsForPreview
            previewGridProps={{container: { spacing: 1, direction: 'row' }}}
            // previewChipProps={{classes: { root: classes.previewChip } }}
            previewText="Selected files"
        />
    )
};

export default Dropzone;