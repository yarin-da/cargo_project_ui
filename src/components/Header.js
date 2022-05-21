import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import CustomText from "./CustomText";
import CustomAppBar from "./CustomAppBar";
import { Button } from "@mui/material";

const Header = ({ units, setUnits }) => {
    const navigate = useNavigate();
    return (
        <div style={{ display: 'flex', flexDirection: 'column-reverse', width: '100vw', height: '100vh' }}>
            <div className="head">
                <div className="header">
                    <div className="header-title">
                        <div className="header-title-text">LET YOUR SUCCESS</div>
                        <div className="header-title-text">RIDE WITH US.</div>    
                    </div>
                    <Button
                        sx={{
                            color: "primary",
                            border: '2px solid',
                            borderColor: "primary",
                            borderRadius: 5,
                            padding: 3,
                            background: 'rgba(120, 120, 150, 0.33)',
                            alignSelf: 'center',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/config')}
                    >
                        <CustomText text="start" variant="h3" />
                    </Button>
                </div>
            </div>
            <CustomAppBar units={units} setUnits={setUnits} />
        </div>
    )
};

export default Header;