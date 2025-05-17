import { Button, CircularProgress, createTheme, Modal, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
import TaskCard from "../components/task-card";
import { Grid, Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add"

import CategorySelector from "../components/category-selector";
import PageSelector from "../components/page-selector";

import { TaskListContext } from "../data/task-list-provider";
import { useContext } from "react";
import DashboardModals from "./dashboard-modals";
import { useState } from "react";
import { SolverListContext } from "../data/solver-list-provider";

function DashboardContent() {

    const solver_context = useContext( SolverListContext );
    const solver_state = solver_context.state;
    const solver_data = solver_context.data;

    const { state, data, selectedCategory, setSelectedCategory } = useContext( TaskListContext );

    const [ createModalOpen, setCreateModalOpen ] = useState(false);
    const [ assigningToTaskID, setAssigningToTaskID ] = useState(undefined);
    const [ completingTaskID, setCompletingTaskID ] = useState(undefined);

    let taskcards = [];

    console.log(solver_state)
    console.log(solver_data)

    if ( state === "ready" && (data ?? null) != null) {

        // Solver ID to solver data map 
        let solver_id_map = {}

        if ( solver_state === "ready" ) {
            if (solver_data && solver_data.solvers) {
                for (var s=0; s<solver_data.solvers.length; s++) {
                    var solver = solver_data.solvers[s]
                    solver_id_map[solver.id] = {...solver}
                }
            }
        }

        //

        data.tasks.sort( (a,b) => { 
            return new Date(a.date) > new Date(b.date) ? -1 : 1 
        } )

        for (var i=0; i< data.tasks.length; i++) {

            var taskData = data.tasks[i]

            taskcards.push( (<TaskCard
                title = {taskData.title}
                description = {taskData.description ?? ""}
                solverID = {taskData.solverID}
                solver_name = {
                    solver_id_map[taskData.solverID] ? solver_id_map[taskData.solverID].name : undefined
                }
                solver_icon = {
                    solver_id_map[taskData.solverID] ? solver_id_map[taskData.solverID].iconID : undefined
                }
                completed = {taskData.completed ?? false}
                date = { new Date(taskData.date).toLocaleDateString() }

                taskID = {taskData.id}
                assignFunction = {setAssigningToTaskID}
                completeFunction = {setCompletingTaskID}

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

                    
                    { state === "error" ? 
                        <div
                        style = {{
                            justifySelf:"center",
                            alignSelf:"center",
                            textAlign:"center"
                        }}
                        class="task-title"
                        >
                            Something went wrong...
                        </div>
                    : null }


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
                                onClick={ ()=>{ setCreateModalOpen(true) } }
                            >
                                <AddIcon style={{fontSize:"50px"}} />
                                { showCreateLabel ? (<div>Create Task</div>) : null }
                            </Button>
                    </Stack>
                </div>
            </div>

            <DashboardModals
                //Create Task
                createTaskModal={createModalOpen}
                setCreateTaskModal={setCreateModalOpen}

                //Assign Solver to Task
                assignSolverToTaskID={assigningToTaskID}
                setAssignSolverToTaskID={setAssigningToTaskID}

                //Complete task
                completingTaskID={completingTaskID}
                setCompletingTaskID={setCompletingTaskID}
            />

        </ThemeProvider>
    );

}

export default DashboardContent;