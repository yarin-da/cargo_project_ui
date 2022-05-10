import Dropzone from "./Dropzone";
import Typography from "@mui/material/Typography";
import ExampleInputFileButton from "./ExampleInputFileButton";

const titleStyle = {
    marginLeft: "25%",
    marginBottom: "1%"
}

const textStyle = {
    marginLeft: "25%"
}

const UploadFile = () => {
    return (
        <div>
            <Typography variant="h6" noWrap component="div" style={titleStyle}>
                Upload file
            </Typography>
            <Typography variant="subtitle1" style={textStyle}>
                You can set up only one container. <br/>
                For fields that are not relevant to the container and packages,
                check '-' (as in the sample file).<br/>
                You can download a sample file.<br/>
            </Typography>
            <ExampleInputFileButton/>
            <Dropzone/>
        </div>

    )
};

export default UploadFile;