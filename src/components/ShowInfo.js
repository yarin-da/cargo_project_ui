import {Icon, Tooltip} from "@mui/material";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";

const iconStyle = {
    marginLeft: 20,
}

const ShowInfo = () => {
    return (
        <Tooltip title={
            <div>
                You can set up only one container.<br/>
                For fields that are not relevant to the container and packages,
                check '-' (as in the sample file).
            </div>
        }>
            <Icon style={iconStyle}>
                <InfoSharpIcon/>
            </Icon>
        </Tooltip>
    )
};

export default ShowInfo;

