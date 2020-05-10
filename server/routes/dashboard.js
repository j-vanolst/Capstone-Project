const express = require('express')

const dashboardController = require('../controllers/dashboard')

const router = express.Router()

router.get('/', dashboardController.default)
router.get('/testAPI', dashboardController.callAPI)

module.exports = router