const Ajv = require("ajv");
const ajv = new Ajv();

const taskDao = require("../../dao/task-dao.js");

const schema = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        solverID: { type: "string" }
    },
    required: ["title"],
    additionalProperties: false
};

async function CreateAbl(req, res) {
    try {
        let task = req.body;

        const valid = ajv.validate(schema, task);

        // Validate input
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                task: "dtoIn is not valid",
                validationError: ajv.errors
            });
            return;  // In case of invalid input, exit function
        }

        // Store task entry into file
        try {
            task = taskDao.create(task);
        } catch (e) {
            res.status(400).json({
                ...e,
            })
        }

        res.json(task);     // Update http request response with newly created task data

    } catch (e) {
        res.status(500).json({ task: e.task});
    }
}

module.exports = CreateAbl;