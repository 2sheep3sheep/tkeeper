
import * as React from "react";

import AllIcon from "@mui/icons-material/Menu"
import UnassignedIcon from "@mui/icons-material/Close"
import SolverIcon from "@mui/icons-material/Person"
import CompletedIcon from "@mui/icons-material/Check"

import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { useContext } from "react";
import { TaskListContext } from "../data/task-list-provider";

function CategorySelector(props) {
    

    const { selectedCategory, setSelectedCategory } = useContext(
        TaskListContext
    )

    const handleCategoryChange = (event,newCategory) => {
        if (newCategory != null) {
            setSelectedCategory(newCategory);
        }
    }

    let iconsize = "40px"
    let buttonstyle = {
        borderRadius:"80px",
        borderWidth:"0px",
        backgroundColor:"white"
    }

    return (
        <ToggleButtonGroup
            value={selectedCategory}
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
            <Tooltip title="All Tasks" arrow>
                <ToggleButton value="all"
                    sx={buttonstyle}
                >              
                    <AllIcon
                    style={{fontSize:(iconsize)}}    
                />
                </ToggleButton>
            </Tooltip>
            
            <Tooltip title="Unassigned" arrow>
                <ToggleButton value="unassigned"
                    sx={buttonstyle}
                >                  
                    <UnassignedIcon
                    style={{fontSize:(iconsize)}}    
                />
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Unsolved" arrow>
                <ToggleButton value="unsolved"
                    sx={buttonstyle}
                >                      
                    <SolverIcon
                    style={{fontSize:(iconsize)}}    
                />
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Completed" arrow>
                <ToggleButton value="completed"
                    sx={buttonstyle}
                >                    
                    <CompletedIcon
                    style={{fontSize:(iconsize)}}    
                />
                </ToggleButton>
            </Tooltip>
        </ToggleButtonGroup>
    )
}

export default CategorySelector;