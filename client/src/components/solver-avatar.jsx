import { Avatar, Stack } from "@mui/material";

import UndefinedIcon from "@mui/icons-material/Close"


import icon0 from "../solver-icons/solver-icon-0.jpg"
import icon1 from "../solver-icons/solver-icon-1.jpg"
import icon2 from "../solver-icons/solver-icon-2.png"

function SolverAvatar(props) {
    const icons = [
        icon0,
        icon1,
        icon2
    ]

    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{
                alignItems: "center",
            }}
            style={props.style}
        >
            {
                props.undefined_solver ? 
                <Avatar sx={{
                    bgcolor:"#BBBBBB"
                }}>
                    <UndefinedIcon fontSize="medium" style={{color:"#FFFFFF"}}/>
                </Avatar>
                :
                <Avatar 
                    src={icons[ (props.iconID ?? 0)%icons.length ]}
                    sx={{ 
                    bgcolor:"#ff00aa",
                    width:(props.width),
                    height:(props.height)
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

