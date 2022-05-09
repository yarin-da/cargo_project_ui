import React, { useState } from "react";
import LeftMenu from "./LeftMenu";
import AddContainer from "./AddContainer";
import PackagesList from "./PackagesList";
import {LocalShipping, Settings} from "@material-ui/icons";
import {Upload} from "@mui/icons-material";

const Config = ({
    units,
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
            icon: <Settings />,
        },
        {
            title: 'Upload file (optional)',
            icon: <Upload />,
        },
        {
            title: 'Container',
            icon: <LocalShipping />,
        },
        {
            title: 'Packages',
            icon: <Settings />,
        }
    ];

    
    return (
        <div>
            <LeftMenu buttons={pages} notifyButtonClicked={setCurrentPage} />
            {
                currentPage === 0 && <></>
            }
            {
                currentPage === 1 && <></>
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