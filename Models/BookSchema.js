const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const schema = new mongoose.Schema({
    _id: Number,
    title: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 150 },
    details: { type: String, required: true, unique: true, trim: true, minlength: 20, maxlength: 300 },
    rate: { type: Number, default: 0, min: 0, max: 5 },
    author: { type: Number, ref: 'authors' },
    category: { type: Number, ref: 'categories' },
}, { timestamps: true });
schema.plugin(AutoIncrementID, [{ field: '_id' }]);
module.exports = mongoose.module('books', schema)