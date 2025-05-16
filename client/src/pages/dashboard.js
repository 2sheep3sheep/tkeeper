import { Button, createTheme, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
import TaskCard from "../components/task-card";

import TaskListProvider from "../data/task-list-provider";

import { TaskListContext } from "../data/task-list-provider";
import { useContext } from "react";

import DashboardContent from "./dashboard-content";

function Dashboard() {

    const theme = createTheme(
        {
            palette: {
                cyan: {
                    main: "#000000",
                    light: "#FF0000",
                    dark: "#FF0000",
                    contrastText: "#FF0000"
                }
            }
        }
    )

    return (
        <TaskListProvider>
           <DashboardContent/>
        </TaskListProvider>
    );

}

export default Dashboard;