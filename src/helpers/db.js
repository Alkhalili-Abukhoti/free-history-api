require('rootpath')();
require('dotenv').config();

var mongoose = require('mongoose');

var db = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true, 
    useCreateIndex: true, useFindAndModify: false 
});
mongoose.Promise = global.Promise;

var User = require('src/models/user');
var Story = require('src/models/story');

module.exports = {
    User: User,
    Story: Story
};