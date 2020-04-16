require('rootpath')();
require('dotenv').config();

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
        throw 'Title: "' + storyParams.title + '" was already used'
    }
    else {
        try {
            // add author id reference to User
            storyParams.author = mongoose.Types.ObjectId(userId);
            const story = new Story(storyParams);
            // save story
            await story.save()
        } catch (error) {
            throw error
        }
    }
}

async function getAll(userId) {
    try {
        let query = { author: mongoose.Types.ObjectId(userId) };
        return await Story.find(query);
    } catch (error) {
        throw error
    }
}

async function getById(userId, storyId) {
    const story = await Story.findById(storyId);
    if (String(story.author) !== String(userId))
        throw 'Forbidden: permission belongs only to story creator';
    else return story
}

async function update(userId, storyId, storyParams) {
    const story = await Story.findById(storyId);
    // validate
    if (!story)
        throw 'Story not found';
    else if (String(story.author) !== String(userId))
        throw 'Forbidden: permission belongs only to story creator';
    else
        // copy userParam properties to user
        Object.assign(story, storyParams);
        await story.save()
}

async function _delete(userId, storyId) {
    const story = await Story.findById(storyId);
    // validate
    if (!story)
        throw 'Story not found';
    else if (String(story.author) !== String(userId))
        throw 'Forbidden: permission belongs only to story creator';
    else
        await Story.findByIdAndRemove(storyId)
}
