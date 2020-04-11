const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
    title: { type: String, unique: true, required: true },
    creator: { type: ObjectId, ref:'User', required: true },
    description: { type: String }, 
    createdDate: { type: Date, default: Date.now },
    truthIdx: { type: Number, default: 0 }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Event', schema);