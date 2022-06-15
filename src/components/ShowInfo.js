import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {Icon, Tooltip} from "@mui/material";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import CustomText from "./CustomText";
import findPacking from '../images/findPacking.png'
import viewSolution from '../images/viewSolution.png'
import editColors from '../images/typeColor.png'

const style = {
    width: 500,
    border: "1 solid black",
    borderRadius: 15,
    backgroundColor: "white",
    padding: 20
}

// TODO: Add translations
// TODO: Add images/graphics/spacing/etc.
// TODO: Add keypress combination images (CTRL+LEFTCLICK, ALT+LEFTCLICK)
const ViewHelp = () => {
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <CustomText text="If you want to change the color of the packages (by type) click on the color circle in the map on the left." />
            <img src={editColors} alt={editColors} style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "center",
                height: 100,
                width: 160
            }}/> <br/>
            <CustomText text="To change the resulting solution, click the edit button and then the package you want to edit." />
            <CustomText text="The buttons on the right menu are the same colors as the arrows next to the container - this indicates the direction of movement according to the color of the button." />
            <CustomText text="If you want to export the solution, click the download button." />
            <CustomText text="You can insert the downloaded file as input on the home page after clicking on View solution and immediately switch to the 3D screen." />
        </div>
    );
};

const HomeHelp = () => {
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <CustomText text="If you want to enter input, click on Find packing." />
            <img src={findPacking} alt={findPacking} style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "center",
                height: 60,
                width: 150}}/><br/>
            <CustomText text="If you want to insert a solution file to go directly to the 3D screen, click View Solution." />
            <img src={viewSolution} alt={viewSolution} style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "center",
                height: 55,
                width: 150}}/>
        </div>
    );
};

const helpComponent = {
    "/view": <ViewHelp />,
    "/": <HomeHelp />,
};

const ShowInfo = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [help, setHelp] = useState('/');

    useEffect(() => { setHelp(helpComponent[location.pathname]) }, [location]);

    return (
        <div style={style}>
            <CustomText text={t("help")} style={{
                fontSize: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}/><br/>
            {help}
        </div>
    )
};

export default ShowInfo;