const mongoose = require('mongoose')

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        fName: String,
        lName: String,
        email: String,
        password: String
    })
)

module.exports = User