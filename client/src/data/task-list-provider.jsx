import { createContext, useEffect, useState } from "react";

import FetchHelper from "../fetch-helper";

export const TaskListContext = createContext()

function TaskListProvider({children}) {

    const [selectedCategory, setSelectedCategory] = useState("all")

    const [taskListDto, setTaskListDto] = useState(
        {
            state: "ready",
            data: null,
            error: null,
        }
    )
    
    const [solverListDto, setSolverListDto] = useState(
        {
            state: "ready",
            data: null,
            error: null,
        }
    )

    async function handleLoad() {
    
        setTaskListDto(
            (current) => {
                return { ...current, data: undefined, state: "pending" };
            }
        );

        const result = await FetchHelper.task.list({category:selectedCategory});
        
        console.log(result)

        setTaskListDto(
            (current) => {
                if (result.ok) {
                    return { ...current, state:"ready", data: result.data, error:null };
                }else{
                    return { ...current, state:"error", data: result.data, error: result.data};
                }
            }
        )

    }

    // Load tasks of selected category when selected category changes
    useEffect(
        () => { handleLoad(); }, [selectedCategory]
    )

/*
    async function handleSolverLoad() {
    
        setSolverListDto(
            (current) => {
                return { ...current, data: undefined, state: "pending" };
            }
        );

        const result = await FetchHelper.solver.list({category:selectedCategory});
        
        console.log(result)

        setSolverListDto(
            (current) => {
                if (result.ok) {
                    return { ...current, state:"ready", data: result.data, error:null };
                }else{
                    return { ...current, state:"error", error: result.data};
                }
            }
        )

    }
    useEffect(
        () => { handleSolverLoad() }, []
    )*/

    const value = {
        ...taskListDto,
        selectedCategory,
        setSelectedCategory,
        handlerMap: { handleLoad },
    }

    return (
        <TaskListContext.Provider value={value}>
            {children}
        </TaskListContext.Provider>
    );
}

export default TaskListProvider;