const mongoose = require('mongoose')

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        fName: String,
        lName: String,
        email: String,
        password: String,
        resetPasswordToken: String,
        resetTokenExpires: Date
    })
)

module.exports = User