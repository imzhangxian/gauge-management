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

server.use('/login', login)
server.use('/api', auth)
server.use('/api/watermeters', watermeters)

// start server
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started listening on port ${port}`));
