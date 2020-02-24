const express = require('express');
// import the router

// import dbConfig object if there is an endpoint here

// create the server
const server = express()
// Global Middleware
server.use(express.json())
// Introduce your route url

// export the server 
module.exports = server