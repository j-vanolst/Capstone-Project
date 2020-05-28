const express = require('express')

const cameraController = require('../controllers/camera')
const verifyJWT = require('../middlewares/auth_jwt')

const router = express.Router()

router.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    )
    next()
})

router.post('/api/camera/add', [verifyJWT], cameraController.add)
router.post('/api/camera/get', [verifyJWT], cameraController.get)
router.post('/api/camera/edit', [verifyJWT], cameraController.edit)
router.post('/api/camera/remove', [verifyJWT], cameraController.remove)

module.exports = router