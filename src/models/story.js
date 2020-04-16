const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
    title: { type: String, unique: true, required: true },
    author: { type: ObjectId, ref:'User', required: true },
    description: { type: String },
    stories: [{ type: ObjectId, ref:'Story', required: false }],
    tags: [{ type: String, unique: false, required: true }],
    createdDate: { type: Date, default: Date.now },
    geolocation: { type: String, unique: false, required: true },
    truthIdx: { type: Number, default: 0 },
    audience: { type: String, default: "private"}
});

schema.methods.initializeTruth = function initializeTruth() {
    let truth = 0;
    const stories = this.model('Story').find({ stories: this.stories });
    for (const story in stories) {
        truth += story.truthIdx
    }
    return truth
};

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Story', schema);
