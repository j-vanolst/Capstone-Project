const mongoose = require('mongoose')

const Video = mongoose.model(
    'Video',
    new mongoose.Schema({
        filename: String,
        userID: String,
        fileID: mongoose.Schema.Types.ObjectId,
        polygon: String,
        model: String
    })
)

module.exports = Video