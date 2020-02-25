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
// import express-session
const session = require('express-session');
// create the knexStore - this must be done after the session is brought in
const knexStore = require('connect-session-knex')(session)
// bring in the dbConfig object from the data folder
const knex = require('../data/dbConfig.js') // needed to store the database
// introudce middleware to router
const sessionConfig = {
    name: 'project',
    secret: 'keep it secret, keep it secure',
    resave: false,
    saveUninitialized: true, // this needs to be dynamic of default(false) in production
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false, // true would indicate that it only works on HTTPs
        httpOnly: true // true means that JavaScript cannot touch the cookie
    },
    // ADD THE knexStore object !!
    store: new knexStore({
        knex,
        tablename: 'sessions',
        createtable: true,
        sidfieldname: 'sid',
        clearInterval: 1000 * 60 * 15
    })
}

router.use(session(sessionConfig)) // this generates the req.session object
// - auth
router.use('/auth', authRouter)
// - users (or something else)
router.use('/restricted/users', restricted, userRouter) // Authentication middleware should go here!
// remember, the full url now is /api/users since this is based on top of the API Router
// begin the endpoints

// export router to server
module.exports = router