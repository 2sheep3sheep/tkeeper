const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/task/createAbl");
router.get("/create", CreateAbl);

module.exports = router;