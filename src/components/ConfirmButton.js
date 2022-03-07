import '../styles/ConfirmButton.css'
import Button from "@mui/material/Button";

const buttonStyle = {
    textTransform: 'none',
    color: "black",
    borderColor: "black",
    marginTop: 25,
    marginBottom: 25
}

function sendData() {

}

const ConfirmButton = () => {
    return (
        <div>
            <Button
                className="confirm-button"
                onClick={sendData}
                component="span"
                multiple type="file"
                style={buttonStyle}
                variant="outlined">
                Confirm
            </Button>
        </div>
    )


};

export default ConfirmButton;