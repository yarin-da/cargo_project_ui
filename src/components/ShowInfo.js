import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import CustomText from "./CustomText";

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
        <div>
            <CustomText text="If you want to change the color of the packages (by type) click on the color circle in the map on the left." />
            <CustomText text="To change the resulting solution, click the edit button and then the package you want to edit." />
            <CustomText text="The buttons on the right menu are the same colors as the arrows next to the container - this indicates the direction of movement according to the color of the button." />
            <CustomText text="If you want to export the solution, click the download button." />
            <CustomText text="You can insert the downloaded file as input on the home page after clicking on View solution and immediately switch to the 3D screen." />
        </div>
    );
};

const HomeHelp = () => {
    return (
        <div>
            <CustomText text="If you want to enter input, click on Find packing." />
            <CustomText text="If you want to insert a solution file to go directly to the 3D screen, click View Solution." />
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
            }}/>
            {help}
        </div>
    )
};

export default ShowInfo;