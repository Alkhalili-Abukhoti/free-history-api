require('dotenv').config();

var mongoose = require('mongoose');

var db = mongoose.connect(process.env.MONGODB_URI || 9000, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false 
});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model')
};