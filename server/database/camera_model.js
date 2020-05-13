const mongoose = require('mongoose')

const Camera = mongoose.model(
    'Camera',
    new mongoose.Schema({
        name: String,
        location: String,
        url: String,
        startTime: String,
        endTime: String,
        userID: String
    })
)

module.exports = Camera