const express = require('express')

const verifyJWT = require('../middlewares/auth_jwt')

const userController = require('../controllers/user')

const router = express.Router()

router.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    )
    next()
})

router.post('/api/user/edit', [verifyJWT], userController.edit)
router.post('/api/user/changePassword', [verifyJWT], userController.changePassword)

module.exports = router