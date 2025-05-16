import { createContext, useEffect, useState } from "react";

import FetchHelper from "../fetch-helper";

export const SolverListContext = createContext()

function SolverListProvider({children}) {

    const [solverListDto, setSolverListDto] = useState(
        {
            state: "ready",
            data: null,
            error: null,
        }
    )

    

    async function handleLoad() {
    
        setSolverListDto(
            (current) => {
                return { ...current, data: undefined, state: "pending" };
            }
        );

        const result = await FetchHelper.solver.list();
    

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
        () => { handleLoad(); }, []
    )

    const value = {
        ...solverListDto,
        handlerMap: { handleLoad }
    }

    return (
        <SolverListContext.Provider value={value}>
            {children}
        </SolverListContext.Provider>
    );
}

export default SolverListProvider;