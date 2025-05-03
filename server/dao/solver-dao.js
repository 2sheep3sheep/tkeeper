const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const solverFolderPath = path.join(__dirname, "storage", "solvers")


// SOLVER GET METHOD
function get(solverID) {
    try {
        const filePath = path.join(solverFolderPath, `${solverID}.json`);

        if (fs.existsSync(filePath)) {

            const fileData = fs.readFileSync(filePath, "utf8");
            const jsonData = JSON.parse(fileData);

            console.log(jsonData);

            return jsonData;
        } else {
            return undefined;
        }
        
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw { code: "failedToReadSolver", solverID: error.solverID };
    }
}



// SOLVER CREATE METHOD (POST)
function create(solver) {
    try {
        let newSolver = {
            ...solver,
        }

        newSolver.id = crypto.randomBytes(16).toString("hex");         

        const filePath = path.join(solverFolderPath, `${newSolver.id}.json`);
        const fileData = JSON.stringify(newSolver);

        fs.writeFileSync(filePath, fileData, "utf8");

        return newSolver;
    } catch (error) {
        throw { code: "failedToCreateSolver", solver: error.newSolver };
    }
}

module.exports = {
    create,
    get
}