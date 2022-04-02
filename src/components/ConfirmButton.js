import Button from "@mui/material/Button";
import "../styles/ConfirmButton.css";

const buttonStyle = {
    textTransform: 'none',
    color: "black",
    borderColor: "black",
    marginTop: 25,
    marginBottom: 25
}

const ConfirmButton = ({ units, container, packages }) => {
    const sendData = () => {
        if (packages.length > 0) {

        }
    }
    
    return (
        <Button
            className="confirm-button"
            onClick={sendData}
            component="span"
            multiple type="file"
            style={buttonStyle}
            size="large"
            variant="outlined">
            Confirm
        </Button>
    )
};

export default ConfirmButton;