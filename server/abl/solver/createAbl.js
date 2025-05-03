const Ajv = require("ajv");
const ajv = new Ajv();

const solverDao = require("../../dao/solver-dao.js");

const schema = {
    type: "object",
    properties: {
        name: { type: "string", maxLength: 32 },
        iconID: { type: "number" }
    },
    required: ["name"],
    additionalProperties: false
};

async function CreateAbl(req, res) {
    try {
        let solver = req.body;

        const valid = ajv.validate(schema, solver);

        // Validate input
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                solver: "dtoIn is not valid",
                validationError: ajv.errors
            });
            return;  // In case of invalid input, exit function
        }

        // Store solver entry into file
        try {
            solver = solverDao.create(solver);
        } catch (e) {
            res.status(400).json({
                ...e,
            })
        }

        res.json(solver);     // Update http request response with newly created solver data

    } catch (e) {
        res.status(500).json({ solver: e.solver});
    }
}

module.exports = CreateAbl;