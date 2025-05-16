import { Button, Card, CardContent, CircularProgress, Divider, InputLabel, MenuItem, Modal, Select, Stack, TextField } from "@mui/material";
import { useState } from "react";
import FetchHelper from "../fetch-helper";
import { useContext } from "react";
import { TaskListContext } from "../data/task-list-provider";
import { SolverListContext } from "../data/solver-list-provider";
import SolverAvatar from "../components/solver-avatar";


function DashboardModals(props) {    
    const { state, data, selectedCategory, setSelectedCategory, solver_data } = useContext( TaskListContext );

    const [awaitingServerResponse, setAwaitingServerResponse] = useState(false);

    let solvers = [];

    if ( (solver_data ?? null) != null) {
        solvers = solver_data.solvers    
    }

    const [ newTaskData, setNewTaskData ] = useState(
        {
            title:"",
            description:"",
            solverID:"undefined"
        }
    )

    const [ newSolver, setNewSolver ] = useState("undefined")

    async function createTask() {

        //validate client-side input
        console.log(newTaskData);
        if ( newTaskData.title.length===0 ) return;
        if ( newTaskData.solverID==="undefined") newTaskData.solverID = undefined;
        if ( newTaskData.description && newTaskData.description.length===0 ) newTaskData.description=undefined;

        setAwaitingServerResponse(true)

        const result = await FetchHelper.task.create(newTaskData)

        if (result.ok) {
            props.setCreateTaskModal(false)

            var createdInCategory = "all"
            if ( !result.data.solverID ) createdInCategory = "unassigned";
            if ( result.data.solverID ) createdInCategory = "unsolved";

            setSelectedCategory(createdInCategory)
            data.tasks.push(result.data)
        }
        setAwaitingServerResponse(false)
    }

    async function assignSolver() {
        setAwaitingServerResponse(true)

        const result = await FetchHelper.task.assignSolver({taskID:props.assignSolverToTaskID, solverID:newSolver})

        if (result.ok) {
            props.setAssignSolverToTaskID(undefined)

            setSelectedCategory("unsolved")
        }
        
        setAwaitingServerResponse(false)
    }

    return (
        <div>
            <Modal
                open={props.createTaskModal}
            >
                <div
                    style = {{
                        width:"100%",
                        height:"100%",
                        justifyContent:"center",
                        alignContent:"center"
                    }}
                >
                    <Card variant="outlined"
                        sx = {{
                            borderRadius:"10px",
                            borderWidth:"2px",
                            width:"400px",
                            justifySelf:"center",
                        }}

                    >
                        <CardContent>
                            <div class="task-title">Create New Task</div>
                            <Divider sx={{my:2}}/>
                            <TextField
                                disabled={awaitingServerResponse}
                                label="Title" 
                                variant="outlined" 
                                required 
                                style={{width:"100%"}}
                                multiline
                                rows={2}

                                value={newTaskData.title}
                                onChange={
                                    (event) => {setNewTaskData(
                                        (current) => ({...current, title:event.target.value})    
                                    )}
                                }
                                //error={false}
                                //helperText="A title is required"
                            />
                            <TextField
                                disabled={awaitingServerResponse}
                                label="Description"
                                variant="outlined"
                                sx={{my:2}}
                                multiline
                                rows={4}
                                style={{width:"100%"}}

                                value={newTaskData.description}
                                onChange={
                                    (event) => {setNewTaskData(
                                        (current) => ({...current, description:event.target.value})    
                                    )}
                                }
                            />
                            
                            <Select
                                disabled={awaitingServerResponse}
                                variant="outlined" 
                                style={{width:"100%", marginBottom:"18px"}}
                                //error={false}
                                //helperText="A title is required"
                                value={newTaskData.solverID}
                                onChange={
                                    (event) => {setNewTaskData(
                                        (current) => ({...current, solverID:event.target.value})    
                                    )}
                                }
                            >
                                <MenuItem value="undefined">
                                    <SolverAvatar show_name solver_name="Unassigned" undefined_solver/>
                                </MenuItem>
                                {
                                    solvers.map(
                                        (item) => (
                                            <MenuItem value={item.id}>
                                                <SolverAvatar show_name solver_name={item.name}/>
                                            </MenuItem>
                                        )
                                    )
                                }
                            </Select>

                            <Stack
                                direction="row"
                                sx={{
                                    justifyContent:"space-between"
                                }}
                            >
                                <Button
                                    disabled={awaitingServerResponse}
                                    size="large"
                                    sx={{
                                        color:"black",
                                        fontFamily:"monospace",
                                        backgroundColor:"#CCCCCC",
                                        alignSelf:"flex-end",
                                        borderRadius:"80px",
                                        fontSize:"24px",
                                        padding:"10px",
                                        paddingLeft:"20px",
                                        paddingRight:"20px",
                                        fontWeight:"400"
                                    }}
                                    onClick={ () => {props.setCreateTaskModal(false)}}
                                > <div>Cancel</div> </Button>

                                { awaitingServerResponse ? <CircularProgress
                                    color = "cyan"
                                    sx={{
                                        my:1.5
                                    }}
                                    style={{
                                        padding:"0px",
                                    }}
                                /> : null }
                                
                                <Button
                                    disabled={awaitingServerResponse}
                                    size="large"
                                    sx={{
                                        color:"black",
                                        fontFamily:"monospace",
                                        backgroundColor:"#80DED6",
                                        alignSelf:"flex-end",
                                        borderRadius:"80px",
                                        fontSize:"24px",
                                        padding:"10px",
                                        paddingLeft:"20px",
                                        paddingRight:"20px",
                                        fontWeight:"400"
                                    }}
                                    onClick={createTask}
                                > <div>Create</div> </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </div>
            </Modal>

            
            <Modal
                open={props.assignSolverToTaskID ? true : false}
            >
                <div style = {{
                        width:"100%",
                        height:"100%",
                        justifyContent:"center",
                        alignContent:"center"
                    }}
                    >
                    <Card variant="outlined"
                            sx = {{
                                borderRadius:"10px",
                                borderWidth:"2px",
                                width:"400px",
                                justifySelf:"center",
                            }}

                        >
                            <CardContent>
                                <div class="task-title">Assign Solver</div>
                                <Divider sx={{my:2}}/>
                            
                                <Select
                                    disabled={awaitingServerResponse}
                                    variant="outlined" 
                                    style={{width:"100%", marginBottom:"18px"}}
                                    //error={false}
                                    //helperText="A title is required"
                                    value={newSolver}
                                    onChange={ (event) => {setNewSolver(event.target.value)} }
                                >
                                    <MenuItem value="undefined">
                                        <SolverAvatar show_name solver_name="Unassigned" undefined_solver/>
                                    </MenuItem>
                                    {
                                        solvers.map(
                                            (item) => (
                                                <MenuItem value={item.id}>
                                                    <SolverAvatar show_name solver_name={item.name}/>
                                                </MenuItem>
                                            )
                                        )
                                    }
                                </Select>

                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent:"space-between"
                                    }}
                                >
                                    <Button
                                        disabled={awaitingServerResponse}
                                        size="large"
                                        sx={{
                                            color:"black",
                                            fontFamily:"monospace",
                                            backgroundColor:"#CCCCCC",
                                            alignSelf:"flex-end",
                                            borderRadius:"80px",
                                            fontSize:"24px",
                                            padding:"10px",
                                            paddingLeft:"20px",
                                            paddingRight:"20px",
                                            fontWeight:"400"
                                        }}
                                        onClick={ () => {props.setAssignSolverToTaskID(undefined)}}
                                    > <div>Cancel</div> </Button>

                                    { awaitingServerResponse ? <CircularProgress
                                        color = "cyan"
                                        sx={{
                                            my:1.5
                                        }}
                                        style={{
                                            padding:"0px",
                                        }}
                                    /> : null }
                                    
                                    <Button
                                        disabled={awaitingServerResponse}
                                        size="large"
                                        sx={{
                                            color:"black",
                                            fontFamily:"monospace",
                                            backgroundColor:"#80DED6",
                                            alignSelf:"flex-end",
                                            borderRadius:"80px",
                                            fontSize:"24px",
                                            padding:"10px",
                                            paddingLeft:"20px",
                                            paddingRight:"20px",
                                            fontWeight:"400"
                                        }}
                                        onClick={assignSolver}
                                    > <div>Assign</div> </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </div>
            </Modal>
        </div>
    )
}

export default DashboardModals