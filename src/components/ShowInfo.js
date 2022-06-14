import {Icon, Tooltip} from "@mui/material";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import CustomText from "./CustomText";

const style = {
    width: 500,
    border: "1 solid black",
    borderRadius: 15,
    backgroundColor: "white",
    padding: 20
}

const ShowInfo = () => {
    return (
        <div style={style}>
            <CustomText text={"Help"} style={{
                fontSize: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}/>
            <CustomText text={"In home page:" +
            "- If you want to enter input, click on Find packing." +
            "- If you want to insert a solution file to go directly to the 3D screen, click View Solution." +
            "In 3D page:" +
            "- If you want to change the color of the packages (by type) click on the color circle in the map on the left" +
            "- To change the resulting solution, click the edit button and then the package you want to edit. " +
            "The buttons on the right menu are the same colors as the arrows next to the container - " +
            "this indicates the direction of movement according to the color of the button." +
            "- If you want to export the solution, click the download button.\n" +
            "You can insert the downloaded file as input on the home page after clicking on View solution and immediately switch to the 3D screen."}
                        style={{
                            fontSize: 20,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}/>
        </div>
    )
};

export default ShowInfo;

