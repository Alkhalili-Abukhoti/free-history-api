var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    username: String,
    password: String,
    firstName: String,
    lasttName: String,
    email: String,
    trustIdx: {type: Number, default: 0}
});

module.exports = mongoose.model('User', user);