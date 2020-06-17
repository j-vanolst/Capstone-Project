const mongoose = require('mongoose')

const Camera = mongoose.model(
    'Camera',
    new mongoose.Schema({
        name: String,
        location: String,
        url: String,
        schedule: String,
        userID: String,
        polygon: String,
        model: String
    })
)

module.exports = Camera