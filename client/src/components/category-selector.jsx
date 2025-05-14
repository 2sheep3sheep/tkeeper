
import * as React from "react";

import AllIcon from "@mui/icons-material/Menu"
import UnassignedIcon from "@mui/icons-material/Close"
import SolverIcon from "@mui/icons-material/Person"
import CompletedIcon from "@mui/icons-material/Check"

import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function CategorySelector(props) {
    
    const [category, setCategory] = React.useState("all");

    const handleCategoryChange = (event,newCategory) => {
        setCategory(newCategory);
    }

    let iconsize = "40px"
    let buttonstyle = {
        borderRadius:"80px",
        borderWidth:"0px",
        backgroundColor:"white"
    }

    return (
        <ToggleButtonGroup
            value={category}
            exclusive
            onChange={handleCategoryChange}
            size="large"
            color="cyan"
            sx={{
                color:"black",
                fontFamily:"monospace",
                backgroundColor:"#80DED6",
                alignSelf:"flex-start",
                borderRadius:"80px",
                fontSize:"48px",
                fontWeight:"400",
                padding:"-10px"
            }}
        >
            <ToggleButton value="all"
                sx={buttonstyle}
            >              
                <AllIcon
                style={{fontSize:(iconsize)}}    
            />
            </ToggleButton>
            <ToggleButton value="unassigned"
                sx={buttonstyle}
            >                  
                <UnassignedIcon
                style={{fontSize:(iconsize)}}    
            />
            </ToggleButton>
            <ToggleButton value="unsolved"
                sx={buttonstyle}
            >                      
                <SolverIcon
                style={{fontSize:(iconsize)}}    
            />
            </ToggleButton>
            <ToggleButton value="completed"
                sx={buttonstyle}
            >                    
                <CompletedIcon
                style={{fontSize:(iconsize)}}    
            />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default CategorySelector;