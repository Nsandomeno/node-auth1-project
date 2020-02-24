const express = require('express');
// import the router
const userRouter = require('./api/usersRouter.js')
// import dbConfig object if there is an endpoint here

// create the server
const server = express()
// Global Middleware
server.use(express.json())
// Introduce your route url
server.use('/api', userRouter)
// export the server 
module.exports = server