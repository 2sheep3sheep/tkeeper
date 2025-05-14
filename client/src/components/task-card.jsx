import { Button, Card, CardContent, IconButton, Tooltip } from "@mui/material";
import SolverAvatar from "./solver-avatar";
import { minHeight, Stack } from "@mui/system";

import AssignIcon from "@mui/icons-material/Person"

function TaskCard(props) {

    let assignButton = (
        <Tooltip title="Assign Solver" placement="right">
            <IconButton
                sx={{
                    alignSelf:"flex-end"
                }}>
                <AssignIcon
                    sx={{
                        fontSize:"40px",
                        margin:"-10px",
                        padding:"4px",
                        color:"black",
                        backgroundColor:"#80DEDF",
                        borderRadius:"100%"
                    }}
                />
            </IconButton>
        </Tooltip>
    )

    return (
        <Card variant="outlined" width="100px">
            <CardContent>

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

                        {assignButton}

                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );

}

export default TaskCard;