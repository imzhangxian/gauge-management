require('dotenv').config()

const express = require('express')
const server = express()
server.use(express.json())

server.get('/', (req, res) => {
    res.send("Welcome to water meters manager!")
})

const login = require('./routers/login.js')
const auth = require('./middlewares/auth.js')
const watermeters = require('./routers/watermeters.js')
const readings = require('./routers/readings')
const workorders = require('./routers/workorders')
const tasks = require('./routers/tasks')

server.use('/login', login)
server.use('/api', auth)
server.use('/api/watermeters', watermeters)
server.use('/api/readings', readings)
server.use('/api/workorders', workorders)
server.use('/api/tasks', tasks)

// start server
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started listening on port ${port}`));
