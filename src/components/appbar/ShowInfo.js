import * as React from 'react';
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import CustomText from "../util/CustomText";
import findPacking from '../../images/findPacking.png'
import viewSolution from '../../images/viewSolution.png'
import editColors from '../../images/typeColor.png'
import editButton from '../../images/editButton.png'
import emptyContainer from "../../images/empty_container_axes.png";
import exportButton from '../../images/exportButton.png'
import moveButtons from '../../images/moveButtons.png'
import ctrl from '../../images/ctrl.png'
import alt from '../../images/alt.png'
import {TabContext, TabPanel, TabList} from '@mui/lab';
import {Tab, Box} from "@mui/material";

// a component that displays info about the 3D page
const ViewHelp = () => {
    const {t} = useTranslation();
    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%', typography: 'body1', maxHeight: "50vh", overflowY: "scroll"}}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-evenly'}}>
                    <TabList onChange={handleChange}>
                        <Tab style={{textTransform: 'none'}} label={t("viewControl")} value="1"/>
                        <Tab style={{textTransform: 'none'}} label={t("editSolutionInfo")} value="2"/>
                        <Tab style={{textTransform: 'none'}} label={t("exportSolution")} value="3"/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <CustomText text="packagesColor"/>
                    <div className="show-info">
                        <img src={editColors} alt={editColors} style={{
                            height: 100,
                            width: 160,
                            marginTop: 5,
                            marginButtom: 15,
                        }}/>
                    </div>
                    <CustomText text="differentAngels"/>
                    <CustomText text="differentLocations"/>
                    <CustomText text="zoom"/>
                </TabPanel>
                <TabPanel value="2">
                    <CustomText text="clickEditButton"/>
                    <div className="show-info">
                        <img src={editButton} alt={editButton} style={{
                            height: 60,
                            width: 70,
                            marginBottom: 5,
                        }}/>
                    </div>
                    <CustomText text="rightMenu"/>
                    <div className="show-info-img">
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
                    <CustomText text="multiplePackages"/>
                    <div className="show-info-img">
                        <img src={ctrl} alt={ctrl}/>
                    </div>
                    <CustomText text="focusCamera"/>
                    <div className="show-info-img">
                        <img src={alt} alt={alt}/>
                    </div>
                </TabPanel>
                <TabPanel value="3">
                    <CustomText text="exportInfo"/>
                    <div className="show-info-tab3">
                        <img src={exportButton} alt={exportButton} style={{
                            alignSelf: "center",
                            height: 70,
                            width: 60,
                            marginBottom: 5
                        }}/>
                    </div>
                    <CustomText text="insertFileInHome"/>
                </TabPanel>
            </TabContext>
        </Box>
    );
};

// a component that displays info about the home page
const HomeHelp = () => {
    return (
        <div className="show-info-home-page">
            <CustomText text="enterInput"/>
            <img src={findPacking} alt={findPacking} style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "center",
                height: 60,
                width: 150
            }}/>
            <CustomText text="insertSolutionFile"/>
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
    const location = useLocation();
    const [help, setHelp] = useState('/');

    useEffect(() => {
        // match info to the current page
        setHelp(helpComponent[location.pathname])
    }, [location]);

    return (
        <div className="help-popup">
            <CustomText text="help" style={{
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