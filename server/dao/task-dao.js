const fs = reqiuire("fs");
const path = require("path");
const crypto = require("crypto");

const taskFolderPath = path.join(__dirname, "storage", "tasks")

function create(task) {
    
    task.id = crypto.randomBytes(16).toString("hex");

    const filePath = path.join(taskFolderPath, `${task.id}.json`);
    const fileData = JSON.stringify(task);

    fs.writeFileSync(filePath, fileData, "utf8");

    return task;
}