const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user_model');
db.camera = require('./camera_model')
db.video = require('./video_model')

module.exports = db