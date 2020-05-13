const config = require('../config/auth_key')
const db = require('../database')
const Camera = db.camera

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.add = (req, res, next) => {
    const camera = new Camera({
        name: req.body.name,
        location: req.body.location,
        url: req.body.url,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        userID: req.body.userID
    })

    camera
        .save((err, user) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }
            res.send({ message: 'Camera was added successfully.' })
        })
}
exports.get = (req, res, next) => {
    Camera.find({ 'userID': req.body.userID }, function (err, cameras) {
        if (err) {
            console.log('Error retrieving cameras')
            return
        }
        res.send({ cameras })
    })
}