const mongoose = require('mongoose')

const Video = mongoose.model(
    'Video',
    new mongoose.Schema({
        filename: String,
        userID: String
    })
)

module.exports = Video