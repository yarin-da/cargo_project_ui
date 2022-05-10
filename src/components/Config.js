import React, {useState} from "react";
import LeftMenu from "./LeftMenu";
import AddContainer from "./AddContainer";
import UploadFile from "./UploadFile";
import PackagesList from "./PackagesList";
import SettingsPage from "./SettingsPage"
import {LocalShipping, Settings} from "@material-ui/icons";
import {Upload} from "@mui/icons-material";

const Config = ({
                    units,
                    setUnits,
                    packages,
                    setPackages,
                    currentPackage,
                    setCurrentPackage,
                    container,
                    setContainer
                }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        {
            title: 'Settings',
            icon: <Settings/>,
        },
        {
            title: 'Upload file (optional)',
            icon: <Upload/>,
        },
        {
            title: 'Container',
            icon: <LocalShipping/>,
        },
        {
            title: 'Packages',
            icon: <Settings/>,
        }
    ];


    return (
        <div style={{marginTop: "8%"}}>
            <LeftMenu buttons={pages} selected={currentPage} notifyButtonClicked={setCurrentPage}/>
            {
                currentPage === 0 && <SettingsPage units={units} setUnits={setUnits}/>
            }
            {
                currentPage === 1 && <UploadFile setContainer={setContainer} setPackages={setPackages} />
            }
            {
                currentPage === 2 && <AddContainer
                    container={container}
                    setContainer={setContainer}
                />
            }
            {
                currentPage === 3 && <PackagesList
                    units={units}
                    packages={packages}
                    setPackages={setPackages}
                    currentPackage={currentPackage}
                    setCurrentPackage={setCurrentPackage}
                />
            }
        </div>
    );
};

export default Config;