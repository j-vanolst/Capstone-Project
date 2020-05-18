const mongoose = require('mongoose')

const Video = mongoose.model(
    'Video',
    new mongoose.Schema({
        filename: String
    })
)

module.exports = Video