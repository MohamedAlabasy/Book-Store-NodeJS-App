const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const schema = new mongoose.Schema({
    _id: Number,
    name: { type: String, required: true },
}, { timestamps: true });

schema.plugin(AutoIncrementID, [{ field: '_id' }]);
module.exports = mongoose.model('categories', schema);