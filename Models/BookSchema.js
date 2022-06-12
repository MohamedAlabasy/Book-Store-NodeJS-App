const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const schema = new mongoose.Schema({
    _id: Number,
    title: { type: String, required: true, unique: true, trim: true },
    details: { type: String, required: true, trim: true },
    rate: { type: Number, default: 0, min: 0, max: 5 },
    author: { type: Number, ref: 'authors', required: true },
    category: { type: Number, ref: 'categories', required: true },
}, { timestamps: true });

schema.plugin(AutoIncrementID, [{ field: '_id' }]);

module.exports = mongoose.model('books', schema);