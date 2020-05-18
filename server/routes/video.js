const express = require('express')

const videoController = require('../controllers/video')

const router = express.Router()

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

module.exports = router