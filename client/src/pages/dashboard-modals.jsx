import { Button, Card, CardContent, CircularProgress, Divider, InputLabel, MenuItem, Modal, Select, Stack, TextField } from "@mui/material";
import { useState } from "react";
import FetchHelper from "../fetch-helper";
import { useContext } from "react";
import TaskListProvider, { TaskListContext } from "../data/task-list-provider";
import { SolverListContext } from "../data/solver-list-provider";
import SolverAvatar from "../components/solver-avatar";
import TaskCard from "../components/task-card";


function DashboardModals(props) {    
    const { state, data, selectedCategory, setSelectedCategory } = useContext( TaskListContext );

    const solver_context = useContext( SolverListContext );
    const solver_data = solver_context.data;

    const [awaitingServerResponse, setAwaitingServerResponse] = useState(false);

    const [ createValidationObject, setCreateValidationObject ] = useState(
        {
            valid:true,
            title_error:undefined,
            description_error:undefined
        }
    );


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

        setCreateValidationObject( (current) => ( {
            valid:true,
            title_error:undefined,
            description_error:undefined
        }) )

        //validate client-side input
        console.log(newTaskData);
        if ( newTaskData.title.length===0 ) {
            setCreateValidationObject( (current) => ( {
                ...current,
                valid:false,
                title_error:"A title is required",
            }) )
        }
        if ( newTaskData.title.length>128 ) {
            setCreateValidationObject( (current) => ( {
                ...current,
                valid:false,
                title_error:"Maximum length is 128 characters",
            }) )
        }
        if ( newTaskData.description.length>512 ) {
            setCreateValidationObject( (current) => ( {
                ...current,
                valid:false,
                description_error:"Maximum length is 512 characters",
            }) )
        }
        
        if ( createValidationObject.valid === false ) return;

        if ( newTaskData.solverID==="undefined") newTaskData.solverID = undefined;
        if ( newTaskData.description && newTaskData.description.length===0 ) newTaskData.description=undefined;

        setAwaitingServerResponse(true)

        const result = await FetchHelper.task.create(newTaskData)

        if (result.ok) {
            props.setCreateTaskModal(false)

            var createdInCategory = "all"
            if ( !result.data.solverID ) createdInCategory = "unassigned";
            if ( result.data.solverID ) createdInCategory = "unsolved";

            setSelectedCategory(createdInCategory);
            data.tasks.push(result.data)
            setNewTaskData({
                title:"",
                description:"",
                solverID:"undefined"
            })
        }
        setAwaitingServerResponse(false)
    }

    async function assignSolver() {
        setAwaitingServerResponse(true)

        const result = await FetchHelper.task.assignSolver({taskID:props.assignSolverToTaskID, solverID:newSolver})

        if (result.ok) {
            props.setAssignSolverToTaskID(undefined)

            setSelectedCategory("unsolved")
            setNewSolver("undefined")
        }

        setAwaitingServerResponse(false)
    }

    async function completeTask() {
        setAwaitingServerResponse(true)

        const result = await FetchHelper.task.completeTask({taskID:props.completingTaskID})

        if (result.ok) {
            props.setCompletingTaskID(undefined)

            setSelectedCategory("completed");
        }

        setAwaitingServerResponse(false)
    }


    async function deleteTask() {
        setAwaitingServerResponse(true)

        const result = await FetchHelper.task.remove({taskID:props.deletingTaskID})

        if (result.ok) {
            props.setDeletingTaskID(undefined)
            window.location.reload();
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

                            <div class="task-description">Task Title</div>

                            <TextField
                                disabled={awaitingServerResponse}
                                //label="Title" 
                                variant="outlined" 
                                required 
                                style={{width:"100%", marginTop:"18px", marginBottom:"18px"}}
                                multiline
                                rows={2}

                                value={newTaskData.title}
                                onChange={
                                    (event) => {setNewTaskData(
                                        (current) => ({...current, title:event.target.value})    
                                    )}
                                }
                                error={ (createValidationObject.title_error) }
                                helperText={ createValidationObject.title_error }
                            />
                            <div class="task-description">Task Description</div>
                            <TextField
                                disabled={awaitingServerResponse}
                                //label="Description"
                                variant="outlined"
                                sx={{my:2}}
                                multiline
                                rows={4}
                                style={{width:"100%", marginTop:"18px"}}

                                value={newTaskData.description}
                                onChange={
                                    (event) => {setNewTaskData(
                                        (current) => ({...current, description:event.target.value})    
                                    )}
                                }
                                error={ (createValidationObject.description_error) }
                                helperText={ createValidationObject.description_error }
                            />
                            
                            <div class="task-description">Assigned Solver</div>
                            <Select
                                disabled={awaitingServerResponse}
                                variant="outlined" 
                                style={{width:"100%", marginTop:"18px", marginBottom:"18px"}}
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
                                                <SolverAvatar show_name solver_name={item.name} iconID={item.iconID}/>
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
                                    shrink
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
                                                    <SolverAvatar show_name solver_name={item.name} iconID={item.iconID}/>
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

             
            <Modal
                open={props.completingTaskID ? true : false}
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
                                <div class="task-title">Confirm task as Completed?</div>

                                <Divider sx={{my:2}}/>
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
                                        onClick={ () => {props.setCompletingTaskID(undefined)}}
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
                                        onClick={completeTask}
                                    > <div>Confirm</div> </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </div>
            </Modal>

              
            <Modal
                open={props.deletingTaskID ? true : false}
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
                                <div class="task-title">Delete Task?</div>

                                <Divider sx={{my:2}}/>
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
                                        onClick={ () => {props.setDeletingTaskID(undefined)}}
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
                                            backgroundColor:"#e34e49",
                                            alignSelf:"flex-end",
                                            borderRadius:"80px",
                                            fontSize:"24px",
                                            padding:"10px",
                                            paddingLeft:"20px",
                                            paddingRight:"20px",
                                            fontWeight:"400"
                                        }}
                                        onClick={deleteTask}
                                    > <div>Delete</div> </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </div>
            </Modal>
        </div>
    )
}

export default DashboardModals