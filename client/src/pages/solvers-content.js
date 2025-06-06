import { Button, CardContent, createTheme, ThemeProvider, useMediaQuery, useTheme, Card, Divider, IconButton, CircularProgress } from "@mui/material";
import TaskCard from "../components/task-card";
import { fontStyle, Grid, Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add"

import * as React from "react";
import PageSelector from "../components/page-selector";
import SolverAvatar from "../components/solver-avatar";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { SolverListContext } from "../data/solver-list-provider";
import { useContext } from "react";
import SolverModals from "./solver-modals";
import { useState } from "react";


function SolversContent() {

    const { state, data } = useContext( SolverListContext );


    let solvers = [];

    if ( state === "ready" && (data ?? null) != null) {

        for (var i=0; i< data.solvers.length; i++) {

            var solverData = data.solvers[i]

            solvers.push( (<SolverAvatar 
                show_name={true}
                solverID={solverData.id}
                solver_name = {solverData.name}    
                iconID = {solverData.iconID}
                width = "50px"
                height = "50px"
                style={{
                    width:"250px"
                }}
            />) )
        }
    }

    const theme = useTheme();

    const showCreateLabel = useMediaQuery(theme.breakpoints.up("md"));

    const [ addSolverModal, setAddSolverModal ] = useState(false);

    const [ deletingSolverID, setDeletingSolverID ] = useState(undefined);

    return (
        <div>
            <div class="dashboard-content">
                
                { state === "pending" ? <CircularProgress
                    color = "cyan"
                    sx = {{
                        position:"absolute",
                        top:"50%",
                        left:"50%"
                    }}
                /> : null }
                
              <Grid container spacing={2}>
                { solvers.map( (item) => (
                    <Grid size={{ xs:12, md:12, lg:12, xl:12 }}>
                         <Card variant="outlined" 
                            sx = {{
                                width:"max-content",
                                borderRadius:"10px",
                                borderWidth:"2px",
                                padding:"0px"
                            }}
                        >
                            <CardContent sx={{marginBottom:"-5px"}}>
                                <Stack direction="row">
                                    {item}
                                    <Divider sx={{mx:4, my:0}} />
                                    { /*<IconButton size="large">
                                        <EditIcon/>
                                    </IconButton>*/ }
                                    <IconButton 
                                        size="large"
                                        onClick={ ()=>{setDeletingSolverID(item.props.solverID)} }
                                        >
                                        <DeleteIcon/>
                                    </IconButton>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ) ) }
            </Grid>
            </div>
            
            <div class="dashboard-header"> 
                <PageSelector selectedPage={1} />
            </div>
            <div class="dashboard-footer">
                <div
                    style={{
                    display:"flex",
                    justifyContent:"flex-end"
                }}>
                    <Button 
                        size="large"
                        sx={{
                            color:"black",
                            fontFamily:"monospace",
                            backgroundColor:"#80DED6",
                            borderRadius:"80px",
                            fontSize:"28px",
                            padding:"10px",
                            fontWeight:"400"
                        }}
                        onClick={
                            () => {setAddSolverModal(true)}
                        }
                    >
                        <AddIcon style={{fontSize:"50px"}} />
                        { showCreateLabel ? (<div>Add Solver</div>) : null }
                    </Button>
                </div>
            </div>
            <SolverModals
                addSolverModal={addSolverModal}
                setAddSolverModal={setAddSolverModal}

                deletingSolverID={deletingSolverID}
                setDeletingSolverID={setDeletingSolverID}
            />

        </div>
    );

}

export default SolversContent;