import { Avatar, Stack } from "@mui/material";

import UndefinedIcon from "@mui/icons-material/Close"

function SolverAvatar(props) {
    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{
                alignItems: "center",
            }}
        >
            {
                props.undefined_solver ? 
                <Avatar sx={{
                    bgcolor:"#BBBBBB"
                }}>
                    <UndefinedIcon fontSize="medium" style={{color:"#FFFFFF"}}/>
                </Avatar>
                :
                <Avatar sx={{ 
                    bgcolor:"#ff00aa"
                }}>
                    { props.solver_name ? props.solver_name.split("")[0] : null }
                </Avatar>
            }
            {props.show_name ? (<div class="solver-name">
                { props.solver_name ?? "Solver Name" }
            </div>) : null}
        </Stack>
    )
}

export default SolverAvatar;

