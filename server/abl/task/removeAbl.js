const Ajv = require("ajv");
const ajv = new Ajv();

const taskDao = require("../../dao/task-dao.js");

const schema = {
    type: "object",
    properties: {
        taskID: { type: "string"}
    },
    required: ["taskID"],
    additionalProperties: false
};

async function RemoveAbl(req, res) {
    try {
        let completeRequest = req.body;

          const valid = ajv.validate(schema, completeRequest);

        // Validate input
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                task: "dtoIn is not valid",
                validationError: ajv.errors
            });
            return;  // In case of invalid input, exit function
        }
        
        // Validate task exist
        if (completeRequest.taskID) {
            const task = taskDao.get(completeRequest.taskID);

            if (!task) {     
                res.status(400).json({
                    code: "taskDoesNotExist",
                    message: `task with id ${completeRequest.taskID} does not exist`
                });
                return;
            }
        }


        try {
            completeRequest = taskDao.remove(completeRequest.taskID)        
        } catch (e) {
            res.status(400).json({
                ...e,
            })
        }

        res.json(completeRequest);     // Update http request response with newly created task data

    } catch (e) {
        res.status(500).json({ task: e.task});
    }
}

module.exports = RemoveAbl;