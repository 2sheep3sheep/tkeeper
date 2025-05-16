const solverDao = require("../../dao/solver-dao.js");

async function ListAbl(req, res) {
    try {

        let solverList = solverDao.list( );
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed

        res.json(solverList);     // Update http request response with newly created task data
    
    } catch (e) {
        res.status(500).json({});
    }
}

module.exports = ListAbl;