const express = require('express')

const { verifyRegister } = require('../middlewares')

const authController = require('../controllers/auth')

const router = express.Router()

router.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    )
    next()
})

router.post('/api/auth/register',
    [
        verifyRegister.checkExistingEmail
    ],
    authController.register
)

router.post('/api/auth/login', authController.login)

router.post('/api/auth/reset', authController.reset)

module.exports = router