const express = require('express')

const { verifyToken } = require('../middlewares')

const userController = require('../controllers/user')

const router = express.Router()

router.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    )
    next()
})

router.get('/api/test/all', userController.allAccess)

router.get('/api/test/user', [verifyToken], userController.userBoard)

module.exports = router