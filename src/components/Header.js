import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import React, { useRef, useEffect } from "react";
import CustomText from "./CustomText";
import CustomAppBar from "./CustomAppBar";
import { Button } from "@mui/material";
import { Typography } from "@material-ui/core";

const Header = ({ units, setUnits, setSolution }) => {
    const fileInputRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(fileInputRef);
        fileInputRef.current.onchange = (event) => {
            // TODO: got filepath and not blob...
            const file = event.target.value;
            debugger;
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                const solution = JSON.parse(reader.result);
                setSolution(solution);
                navigate('/view');
            }
        };
    }, [fileInputRef]);

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
                    <div style={{alignSelf: 'flex-start', display: 'flex', flexDirection: 'row'}}>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                textTransform: 'none',
                                color: "white",
                                border: '2px solid',
                                borderColor: "#42A5F5",
                                borderRadius: 5,
                                padding: 3,
                                background: '#42A5F5',
                                cursor: 'pointer',
                                margin: 1,
                            }}
                            onClick={() => navigate('/config')}
                        >
                            <CustomText text="findPacking" variant="h3" />
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                textTransform: 'none',
                                color: '#42A5F5',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                },
                                border: '2px solid',
                                borderColor: "#42A5F5",
                                borderRadius: 5,
                                padding: 3,
                                background: 'white',
                                cursor: 'pointer',
                                margin: 1,
                            }}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <CustomText text="viewSolution" variant="h3" />
                            <input ref={fileInputRef} type="file" hidden />
                        </Button>
                    </div>
                </div>
            </div>
            <CustomAppBar units={units} setUnits={setUnits} />
        </div>
    )
};

export default Header;