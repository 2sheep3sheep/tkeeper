import { Button, Card, CardContent, Divider, Modal, Stack, TextField } from "@mui/material";
import { useState } from "react";
import FetchHelper from "../fetch-helper";
import { useContext } from "react";
import { TaskListContext } from "../data/task-list-provider";


function DashboardModals(props) {    
    const { state, data, selectedCategory, setSelectedCategory } = useContext( TaskListContext );

    function handleClose() {

    }

    const [ newTaskTitle, setNewTaskTitle ] = useState("")
    const [ newTaskDescription, setNewTaskDescription ] = useState("")



    function updateTaskTitle(event) {
        setNewTaskTitle(event.target.value)
    }

    function updateTaskDescription(event) {
        setNewTaskDescription(event.target.value)
    }

    async function createTask() {

        const newTaskData = {
            title: newTaskTitle,
            description: newTaskDescription
        }

        //validate client-side input
        console.log(newTaskData);
        if ( newTaskData.title.length===0 ) return;
        if ( newTaskData.description && newTaskData.description.length===0 ) newTaskData.description=undefined;

        const result = await FetchHelper.task.create(newTaskData)

        if (result.ok) {
            props.setCreateTaskModal(false)
            data.tasks.push(result.data)
        }
    }


    return (
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
                            <TextField id="outlined-basic" 
                                label="Title" 
                                variant="outlined" 
                                required 
                                style={{width:"100%"}}
                                multiline
                                rows={2}

                                value={newTaskTitle}
                                onChange={updateTaskTitle}
                            />
                            <TextField id="outlined-basic"
                                label="Description"
                                variant="outlined"
                                sx={{my:2}}
                                multiline
                                rows={4}
                                style={{width:"100%"}}

                                value={newTaskDescription}
                                onChange={updateTaskDescription}
                            />

                            <Stack
                                direction="row"
                                sx={{
                                    justifyContent:"space-between"
                                }}
                            >
                                <Button
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

                                <Button
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
    )
}

export default DashboardModals