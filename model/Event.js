var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var event = new Schema({
    title: String,
    creator: {type: ObjectId, ref:'User'},
    truthIdx: {type: Number, default: 0}
});

module.exports = mongoose.model('Event', event);