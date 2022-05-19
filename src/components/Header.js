import logo from "../images/logo.png";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
    const navigate = useNavigate();
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
            <div className="header">
                <div className="header-title">
                    <div className="header-title-text">LET YOUR SUCCESS</div>
                    <div className="header-title-text">RIDE WITH US.</div>    
                </div>
                <button
                    className="start-button"
                    onClick={() => navigate('/config')}
                >
                    {t("start")}
                </button>
            </div>
        </div>
    )
};

export default Header;