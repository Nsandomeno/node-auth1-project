// import express
const express = require('express');
// create the router
const router = express.Router()
// import routers
const userRouter = require('../users/usersRouter.js')
const authRouter = require('../auth/authRouter.js')
// import bcrypt
const bcrypt = require('bcryptjs')
// import middleware
const restricted = require('../auth/restrict-middleware.js');
// introudce middleware to router
// - auth
router.use('/auth', authRouter)
// - users (or something else)
router.use('/users', restricted, userRouter) // Authentication middleware should go here!
// remember, the full url now is /api/users since this is based on top of the API Router
// begin the endpoints

// export router to server
module.exports = router