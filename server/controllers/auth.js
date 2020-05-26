const config = require('../config/auth_key')
const db = require('../database')
const User = db.user

const nodemailer = require('nodemailer')
const nodemailer_smtp_transport = require('nodemailer-smtp-transport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const async = require('async')
const crypto = require('crypto')
const generator = require('generate-password')

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

exports.reset = (req, res, next) => {
    let email = req.body.email

    console.log(email)

    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                let token = buf.toString('hex')
                done(err, token)
            })
        },
        function (token, done) {
            User
                .findOne({
                    email: email
                }, function (err, user) {
                    if (!user) {
                        return res.status(404).send({ message: 'User not found.' })
                    }

                    user.resetPasswordToken = token
                    user.resetTokenExpires = Date.now() + 360000

                    user.save(function (err) {
                        done(err, token, user)
                    })
                })
        },
        function (token, user, done) {
            const smtpTransport = new nodemailer_smtp_transport()
            const mailTransport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'vanolst.j@gmail.com',
                    pass: config.gmailPassword
                }
            })

            const mailOptions = {
                to: user.email,
                from: 'vanolst.j@gmail.com',
                subject: 'Capstone Project Password Reset',
                text: 'You are recieving this because you (or someone else) has requested a password reset for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the password reset: \n\n' +
                    'http://' + 'localhost:3000' + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.'
            }
            mailTransport.sendMail(mailOptions, function (err) {
                res.status(200).send({ message: 'An email has been sent to ' + user.email + ' with further instructions.' })
                done(err, 'done')
            })
        }
    ],
        function (err) {

            if (err) {
                return next(err)
            }

        })
}

exports.verifyToken = (req, res, next) => {
    let token = req.body.token
    console.log(token)

    User
        .findOne({
            resetPasswordToken: token,
            resetTokenExpires: { $gt: Date.now() }
        }, function (err, user) {
            if (!user) {
                res.status(404).send({ message: 'Reset token is invalid or has expired.' })
                return
            }
            let newPassword = generator.generate({
                length: 10,
                numebers: true
            })
            user.password = bcrypt.hashSync(newPassword, 8)
            user.resetPasswordToken = ''
            user.resetTokenExpires = ''
            user
                .save((err, user) => {
                    if (err) {
                        res.status.send(500).send({ message: 'Error resetting password.' })
                        return
                    }
                    res.status(200).send({ message: `Token is valid. Your new temporary password is: ${newPassword}` })
                })
        })
}