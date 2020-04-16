const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
    title: { type: String, unique: true, required: true },
    creator: { type: ObjectId, ref:'User', required: true },
    description: { type: String },
    stories: [{ type: ObjectId, ref:'Story', required: true }],
    tags: [{ type: String, unique: true, required: true }],
    createdDate: { type: Date, default: Date.now },
    geolocation: { type: String, unique: false, required: true },
    truthIdx: { type: Number, default: 0 }
});

schema.methods.initializeTruth = function initializeTruth() {
    var truth = 0;
    var stories = this.model('Story').find({ stories: this.stories });
    for (var story in stories) {
        truth + story.truthIdx 
    }
    return truth;
}

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Story', schema);