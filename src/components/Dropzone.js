import {createStyles, makeStyles} from '@material-ui/core/styles';
import {DropzoneArea} from "material-ui-dropzone";

const useStyles = makeStyles(theme => createStyles({
    previewChip: {
        minWidth: 160,
        maxWidth: 210
    },
}));

//const classes = useStyles();

const dropStyle = {
    width: "70%",
    marginLeft: "24%",
    marginRight: "3%"
}

const Dropzone = () => {
    return (
        <div style={dropStyle}>
            <DropzoneArea
                showPreviews={true}
                // ADD TYPE FILE
                showPreviewsInDropzone={false}
                showFileNames={true}
                useChipsForPreview
                previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                // previewChipProps={{classes: { root: classes.previewChip } }}
                previewText="Selected files"
            />
        </div>
    )
};

export default Dropzone;