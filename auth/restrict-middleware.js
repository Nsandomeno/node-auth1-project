// import bcrypt
const bcrypt = require('bcryptjs')
// import model for Users
const Users = require('../users/usersModel.js')
// build and export the middleware function
module.exports = function restrict(req, res, next) {
// No imports are needed for this piece of middleware when using cookies and session
    if (req.session && req.session.loggedIn) {
        next();
    } else {
        res.status(401).json({ message:"You need to be logged in to access this point." })
    }

// *****************************************************************************************************
// ********** THE CODE BELOW THIS POINT WAS USED PRIOR TO COOKIE & SESSION IMPLEMENTATION *********
// *****************************************************************************************************
    // let { username, password } = req.headers;
    
    // if (username && password) {
    //     next()
    
    //     Users.findBy({ username })
    //         .first()
    //     .then((user) => {
    //         if (user && bcrypt.compareSync(password, user.password)) {
    //             next()
    //         } else {
    //             res.status(401).json({ message:"Invalid credentials" })
    //         }
    //     })
    //     .catch(({ name, message, stack }) => {
    //         res.status(500).json({ name, message, stack })
    //     })
    // } else {
    //     res.status(400).json({ message:"It's you're fault." })
    // }
}