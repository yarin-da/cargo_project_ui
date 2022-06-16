import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import CustomText from "./CustomText";
import findPacking from '../images/findPacking.png'
import viewSolution from '../images/viewSolution.png'
import * as React from 'react';
import editColors from '../images/typeColor.png'
import editButton from '../images/editButton.png'
import emptyContainer from "../images/empty_container_axes.png";
import exportButton from '../images/exportButton.png'
import moveButtons from '../images/moveButtons.png'
import ctrl from '../images/ctrl.png'
import alt from '../images/alt.png'
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
    const { t } = useTranslation();
    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
            <Box sx={{ width: '100%', typography: 'body1', maxHeight: "50vh", overflowY: "scroll"}}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                            <Tab style={{textTransform: 'none'}} label={t("editPackagesColors")} value="1" />
                            <Tab style={{textTransform: 'none'}} label={t("editSolutionInfo")} value="2" />
                            <Tab style={{textTransform: 'none'}} label={t("exportSolution")} value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <CustomText text={t("packagesColor")} />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={editColors} alt={editColors} style={{
                                height: 100,
                                width: 160,
                                marginTop: 5,
                            }}/>
                        </div>
                    </TabPanel>
                    <TabPanel value="2">
                        <CustomText text={t("clickEditButton")} />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={editButton} alt={editButton} style={{
                                height: 60,
                                width: 70,
                                marginBottom: 5,
                            }}/>
                        </div>
                        <CustomText text={"rightMenu"} />
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <img src={moveButtons} alt={moveButtons} style={{
                                height: 242,
                                width: 215,
                                marginTop: 5,
                                marginBottom: 10
                            }}/>
                            <img src={emptyContainer} alt={moveButtons} style={{
                                height: 242,
                                width: 215,
                                marginTop: 5,
                                marginBottom: 10
                            }}/>
                        </div>
                        <CustomText text={t("multiplePackages")}/>
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <img src={ctrl} alt={ctrl}/>
                        </div>
                        <CustomText text={t("focusCamera")}/>
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <img src={alt} alt={alt}/>
                        </div>
                    </TabPanel>
                    <TabPanel value="3">
                        <CustomText text={t("exportInfo")} />
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <img src={exportButton} alt={exportButton} style={{
                                alignSelf: "center",
                                height: 70,
                                width: 60,
                                marginBottom: 5
                            }}/>
                        </div>
                        <CustomText text={t("insertFileInHome")} />
                    </TabPanel>
                </TabContext>
            </Box>
    );
};


const HomeHelp = () => {
    const { t } = useTranslation();
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <CustomText text={t("enterInput")}/>
            <img src={findPacking} alt={findPacking} style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "center",
                height: 60,
                width: 150
            }}/>
            <CustomText text={t("insertSolutionFile")}/>
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
            }}/>
            {help}
        </div>
    )
};

export default ShowInfo;