import SolverListProvider from "../data/solver-list-provider";
import SolversContent from "./solvers-content";


function Solvers() {

    return (
        <SolverListProvider>
            <SolversContent/>
        </SolverListProvider>
    );

}

export default Solvers;