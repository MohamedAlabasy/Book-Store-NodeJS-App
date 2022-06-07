const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const schema = new mongoose.Schema({
    _id: Number,
    reply: { type: String },
    user: { type: Number, ref: 'users' },
    comment: { type: Number, ref: 'comments' },
}, { timestamps: true });

schema.plugin(AutoIncrementID, [{ field: '_id' }]);
module.exports = mongoose.model('replies', schema)

