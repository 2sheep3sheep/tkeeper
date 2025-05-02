
const taskDao = require("../../dao/task-dao.js");

async function CreateAbl(req, res) {

    res.status(400).json(
        {
            message: "Hello :>"
        }
    )

}

module.exports = CreateAbl;