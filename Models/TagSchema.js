const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const schema = new mongoose.Schema({
    _id: Number,
    tag: { type: String, required: true },
}, { timestamps: true });

schema.plugin(AutoIncrementID, [{ field: '_id' }]);
module.exports = mongoose.model('tags', schema)

