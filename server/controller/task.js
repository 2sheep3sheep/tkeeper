const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/task/createAbl");
router.post("/create", CreateAbl);

const ListAbl = require("../abl/task/listAbl");
router.get("/list", ListAbl);


const AssignSolverAbl = require("../abl/task/assignSolverAbl");
router.post("/assignSolver", AssignSolverAbl);


const MarkAsCompletedAbl = require("../abl/task/markAsCompletedAbl");
router.post("/markAsCompleted", MarkAsCompletedAbl);

const RemoveAbl = require("../abl/task/removeAbl");
router.post("/delete", RemoveAbl);




module.exports = router;