require('dotenv').config();

var mongoose = require('mongoose');

var db = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true, 
    useCreateIndex: true, useFindAndModify: false 
});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user'),
    Event: require('../models/event')
};