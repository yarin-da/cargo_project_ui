import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import CustomText from "./CustomText";
import CustomAppBar from "./CustomAppBar";
import { Button } from "@mui/material";
import { Typography } from "@material-ui/core";

const Header = ({ units, setUnits }) => {
    const navigate = useNavigate();
    return (
        <div style={{ display: 'flex', flexDirection: 'column-reverse', width: '100vw', height: '100vh' }}>
            <div className="head">
                <div className="header">
                    <div className="header-title">
                        <Typography 
                            className="header-title-text"
                            variant="h2"
                        >
                            LET YOUR SUCCESS
                        </Typography>
                        <Typography 
                            className="header-title-text" 
                            variant="h2"
                        >
                            RIDE WITH US.
                        </Typography>
                    </div>
                    <div style={{alignSelf: 'center', display: 'flex', flexDirection: 'column'}}>
                        <Button
                            sx={{
                                textTransform: 'none',
                                color: "primary",
                                border: '2px solid',
                                borderColor: "primary",
                                borderRadius: 5,
                                padding: 3,
                                background: 'rgba(30, 30, 45, 0.5)',
                                cursor: 'pointer',
                                margin: 1,
                            }}
                            onClick={() => navigate('/config')}
                        >
                            <CustomText text="findPacking" variant="h3" />
                        </Button>
                        {/* <Button
                            sx={{
                                textTransform: 'none',
                                color: "primary",
                                border: '2px solid',
                                borderColor: "primary",
                                borderRadius: 5,
                                padding: 3,
                                background: 'rgba(30, 30, 45, 0.5)',
                                cursor: 'pointer',
                                margin: 1,
                            }}
                            onClick={() => navigate('/view')}
                        >
                            <CustomText text="viewSolution" variant="h3" />
                        </Button> */}
                    </div>
                </div>
            </div>
            <CustomAppBar units={units} setUnits={setUnits} />
        </div>
    )
};

export default Header;