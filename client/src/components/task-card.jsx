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
                        margin:"-8px",
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
                        margin:"-8px",
                        padding:"4px",
                        color:"black",
                        backgroundColor:"#80DED6",
                        borderRadius:"100%"
                    }}
                />
            </IconButton>
        </Tooltip>
    )

    return (
        <Card variant="outlined" width="100px" 
            sx = {{
                borderRadius:"10px",
                borderWidth:"2px"
            }}

        >
            <CardContent>
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
                            <IconButton size="large">
                                <EditIcon fontSize="medium"/>
                            </IconButton>
                            <IconButton size="large">
                                <DeleteIcon fontSize="medium"/>
                            </IconButton>
                    </div>
                </div>

                <Stack
                    spacing={1}
                >
                    <div style={{
                        height:"100px"
                    }}>
                        <div class="task-title">Task Title</div>    
                        <div class="task-description">Task Description</div>
                    </div>
                    <Stack
                        direction="row"
                        spacing = {1}
                        sx={{
                            justifyContent:"space-between"
                        }}
                    >
                        <SolverAvatar show_name="true"/>

                        {completeButton}

                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );

}

export default TaskCard;