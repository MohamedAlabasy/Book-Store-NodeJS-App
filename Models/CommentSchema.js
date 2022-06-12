const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const schema = new mongoose.Schema({
    _id: Number,
    comment: { type: String, required: true },
    book: { type: Number, ref: 'books', required: true },
    user: { type: Number, ref: 'users', required: true },
}, { timestamps: true });

schema.plugin(AutoIncrementID, [{ field: '_id' }]);
module.exports = mongoose.model('comments', schema)

