require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const db = require('../helpers/db');
const Event = db.Event;

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(userId, eventParam) {
    // validate
    if (await Event.findOne({ title: eventParam.title })) {
        throw 'Title: "' + eventParam.title + '" was already used';
    }

    // add creator id reference to User
    eventParam.creator = mongoose.Types.ObjectId(userId);
    const event = new Event(eventParam);
    // save event
    await event.save();
}

async function getAll() {
    return await Event.find().select('-hash');
}

async function getById(id) {
    return await Event.findById(id).select('-hash');
}

async function update(id, eventParam) {
    const event = await Event.findById(id);

    // validate
    if (!event) throw 'Event not found';

    // copy userParam properties to user
    Object.assign(event, eventParam);

    await event.save();
}

async function _delete(id) {
    await Event.findByIdAndRemove(id);
}