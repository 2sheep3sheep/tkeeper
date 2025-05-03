const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/task/createAbl");
router.post("/create", CreateAbl);

const ListAbl = require("../abl/task/listAbl");
router.get("/list", ListAbl);

module.exports = router;