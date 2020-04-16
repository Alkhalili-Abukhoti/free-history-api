const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    email: { type: String, unique: true, required: true },
    trustIdx: { type: Number, default: 1 },
    following: [{ type: ObjectId, ref: 'User', required: false }]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
