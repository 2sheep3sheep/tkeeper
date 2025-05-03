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

module.exports = {
    create
}