import { Avatar, Button, Card, CardContent, CircularProgress, Divider, Grid, InputLabel, MenuItem, Modal, Select, Stack, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import FetchHelper from "../fetch-helper";
import { useContext } from "react";
import { TaskListContext } from "../data/task-list-provider";
import { SolverListContext } from "../data/solver-list-provider";
import SolverAvatar from "../components/solver-avatar";
import TaskCard from "../components/task-card";


function SolverModals(props) {    
    const { state, data } = useContext( SolverListContext );

    const [awaitingServerResponse, setAwaitingServerResponse] = useState(false);
    /*
    let solvers = [];

    if ( (solver_data ?? null) != null) {
        solvers = solver_data.solvers    
    }/*/

    const [ newSolverData, setNewSolverData ] = useState(
        {
            name:"",
            iconID:"0"
        }
    )

    let iconSelection = []
    for (var i=0; i<12; i++) {
        iconSelection.push( String(i) )
    }

    async function createSolver() {

        //validate client-side input
        newSolverData.iconID = Number(newSolverData.iconID)
        console.log(newSolverData);

        setAwaitingServerResponse(true)

        const result = await FetchHelper.solver.create(newSolverData)

        if (result.ok) {
            props.setAddSolverModal(false)

            data.solvers.push(result.data)
        }
        setAwaitingServerResponse(false)
    }



    async function deleteSolver() {
        setAwaitingServerResponse(true)

        const result = await FetchHelper.solver.remove({solverID:props.deletingSolverID})

        if (result.ok) {

            var deletedSolverIndex = data.solvers.findIndex( (item) => ( item.id === props.deletingSolverID ) );
            if (deletedSolverIndex != -1) {
                data.solvers.splice( deletedSolverIndex, 1 )
            }


            props.setDeletingSolverID(undefined)
            //window.location.reload();
        }

        setAwaitingServerResponse(false)
    }

    return (
        <div>
            <Modal
                open={props.addSolverModal}
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
                            <div class="task-title">Add New Solver</div>
                            <Divider sx={{my:2}}/>
                            
                            <div class="task-description">Name</div>

                            <TextField
                                disabled={awaitingServerResponse}
                                //label="Name" 
                                variant="outlined" 
                                required 
                                style={{width:"100%", marginTop:"18px", marginBottom:"18px"}}

                                value={newSolverData.name}
                                onChange={
                                    (event) => {setNewSolverData(
                                        (current) => ({...current, name:event.target.value})    
                                    )}
                                }
                                //error={false}
                                //helperText="A title is required"
                            />
                            
                            
                            { /*<Select
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
                            </Select>*/ }
                            <div class="task-description">Choose Icon</div>
                            <Divider sx={{my:2}}/>

                            <ToggleButtonGroup
                                style={{width:"100%", marginBottom:"18px"}}
                                value={newSolverData.iconID}
                                exclusive
                                
                                onChange={
                                    (event,newValue) => { if (newValue!=null) {setNewSolverData(
                                        (current) => ({...current, iconID:newValue})    
                                    )}}
                                }


                            >
                                <Grid container spacing={0.5} sx={{width:"100%", justifyContent:"space-between"}}>
                                    { iconSelection.map( (item) => (
                                        <Grid size={{ xs:3 }}>
                                            <ToggleButton
                                                value={item}
                                                style={{
                                                    width:"100%",
                                                    height:"100%",
                                                    border:"0px"
                                                }}
                                            >
                                                <SolverAvatar
                                                    width="60px"
                                                    height="60px"
                                                    iconID={item}
                                                />
                                            </ToggleButton>
                                        </Grid>
                                    ) ) }
                                </Grid>
                            </ToggleButtonGroup>

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
                                    onClick={ () => {props.setAddSolverModal(false)}}
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
                                    onClick={createSolver}
                                > <div>Add Solver</div> </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </div>
            </Modal>
  
            <Modal
                open={props.deletingSolverID ? true : false}
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
                                <div class="task-title">Delete Solver?</div>

                                <div class="task-description">Tasks assigned to this solver will not be deleted and cannot be reassigned</div>
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
                                        onClick={ () => {props.setDeletingSolverID(undefined)}}
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
                                        onClick={deleteSolver}
                                    > <div>Delete</div> </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </div>
            </Modal>
        </div>
    )
}

export default SolverModals