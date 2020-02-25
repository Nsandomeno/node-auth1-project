// import express
const express = require('express');
// create the router
const router = express.Router()
// - Notify the API Router of the new router
// Bring in the database
const Users = require('../users/usersModel.js');
// bring in bcrypt
const bcrypt = require('bcryptjs');

// create the endpoints:
// - REGISTER - (1)
router.post('/register', (req, res) => {
    // find the user info
    let user = req.body;
    // hash the user password
    const hash = bcrypt.hashSync(user.password, 8)
    // set the user password to the hash before saved to the databse
    user.password = hash
    // helper method
    Users.add(user)
        .then((newUser) => {
            res.status(201).json({message:"Registered!"})
            // DONT MAKE THE USER LOGIN AGAIN AFTER REGISTRATION
            req.session.loggedIn = true
        })
        .catch((error) => {
            res.status(500).json({ message:"Error" })
        })
})
// - LOGIN - (2)
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then((user) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                // SET SESSION VARIABLES
                req.session.loggedIn = true;
                req.session.username = user.username;
                
                console.log("First - req.session.loggedIn; Second - req.session.username:", req.session.loggedIn, req.session.username)

                res.status(200).json({ message:"Logged In" })
            } else {
                res.status(401).json({ message:'Invalid credentials' })
            }
        })
        .catch((error) => {
            res.status(500).json(error)
        })
})

// LOGOUT - (3)
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((error) => {
            if (error) {
                res.status(500).json({ message:"You are unable to logout right now." })
            } else {
                res.status(200).json({ message:"You have loggedout successfully." })
            }
        })
    } else [
        res.status(200).json({ message:`See you next time...` })
    ]
})
// export the router to API Router
module.exports = router;