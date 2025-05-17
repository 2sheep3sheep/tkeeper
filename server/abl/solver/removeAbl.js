const Ajv = require("ajv");
const ajv = new Ajv();

const solverDao = require("../../dao/solver-dao.js");

const schema = {
    type: "object",
    properties: {
        solverID: { type: "string"}
    },
    required: ["solverID"],
    additionalProperties: false
};

async function RemoveAbl(req, res) {
    try {
        let deleteRequest = req.body;

          const valid = ajv.validate(schema, deleteRequest);

        // Validate input
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                task: "dtoIn is not valid",
                validationError: ajv.errors
            });
            return;  // In case of invalid input, exit function
        }
        
        // Validate solver exists
        if (deleteRequest.solverID) {
            const solver = solverDao.get(deleteRequest.solverID);

            if (!solver) {     
                res.status(400).json({
                    code: "solverDoesNotExist",
                    message: `solver with id ${deleteRequest.solverID} does not exist`
                });
                return;
            }
        }


        try {
            deleteRequest = solverDao.remove(deleteRequest.solverID)        
        } catch (e) {
            res.status(400).json({
                ...e,
            })
        }

        res.json(deleteRequest);     // Update http request response with newly created task data

    } catch (e) {
        res.status(500).json({ solver: e.solver});
    }
}

module.exports = RemoveAbl;