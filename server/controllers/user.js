const config = require('../config/auth_key')
const db = require('../database')
const User = db.user

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.edit = (req, res, next) => {
    fName = req.body.fName
    lName = req.body.lName
    email = req.body.email
    userID = req.body.userID

    console.log(fName, lName, email)

    User
        .findById({
            _id: userID
        }, (err, user) => {
            if (!user) {
                res.status(404).send({ message: 'User could not be found.' })
                return
            }
            user.fName = fName
            user.lName = lName
            user.email = email

            user
                .save((err, user) => {
                    if (err) {
                        res.status(500).send({ message: err })
                        return
                    }
                    res.status(200).send({ message: 'User edited successfully.' })
                })
        })
}

exports.changePassword = (req, res, next) => {
    currentPassword = req.body.currentPassword
    newPassword = req.body.newPassword
    newPasswordConfirm = req.body.newPasswordConfirm
    userID = req.body.userID

    console.log(currentPassword, newPassword, newPasswordConfirm, userID)

    let passwordsMatch = newPassword === newPasswordConfirm

    if (passwordsMatch) {
        User
        .findById({
            _id: userID
        }, (err, user) => {
            if (!user) {
                res.status(404).send({ message: 'User count not be found.' })
                return
            }

            let passwordCorrect = bcrypt.compareSync(
                currentPassword,
                user.password
            )

            if (!passwordCorrect) {
                return res.status(401).send({ message: 'Current password incorrect.' })
            }

            user.password = bcrypt.hashSync(newPassword, 8)

            user
                .save((err, user) => {
                    if (err) {
                        res.status(500).send({ message: err })
                        return
                    }
                    res.status(200).send({ message: 'Password updated successfully.' })
                })
        })
    }

    else {
        res.status(401).send({ message: 'Passwords do not match.' })
    }

}