import Button from "@mui/material/Button";
import styled from "@emotion/styled";


function clickFileButton(){
    console.log("")
}

const Input = styled('input')({
    display: 'none',
});

const UploadFileButton = () => {
    return (

        <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <Button
                className="upload-button"
                onClick={clickFileButton}
                component="span"
                multiple type="file"
                style={{
                    textTransform: 'none',
                    color: "white",
                    borderColor: "white",
                    marginTop: 25
                }}
                variant="outlined">
                Upload file
            </Button>
        </label>
    )
};

export default UploadFileButton;