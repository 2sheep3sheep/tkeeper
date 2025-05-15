import { Button, ButtonGroup, Divider } from "@mui/material";
import { useState } from "react";
import { redirect, useNavigate, useResolvedPath } from "react-router-dom";


function PageSelector(props) {

    const navigate = useNavigate()

    const navigateToDashboard = () => {
        navigate("/")
    }
    const navigateToSolvers = () => {
        navigate("/solvers")
    }

    const unselectedStyle = {
        fontFamily:"monospace",
        fontWeight:"600",
        fontSize:"24px",
        color:"black",
        padding:"5px",
        borderWidth:"0px"
    };
    const selectedStyle = {
        ...unselectedStyle,
        opacity:"30%",
        backgroundColor:"transparent"
    };


    return (
        <ButtonGroup
            style={{
                padding:"0px",
                border:"0px",
                margin:"0px"
            }}
        >
            <Button onClick={navigateToDashboard}
                style={( props.selectedPage === 0 ? unselectedStyle : selectedStyle)}
            > Dashboard </Button>
            <Divider orientation="vertical">|</Divider>
            <Button onClick={navigateToSolvers}
                style={( props.selectedPage === 1 ? unselectedStyle : selectedStyle)}
            > Solvers </Button>
        </ButtonGroup>
    )

}

export default PageSelector;