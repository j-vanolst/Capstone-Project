const jwt = require('jsonwebtoken')
const config = require('../config/auth_key')
const db = require('../database/index')
const User = db.user

verifyJWT = (req, res, next) => {
    let token = req.headers['x-access-token']

    if (!token) {
        console.log('No token')
        return res.status(403).send({ message: 'No token provided' })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            console.log('Unauthorized')
            return res.status(401).send({ message: 'Unauthorized' })
        }
        console.log('Authorized')
        req.userID = decoded.userID
        next()
    })
}

module.exports = verifyJWT