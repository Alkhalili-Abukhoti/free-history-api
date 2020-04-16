require('rootpath')();
require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const db = require('src/helpers/db');
const Story = db.Story;

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(userId, storyParams) {
    // validate
    if (await Story.findOne({ title: storyParams.title })) {
        throw 'Title: "' + storyParams.title + '" was already used';
    }

    // add creator id reference to User
    storyParams.creator = mongoose.Types.ObjectId(userId);
    const story = new Story(storyParams);
    // save story
    await story.save();
}

async function getAll(userId) {
    let query = {};
    if (userId){
        query = { "creator": ObjectId(userId) }
    }

    return await Story.find(query).select('-hash');
}

async function getById(id) {
    return await Story.findById(id).select('-hash');
}

async function update(id, storyParams) {
    const story = await Story.findById(id);

    // validate
    if (!story) throw 'Story not found';

    // copy userParam properties to user
    Object.assign(story, storyParams);

    await story.save();
}

async function _delete(id) {
    await Story.findByIdAndRemove(id);
}