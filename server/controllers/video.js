const config = require('../config/auth_key')
const db = require('../database')
const Video = db.Video

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.add = (req, res, next) => {
    const video = new Video({
        filename: req.body.filename,
        userID: req.body.userID
    })

    video
        .save((err, user) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }
            res.send({ message: 'Video was added successfully.' })
        })
}

exports.get = (req, res, next) => {
    Video.find({ 'userID': req.body.userID }, function (err, camera) {
        if (err) {
            console.log('Error retrieving videos')
            return
        }
        res.send({ video })
    })
}

exports.remove = async (req, res, next) => {
    console.log(req.body)

    let userID = req.body.userID
    let videoID = req.body.videoID

    let video = await Video.findById(
        { _id: videoID }
    )

    if (video.userID == userID) {
        video
            .remove((err, video) => {
                if (err) {
                    res.status(500).send({ message: err })
                    return
                }
                res.send({ message: 'Video removed successfully.' })
            })
    }
    else {
        res.status(401).send({ message: 'Authorization error.' })
    }
}