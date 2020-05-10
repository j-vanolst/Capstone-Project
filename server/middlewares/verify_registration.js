const db = require('../database/index')
const User = db.user

checkExistingEmail = (req, res, next) => {
    User
        .findOne({
            email: req.body.email
        })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message, err })
                return
            }
            if (user) {
                res.status(400).send({ message: "Email already registered." })
                return
            }
            next()
        })
}

const verifyRegister = {
    checkExistingEmail
}

module.exports = verifyRegister