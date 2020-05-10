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

checkPasswordsMatch = (req, res, next) => {
    console.log(req.body)
    console.log(req.body.password)
    console.log(req.body.confirmPassword)
    if (req.body.password != req.body.confirmPassword) {
        res.status(400).send({ message: "Passwords do not match." })
        return
    }
    next()
}

const verifyRegister = {
    checkExistingEmail,
    checkPasswordsMatch
}

module.exports = verifyRegister