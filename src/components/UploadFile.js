import Dropzone from "./Dropzone";
import Typography from "@mui/material/Typography";
import ExampleInputFileButton from "./ExampleInputFileButton";

const UploadFile = ({ setContainer, setPackages }) => {
    return (
        <div>
            <Typography variant="h6" noWrap component="div">
                Upload file
            </Typography>
            <Typography variant="subtitle1">
                You may upload a csv file with the container/package information.<br/>
                It is advised that you download the sample file and edit it according to your needs.<br/>
                Note that some of the columns are exclusive to a container and some are exclusive to a package.
            </Typography>
            <div style={{ marginTop: 15, marginBottom: 15 }}>
                <ExampleInputFileButton/>
            </div>
            <Dropzone setContainer={setContainer} setPackages={setPackages} />
        </div>
    )
};

export default UploadFile;