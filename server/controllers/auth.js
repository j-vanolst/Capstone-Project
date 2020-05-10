const config = require('../config/auth_key')
const db = require('../database')
const User = db.user

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.register = (req, res, next) => {
    const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })

    user
        .save((err, user) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }
            res.send({ message: 'User was registered successfully.' })
        })
}

exports.login = (req, res, next) => {
    User
        .findOne({
            email: req.body.email
        })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }

            if (!user) {
                return res.status(404).send({ message: 'User not found.' })
            }

            let passwordCorrect = bcrypt.compareSync(
                req.body.password,
                user.password
            )

            if (!passwordCorrect) {
                return res.status(401).send({
                    accessToken: null,
                    message: 'Invalid Password.'
                })
            }

            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 3600
            })

            res.status(200).send({
                id: user._id,
                fName: user.fName,
                lName: user.lName,
                email: user.email,
                accessToken: token
            })
        })
}