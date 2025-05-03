const Ajv = require("ajv");
const ajv = new Ajv();

const taskDao = require("../../dao/task-dao.js");
const solverDao = require("../../dao/solver-dao.js");

const schema = {
    type: "object",
    properties: {
        taskID: { type: "string"},
        solverID: { type: "string" }
    },
    required: ["taskID"],
    additionalProperties: false
};

async function AssignSolverAbl(req, res) {
    try {
        let assignRequest = req.body;

        const valid = ajv.validate(schema, assignRequest);

        // Validate input
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                task: "dtoIn is not valid",
                validationError: ajv.errors
            });
            return;  // In case of invalid input, exit function
        }
        
        // Validate solver and task exist
        
        if (assignRequest.taskID) {
            const task = taskDao.get(assignRequest.taskID);

            if (!task) {     
                res.status(400).json({
                    code: "taskDoesNotExist",
                    message: `task with id ${assignRequest.taskID} does not exist`
                });
                return;
            }
        }

        if (assignRequest.solverID) {
            const solver = solverDao.get(assignRequest.solverID);

            if (!solver) {     
                res.status(400).json({
                    code: "solverDoesNotExist",
                    message: `solver with id ${assignRequest.solverID} does not exist`
                });
                return;
            }
        }


        try {
            assignRequest = taskDao.setSolverID(assignRequest.taskID,assignRequest.solverID)        
        } catch (e) {
            res.status(400).json({
                ...e,
            })
        }

        res.json(assignRequest);     // Update http request response with newly created task data

    } catch (e) {
        res.status(500).json({ task: e.task});
    }
}

module.exports = AssignSolverAbl;