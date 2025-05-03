const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const taskFolderPath = path.join(__dirname, "storage", "tasks")

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

module.exports = {
    create,
    list
}