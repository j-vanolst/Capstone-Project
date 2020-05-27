const config = require('../config/auth_key')
const db = require('../database')
const Video = db.video

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fs = require('fs')

const mongoose = require('mongoose')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
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
            res.send({ message: 'Video was added successfully.' })
        })
}

exports.getFile = (req, res, next) => {
    let userID = req.body.userID
    let fileID = new mongoose.mongo.ObjectId(req.params.fileID)

    let conn = fileStorage.conn
    let gfs

    conn.once('open', () => {
        gfs = Grid(fileStorage.conn.db, mongoose.mongo)
        gfs.collection('videos')
    })

    if (!gfs) {
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
}

exports.get = (req, res, next) => {
    Video.find({ 'userID': req.body.userID }, function (err, videos) {
        if (err) {
            console.log('Error retrieving videos')
            return
        }
        res.send({ videos })
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

exports.test = (req, res, next) => {
    //console.log(req.body)

    // let filename = req.body.filename
    // let file = req.body.file


    // fs.writeFile(filename, file, (err) => {
    //     if (err) {
    //         console.log('Error writing file')
    //     }
    // })
    // res.send({ message: 'success' })

    // Mongo URL

}