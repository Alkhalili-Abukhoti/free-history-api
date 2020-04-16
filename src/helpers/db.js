require('rootpath')();
require('dotenv').config();

const mongoose = require('mongoose');

const db = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true, 
    useCreateIndex: true, useFindAndModify: false 
});
mongoose.Promise = global.Promise;

const User = require('src/models/user');
const Story = require('src/models/story');

module.exports = {
    User: User,
    Story: Story
};
