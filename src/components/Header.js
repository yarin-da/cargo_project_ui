import logo from "../images/logo.png";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import CustomText from "./CustomText";

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="head">
            <div className="header-nav">
                <img src={logo} className="logo"/>
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
                    <CustomText text="start" />
                </button>
            </div>
        </div>
    )
};

export default Header;