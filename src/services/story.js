require('rootpath')()
require('dotenv').config()

const mongoose = require('mongoose')
const db = require('src/helpers/db')
const Story = db.Story

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
}

async function create(userId, storyParams) {
    // validate
    if (await Story.findOne({ title: storyParams.title })) {
        throw 'Title: "' + storyParams.title + '" was already used'
    }
    else {
        try {
            // add author id reference to User
            storyParams.author = mongoose.Types.ObjectId(userId)
            const story = new Story(storyParams)
            // save story
            await story.save()
        } catch (error) {
            throw error
        }
    }
}

async function getAll(userId) {
    //console.log("userId: " + userId)
    try {
        let query = { author: mongoose.Types.ObjectId(userId) }
        var story = await Story.find(query).select()
        return story
    } catch (error) {
        throw error
    }
}

async function getById(id) {
    return await Story.findById(id);
}

async function update(id, storyParams) {
    const story = await Story.findById(id);

    // validate
    if (!story) throw 'Story not found';

    // copy userParam properties to user
    Object.assign(story, storyParams);

    await story.save();
}

async function _delete(userId, storyId) {
    const story = await Story.findById(storyId)
    // validate
    if (!story) throw 'Story not found'
    else if (story.author != userId) throw 'Forbidden: permission belongs only to story creator'
    else {
        await Story.findByIdAndRemove(storyId)
    }
}