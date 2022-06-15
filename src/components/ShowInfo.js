import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import {Icon, Tooltip} from "@mui/material";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import CustomText from "./CustomText";
import findPacking from '../images/findPacking.png'
import viewSolution from '../images/viewSolution.png'
import * as React from 'react';
import editColors from '../images/typeColor.png'
import editButton from '../images/editButton.png'
import exportButton from '../images/exportButton.png'
import moveButtons from '../images/moveButtons.png'
import Box from "@mui/material/Box";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Tab, Tabs, Typography} from "@material-ui/core";

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
    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
            <Box sx={{ width: '100%', typography: 'body1'}}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                            <Tab label="Edit packages colors" value="1" />
                            <Tab label="Edit solution" value="2" />
                            <Tab label="Export solution" value="3" />
                        </TabList>
                    </Box>

                    <TabPanel value="1" style={{display: "flex", flexDirection: "column"}}>
                        <CustomText text="If you want to change the color of the packages (by type) click on the color circle in the map on the left." />
                        <img src={editColors} alt={editColors} style={{
                            display: "flex",
                            alignItems: "center",
                            alignSelf: "center",
                            height: 100,
                            width: 160
                        }}/> <br/>
                    </TabPanel>
                    <TabPanel value="2" style={{display: "flex", flexDirection: "column"}}>
                        <CustomText text="To change the resulting solution, click the edit button and then the package you want to edit." />
                        <img src={editButton} alt={editButton} style={{
                            display: "flex",
                            alignItems: "center",
                            alignSelf: "center",
                            height: 60,
                            width: 70
                        }}/><br/>
                        <CustomText text="The buttons on the right menu are the same colors as the arrows next to the container - this indicates the direction of movement according to the color of the button." />
                        <br/>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center", alignSelf: "center"}}>
                            <img src={moveButtons} alt={moveButtons} style={{
                                display: "flex",
                                alignItems: "center",
                                alignSelf: "center",
                                height: 220,
                                width: 195
                            }}/>
                            <img src={moveButtons} alt={moveButtons} style={{
                                display: "flex",
                                alignItems: "center",
                                alignSelf: "center",
                                height: 220,
                                width: 195
                            }}/>
                        </div>
                        <br/>
                    </TabPanel>
                    <TabPanel value="3" style={{display: "flex", flexDirection: "column"}}>
                        <CustomText text="If you want to export the solution, click the download button." />
                        <img src={exportButton} alt={exportButton} style={{
                            display: "flex",
                            alignItems: "center",
                            alignSelf: "center",
                            height: 70,
                            width: 60
                        }}/><br/>
                        <CustomText text="You can insert the downloaded file as input on the home page after clicking on View solution and immediately switch to the 3D screen." />
                    </TabPanel>
                </TabContext>
            </Box>


        // <div style={{display: "flex", flexDirection: "column"}}>
        //     <CustomText text="If you want to change the color of the packages (by type) click on the color circle in the map on the left." />
        //     <img src={editColors} alt={editColors} style={{
        //         display: "flex",
        //         alignItems: "center",
        //         alignSelf: "center",
        //         height: 100,
        //         width: 160
        //     }}/> <br/>
        //     <CustomText text="To change the resulting solution, click the edit button and then the package you want to edit." />
        //     <img src={editButton} alt={editButton} style={{
        //         display: "flex",
        //         alignItems: "center",
        //         alignSelf: "center",
        //         height: 60,
        //         width: 70
        //     }}/><br/>
        //     <CustomText text="The buttons on the right menu are the same colors as the arrows next to the container - this indicates the direction of movement according to the color of the button." />

        //     <CustomText text="If you want to export the solution, click the download button." />
        //     <img src={exportButton} alt={exportButton} style={{
        //         display: "flex",
        //         alignItems: "center",
        //         alignSelf: "center",
        //         height: 70,
        //         width: 60
        //     }}/><br/>
        //     <CustomText text="You can insert the downloaded file as input on the home page after clicking on View solution and immediately switch to the 3D screen." />
        // </div>
    );
};


const HomeHelp = () => {
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <CustomText text="If you want to enter input, click on Find packing."/>
            <img src={findPacking} alt={findPacking} style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "center",
                height: 60,
                width: 150
            }}/><br/>
            <CustomText
                text="If you want to insert a solution file to go directly to the 3D screen, click View Solution."/>
            <img src={viewSolution} alt={viewSolution} style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "center",
                height: 55,
                width: 150
            }}/>
        </div>
    );
};

const helpComponent = {
    "/view": <ViewHelp/>,
    "/": <HomeHelp/>,
};

const ShowInfo = () => {
    const {t} = useTranslation();
    const location = useLocation();
    const [help, setHelp] = useState('/');

    useEffect(() => {
        setHelp(helpComponent[location.pathname])
    }, [location]);

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