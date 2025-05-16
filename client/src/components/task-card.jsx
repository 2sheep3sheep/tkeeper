import { Button, Card, CardContent, IconButton, Tooltip } from "@mui/material";
import SolverAvatar from "./solver-avatar";
import { minHeight, Stack } from "@mui/system";

import AssignIcon from "@mui/icons-material/Person"

import CompleteIcon from "@mui/icons-material/Check"

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TaskCard(props) {

    const assignButton = (
        <Tooltip title="Assign Solver" placement="left" arrow>
            <IconButton
                sx={{
                    alignSelf:"flex-end",
                    //border:"4px solid black"
                }}>
                <AssignIcon
                    sx={{
                        fontSize:"40px",
                        margin:"-12px",
                        padding:"4px",
                        color:"black",
                        backgroundColor:"#80DED6",
                        borderRadius:"100%"
                    }}
                />
            </IconButton>
        </Tooltip>
    )

    const completeButton = (
        <Tooltip title="Complete Task" placement="left" arrow>
            <IconButton
                sx={{
                    alignSelf:"flex-end",
                    //border:"4px solid black"
                }}>
                <CompleteIcon
                    sx={{
                        fontSize:"40px",
                        margin:"-12px",
                        padding:"4px",
                        color:"black",
                        backgroundColor:"#80DED6",
                        borderRadius:"100%"
                    }}
                />
            </IconButton>
        </Tooltip>
    )

    /*
        <div style={{
                position:"relative",
                margin:"0px",
                padding:"0px",
                borderWidth:"0px"
            }}
        >
            <div style={{
                position:"absolute",
                top:"-8px",
                right:"-8px",
                width:"max-content",
                padding:"0px",
                margin:"0px"
            }}>
                    <IconButton size="small">
                        <EditIcon fontSize="small"/>
                    </IconButton>
                    <IconButton size="small">
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
            </div>
        </div>
    */

    return (
        <Card variant="outlined" width="100px" 
            sx = {{
                borderRadius:"10px",
                borderWidth:"2px",
                height:"200px",
                height:"220px"
            }}

        >
            <CardContent>
                
                {null}

                <Stack
                    spacing={1}
                >
                    
                    <div style={{
                        height:"120px",
                        //marginTop:"16px"
                    }}>
                        <div class="task-title">{props.title ?? "Task Title"}</div>    
                        <div class="task-description">{props.description ?? ""}</div>
                    </div>
                    <Stack
                        direction="row"
                        spacing = {1}
                        sx={{
                            justifyContent:"space-between"
                        }}
                    >
                        { props.solverID ? (<SolverAvatar show_name="true"/>) : <div></div> }
                        {!props.solverID ? assignButton : props.completed ? null : completeButton}

                    </Stack>
                    <div class="task-date">{props.date}</div>
                </Stack>
            </CardContent>
        </Card>
        
    );

}

export default TaskCard;