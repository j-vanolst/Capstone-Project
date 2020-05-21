const express = require('express')

const db = require('../database')
const Video = db.video


const path = require('path')
const mongoose = require('mongoose')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')

const videoController = require('../controllers/video')

const router = express.Router()

////////////////////////////////////////////////////////
const mongoURI = 'mongodb://localhost:27017/capstone_project'

// Init Connection
const conn = mongoose.createConnection(mongoURI)

//Init GridFS
let gfs

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('videos')
})

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const filename = buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: 'videos'
                }
                resolve(fileInfo)
            })
        })
    }
})


const upload = multer({ storage })
//////////////////////////////////////////////////////////
router.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    )
    next()
})

router.post('/api/video/add', videoController.add)
router.post('/api/video/get', videoController.get)
router.post('/api/video/remove', videoController.remove)
router.post('/api/video/test', upload.single('file'), (req, res, next) => {
    let filename = req.body.filename
    let userID = req.body.userID
    let fileID = req.file.id

    console.log(filename, userID, fileID)

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
})

module.exports = router