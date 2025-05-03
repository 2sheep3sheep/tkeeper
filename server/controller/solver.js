const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/solver/createAbl");
router.post("/create", CreateAbl);

const ListAbl = require("../abl/solver/listAbl");
router.get("/list", ListAbl);

/*
router.get("/", (req,res) => {
    res.status(200).json(
        {
            message: "ahoj"
        }
    )
} )
*/

module.exports = router;