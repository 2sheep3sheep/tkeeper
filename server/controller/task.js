const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/task/createAbl");
router.post("/create", CreateAbl);

const ListAbl = require("../abl/task/listAbl");
router.get("/list", ListAbl);


const AssignSolverAbl = require("../abl/task/assignSolverAbl");
router.post("/assignSolver", AssignSolverAbl);


module.exports = router;