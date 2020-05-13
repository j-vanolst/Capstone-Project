const express = require('express')

const cameraController = require('../controllers/camera')

const router = express.Router()

router.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    )
    next()
})

router.post('/api/camera/add', cameraController.add)
router.post('/api/camera/get', cameraController.get)

// router.post('./api/camera/edit',
//     cameraController.edit
// )

module.exports = router