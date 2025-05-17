const solverDao = require("../../dao/solver-dao.js");

async function ListAbl(req, res) {
    try {

        let solverList = solverDao.list( );
        
        res.json(solverList);     // Update http request response with newly created task data
    
    } catch (e) {
        res.status(500).json({});
    }
}

module.exports = ListAbl;