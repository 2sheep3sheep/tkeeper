const express = require('express')
const app = express()
const port = 5000


app.use(express.json());

// Task methods
const taskController = require("./controller/task");
app.use("/task", taskController);


// Solver methods
const solverController = require("./controller/solver");
app.use("/solver", solverController);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})