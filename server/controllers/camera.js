const Stream = require('node-rtsp-stream')

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
            res.status(200).send({ message: 'Camera successfully added.' })
        })
}

exports.get = (req, res, next) => {
    Camera.find({ 'userID': req.body.userID }, function (err, cameras) {
        if (err) {
            console.log('Error retrieving cameras')
            return
        }
        if (cameras.length == 0) {
            cameras = []
        }
        res.status(200).send({ cameras })
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
                res.status(200).send({ message: 'Camera edited successfully.' })
            })
    }
    else {
        res.status(401).send({ message: 'Authorization error.' })
    }
}

exports.remove = (req, res, next) => {
    let userID = req.body.userID
    let cameraID = req.body.cameraID

    console.log(userID, cameraID)


    Camera
        .findById({
            _id: cameraID
        }, (err, camera) => {
            if (!camera) {
                res.status(404).send({ message: 'Camera could not be found.' })
                return
            }
            if (camera.userID == userID) {
                camera
                    .remove((err, camera) => {
                        if (err) {
                            res.status(500).send({ message: err })
                            return
                        }
                        res.status(200).send({ message: 'Camera successfully removed.' })
                        return
                    })
            }
            else {
                res.status(401).send({ message: 'Authorization error.' })
            }
        })
}

exports.update = (req, res, next) => {
    let cameraID = req.body.cameraID
    let polygon = req.body.polygon
    let model = req.body.model
    let userID = req.body.userID

    console.log(cameraID, polygon, model, userID)

    Camera
        .findById({
            _id: cameraID
        }, (err, camera) => {
            if (!camera) {
                res.status(404).send({ message: 'Camera could not be found.' })
                return
            }
            if (camera.userID == userID) {
                camera.polygon = polygon
                camera.model = model

                camera
                    .save((err, camera) => {
                        if (err) {
                            res.status(500).send({ message: err })
                            return
                        }
                        res.status(200).send({ message: 'Camera successfully updated.' })
                    })
            }
            else {
                res.status(401).send({ message: 'Authorization error.' })
            }
        })
}

exports.captureFrame = (req, res, next) => {
    let rtspURL = 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov'
    let stream = new Stream({
        name: 'name',
        streamURL: rtspURL,
        wsPort: 9999
    })
}