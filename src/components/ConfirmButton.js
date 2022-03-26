import Button from "@mui/material/Button";
import "../styles/ConfirmButton.css";

const buttonStyle = {
    textTransform: 'none',
    color: "black",
    borderColor: "black",
    marginTop: 25,
    marginBottom: 25
}

function sendData() {
    let amount = document.getElementById('package-amount').toString();
    console.log(amount)
    if (amount.indexOf('.') > -1) {

    }
}

const ConfirmButton = () => {
    return (
        <Button
            className="confirm-button"
            onClick={sendData}
            component="span"
            multiple type="file"
            style={buttonStyle}
            variant="outlined">
            Confirm
        </Button>
    )
};

export default ConfirmButton;