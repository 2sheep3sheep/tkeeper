const taskDao = require("../../dao/task-dao.js");


async function ListAbl(req, res) {
    try {
        let taskCategoryFilter = req.query;
        
        if ( 
            !taskCategoryFilter ||                              // No JSON body was given
            !taskCategoryFilter.category ||                     // No category was set
            taskCategoryFilter.category == "all" ||             // A valid category was set
            taskCategoryFilter.category == "unassigned" ||
            taskCategoryFilter.category == "unsolved" ||
            taskCategoryFilter.category == "completed" 
        ) {
            
            var filterCategory = undefined
            if (taskCategoryFilter && taskCategoryFilter.category) filterCategory = taskCategoryFilter.category;

            let taskList = taskDao.list( filterCategory );

            res.json(taskList);     // Update http request response with newly created task data        
        } else {
            res.status(400).json({
                code: "invalidCategory",
                message: `${taskCategoryFilter.category} is not a valid category (valid categories are: "all" (default), "unassigned", "unsolved", "completed")`
            });
            return;  // In case of invalid input, exit function
        }


    } catch (e) {
        res.status(500).json({ taskCategoryFilter: e.taskCategoryFilter});
    }
}

module.exports = ListAbl;