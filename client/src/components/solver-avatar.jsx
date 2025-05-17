import { Avatar, Stack } from "@mui/material";

import UndefinedIcon from "@mui/icons-material/Close"


import icon0 from "../solver-icons/solver-icon-0.jpg"
import icon1 from "../solver-icons/solver-icon-1.png"
import icon2 from "../solver-icons/solver-icon-2.png"
import icon3 from "../solver-icons/solver-icon-3.png"
import icon4 from "../solver-icons/solver-icon-4.png"
import icon5 from "../solver-icons/solver-icon-5.png"

import icon6 from "../solver-icons/solver-icon-6.png"
import icon7 from "../solver-icons/solver-icon-7.png"
import icon8 from "../solver-icons/solver-icon-8.png"
import icon9 from "../solver-icons/solver-icon-9.png"
import icon10 from "../solver-icons/solver-icon-10.png"
import icon11 from "../solver-icons/solver-icon-11.jpg"

function SolverAvatar(props) {
    const icons = [
        icon0,
        icon1,
        icon2,
        icon3,
        icon4,
        icon5,

        icon6,
        icon7,
        icon8,
        icon9,
        icon10,
        icon11
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

