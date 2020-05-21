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