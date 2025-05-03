const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const taskFolderPath = path.join(__dirname, "storage", "tasks")


// TASK GET METHOD
function get(taskID) {
    try {
        const filePath = path.join(taskFolderPath, `${taskID}.json`);

        if (fs.existsSync(filePath)) {

            const fileData = fs.readFileSync(filePath, "utf8");
            const jsonData = JSON.parse(fileData);

            return jsonData;
        } else {
            return undefined;
        }
        
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw { code: "failedToReadSolver", taskID: error.taskID };
    }
}

// TASK CREATE METHOD (POST)
function create(task) {
    try {
        let newTask = {
            ...task,
        }

        newTask.id = crypto.randomBytes(16).toString("hex");
        newTask.date = new Date().toISOString();
        
        // JS does not store undefined attributes, but for posterity, the attribute would have the value "undefined" in case no solver was set
        newTask.solverID = newTask.solverID ?? undefined;           

        const filePath = path.join(taskFolderPath, `${newTask.id}.json`);
        const fileData = JSON.stringify(newTask);

        fs.writeFileSync(filePath, fileData, "utf8");

        return newTask;
    } catch (error) {
        throw { code: "failedToCreateTask", task: error.newTask };
    }
}

// LIST ALL TASKS (with type filter) 
function list( taskCategory="all" ) {
    try {
        const files = fs.readdirSync(taskFolderPath);

        let taskList = { tasks: [] };

        for ( fileName of files ) {
            var taskData = JSON.parse( fs.readFileSync( path.join( taskFolderPath, fileName) ) );
            if (
                ( taskCategory == "all" ) ||
                ( taskCategory == "unassigned" && !taskData.solverID ) ||
                ( taskCategory == "unsolved"   &&  taskData.solverID  && !taskData.completed) ||
                ( taskCategory == "completed"  &&  taskData.solverID  &&  taskData.completed) 
            ) {
                taskList.tasks.push( taskData )
            }
        }

        return taskList;

    } catch (error) {
        console.log(error)
    throw { code: "failedToListTasks" };
    }
}

// ASSIGN SOLVER TO TASK
function setSolverID(taskID,solverID) {
    try {
        let task = get(taskID);

        task.solverID = solverID;

        const filePath = path.join(taskFolderPath, `${task.id}.json`);
        const fileData = JSON.stringify(task);

        fs.writeFileSync(filePath, fileData, "utf8");

        return task;
    } catch (error) {
        throw { code: "failedToAssignSolverToTask", task: error.task };
    }
}

module.exports = {
    create,
    list,
    get,
    setSolverID
}