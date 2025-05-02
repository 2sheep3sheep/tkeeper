const express = require('express')
const app = express()
const port = 5000

// Task methods

const taskController = require("./controller/task");
app.use("/task", taskController);






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})