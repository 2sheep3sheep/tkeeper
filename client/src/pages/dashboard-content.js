import { Button, CircularProgress, createTheme, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
import TaskCard from "../components/task-card";
import { Grid, Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add"

import * as React from "react";

import CategorySelector from "../components/category-selector";
import PageSelector from "../components/page-selector";

import { TaskListContext } from "../data/task-list-provider";
import { useContext } from "react";

function DashboardContent() {

    const { state, data, selectedCategory, setSelectedCategory } = useContext( TaskListContext );

    let taskcards = [];

    if ( state === "ready" && (data ?? null) != null) {
        console.log(state)

        for (var i=0; i< data.tasks.length; i++) {

            var taskData = data.tasks[i]

            taskcards.push( (<TaskCard
                title = {taskData.title}
                description = {taskData.description ?? ""}
                solverID = {taskData.solverID ?? undefined}
                completed = {taskData.completed ?? false}
            />) )
        }
    }

    const theme = createTheme(
        {
            palette: {
                cyan: {
                    main: "#000000",
                    light: "#FF0000",
                    dark: "#FF0000",
                    contrastText: "#FF0000"
                }
            }
        }
    )

    const showCreateLabel = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <ThemeProvider theme={theme}>
            <div>
                <div class="dashboard-content">
                    
                    
                    { state === "pending" ? <CircularProgress
                        color = "cyan"
                        sx = {{
                            position:"absolute",
                            top:"50%",
                            left:"50%"
                        }}
                    /> : null }

                    <Grid container spacing={2}>
                        { taskcards.map( (item) => (
                            <Grid size={{ xs:12, md:6, lg:4, xl:3 }}>
                                {item}
                            </Grid>
                        ) ) }
                    </Grid>
                </div>
                
                <div class="dashboard-header"> 
                        <PageSelector selectedPage={0} />
                </div>

                <div class="dashboard-footer">
                    <Stack
                        direction="row"
                        sx={{
                            alignContent:"center",
                            justifyContent:"space-between"
                        }}
                    >
                            <CategorySelector/>

                            <Button 
                                size="large"
                                sx={{
                                    color:"black",
                                    fontFamily:"monospace",
                                    backgroundColor:"#80DED6",
                                    alignSelf:"flex-end",
                                    borderRadius:"80px",
                                    fontSize:"28px",
                                    padding:"10px",
                                    fontWeight:"400"
                                }}
                            >
                                <AddIcon style={{fontSize:"50px"}} />
                                { showCreateLabel ? (<div>Create Task</div>) : null }
                            </Button>
                    </Stack>
                </div>
            </div>
        </ThemeProvider>
    );

}

export default DashboardContent;