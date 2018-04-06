var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    hash: String
});

module.exports = mongoose.model('Users', UserSchema);