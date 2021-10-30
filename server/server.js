require('dotenv').config()

const express = require('express')
const watermeters = require('./middlewares/watermeters.js')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send("Welcome to water meters manager!")
})

server.use('/api/watermeters', watermeters)

// start server
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started listening on port ${port}`));
