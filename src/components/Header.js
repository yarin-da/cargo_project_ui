import logo from "../images/logo.png";
import "../styles/Header.css";
import Button from "@mui/material/Button";
import React from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { t } = useTranslation();
    return (
        <div className="head">
            <div className="header-nav">
                <img src={logo} className="logo"/>
                <div className="header-nav-links">
                    <div className="nav-link">Home</div>
                    <div className="nav-link">Support</div>
                    <div className="nav-link">Products</div>
                </div>
            </div>
            <div className="text">
                <h1 className="header-title">
                    LET YOUR SUCCESS <br/>
                    RIDE WITH US.<br/>
                </h1>
                <Button
                    className="start-button"
                    component="span"
                    style={{
                        textTransform: 'none',
                        color: "black",
                        borderColor: "white",
                        marginTop: 13,
                        background: "white"
                    }}
                    variant="outlined">
                    {t("start")}
                </Button>
            </div>
        </div>
    )
};

export default Header;