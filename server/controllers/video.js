const config = require('../config/auth_key')
const db = require('../database')
const Video = db.video

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fs = require('fs')

const mongoose = require('mongoose')
const Grid = require('gridfs-stream')

const fileStorage = require('../middlewares/file_storage')


exports.add = (req, res, next) => {
    let filename = req.body.filename
    let userID = req.body.userID
    let fileID = req.file.id

    const video = new Video({
        filename: filename,
        userID: userID,
        fileID: fileID
    })

    video
        .save((err, user) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }
            res.send({ message: 'Video successfully added.' })
        })
}

exports.getFile = (req, res, next) => {
    let userID = req.body.userID
    let fileID = new mongoose.mongo.ObjectId(req.params.fileID)

    // Check the user owns the fileID
    Video.findOne({
        'userID': userID,
        'fileID': fileID
    }, (err, video) => {
        if (err) {
            console.log(err)
            return
        }
        let conn = fileStorage.conn
        let gfs

        conn.once('open', () => {
            //gfs = Grid(fileStorage.conn.db, mongoose.mongo)
            gfs = Grid(fileStorage.conn.db, mongoose.mongo)
            gfs.collection('videos')
        })

        if (!gfs) {
            //gfs = Grid(fileStorage.conn.db, mongoose.mongo)
            gfs = Grid(fileStorage.conn.db, mongoose.mongo)
            gfs.collection('videos')
        }

        gfs.files
            .find({
                _id: fileID
            })
            .toArray((err, files) => {
                if (!files || files.length === 0) {
                    err = 'No file found'
                    res.status(500).send({ message: err })
                    return
                }

                // File Exists
                const readStream = gfs.createReadStream(files[0].filename)
                readStream.pipe(res)
            })
    })
}

exports.get = (req, res, next) => {
    Video.find({ 'userID': req.body.userID }, function (err, videos) {
        if (err) {
            return
        }
        res.send({ videos })
    })
}

exports.remove = (req, res, next) => {
    let userID = req.body.userID
    let videoID = new mongoose.mongo.ObjectId(req.body.videoID)

    let conn = fileStorage.conn
    let gfs

    conn.once('open', () => {
        //gfs = Grid(fileStorage.conn.db, mongoose.mongo)
        gfs = Grid(fileStorage.conn.db, mongoose.mongo)
        gfs.collection('videos')
    })

    if (!gfs) {
        //gfs = Grid(fileStorage.conn.db, mongoose.mongo)
        gfs = Grid(fileStorage.conn.db, mongoose.mongo)
        gfs.collection('videos')
    }

    Video
        .findOne({
            fileID: videoID
        }, (err, video) => {
            if (!video) {
                res.status(404).send({ message: 'Video could not be found.' })
                return
            }
            if (video.userID == userID) {
                video
                    .remove((err, video) => {
                        if (err) {
                            res.status(500).send({ message: err })
                            return
                        }
                        // Remove the file + its chunks
                        gfs.remove({
                            _id: videoID,
                            root: 'videos'
                        })
                        if (err) {
                            res.status(500).send({ message: err })
                            return
                        }
                        res.status(200).send({ message: 'Video successfully removed.' })
                        return
                    })
            }
            else {
                res.status(401).send({ message: 'Authorization error.' })
            }
        })
}

exports.update = (req, res, next) => {
    let videoID = req.body.videoID
    let polygon = req.body.polygon
    let model = req.body.model
    let userID = req.body.userID

    console.log(videoID, polygon, model, userID)

    Video
        .findById({
            _id: videoID
        }, (err, video) => {
            if (!video) {
                res.status(404).send({ message: 'Video could not be found.' })
                return
            }
            if (video.userID == userID) {
                video.polygon = polygon
                video.model = model

                video
                    .save((err, camera) => {
                        if (err) {
                            res.status(500).send({ message: err })
                            return
                        }
                        res.status(200).send({ message: 'Video successfully update.' })
                    })
            }
            else {
                res.status(401).send({ message: 'Authorization error.' })
            }
        })
}

exports.edit = (req, res, next) => {
    let videoID = req.body.videoID
    let schedule = req.body.schedule
    let userID = req.body.userID

    console.log(videoID, schedule, userID)

    Video
        .findById({
            _id: videoID
        }, (err, video) => {
            if (!video) {
                res.status(404).send({ message: 'Video could not be found.' })
                return
            }
            if (video.userID == userID) {
                video.schedule = schedule
                video
                    .save((err, camera) => {
                        if (err) {
                            res.status(500).send({ message: err })
                            return
                        }
                        res.status(200).send({ message: 'Video successfully update.' })
                    })
            }
            else {
                res.status(401).send({ message: 'Authorization error.' })
            }
        })
}
