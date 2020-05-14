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

exports.edit = async (req, res, next) => {
    console.log(req.body)

    let userID = req.body.userID
    let cameraID = req.body.cameraID

    let camera = await Camera.findById(
        { _id: cameraID }
    )

    if (camera.userID == userID) {
        camera.name = req.body.name,
            camera.location = req.body.location,
            camera.url = req.body.url,
            camera.startTime = req.body.startTime,
            camera.endTime = req.body.endTime

        camera
            .save((err, camera) => {
                if (err) {
                    res.status(500).send({ message: err })
                    return
                }
                res.send({ message: 'Camera edited successfully.' })
            })
    }
    else {
        res.status(401).send({ message: 'Authorization error.' })
    }
}

exports.remove = async (req, res, next) => {
    console.log(req.body)

    let userID = req.body.userID
    let cameraID = req.body.cameraID

    let camera = await Camera.findById(
        { _id: cameraID }
    )

    if (camera.userID == userID) {
        camera
            .remove((err, camera) => {
                if (err) {
                    res.status(500).send({ message: err })
                    return
                }
                res.send({ message: 'Camera removed successfully.' })
            })
    }
    else {
        res.status(401).send({ message: 'Authorization error.' })
    }
}