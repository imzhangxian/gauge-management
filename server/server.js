require('dotenv').config()

const express = require('express')
const server = express()
server.use(express.json())

const path = require('path');

const login = require('./routers/login.js')
const auth = require('./middlewares/auth.js')
const watermeters = require('./routers/watermeters.js')
const readings = require('./routers/readings')
const workorders = require('./routers/workorders')
const tasks = require('./routers/tasks')
const searchrouter = require('./routers/search')

server.use('/login', login)
server.use('/api', auth)
server.use('/api/watermeters', watermeters)
server.use('/api/readings', readings)
server.use('/api/workorders', workorders)
server.use('/api/tasks', tasks)
server.use('/api/search', searchrouter)

if (process.env.NODE_ENV === 'production') {
    server.use(express.static('meter-app/build'));
    server.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'meter-app', 'build', 'index.html'));
    });
}  

// start server
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started listening on port ${port}`));
