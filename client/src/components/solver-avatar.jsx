import { Avatar, Stack } from "@mui/material";

function SolverAvatar(props) {
    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{
                alignItems: "center",
            }}
        >
            <Avatar>A</Avatar>
            {props.show_name ? (<div class="solver-name">
                { props.solver_name ?? "Solver Name" }
            </div>) : null}
        </Stack>
    )
}

export default SolverAvatar;