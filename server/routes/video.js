const express = require('express')

const db = require('../database')
const Video = db.video

const videoController = require('../controllers/video')
const fileStorage = require('../middlewares/file_storage')
const verifyJWT = require('../middlewares/auth_jwt')

const router = express.Router()

router.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    )
    next()
})

router.post('/api/video/get', [verifyJWT], videoController.get)
router.post('/api/video/remove', [verifyJWT], videoController.remove)
router.post('/api/video/add', [verifyJWT, fileStorage.upload.single('file')], videoController.add)
router.get('/api/video/getFile/:fileID', videoController.getFile)
router.post('/api/video/update', [verifyJWT], videoController.update)

module.exports = router