const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const schema = new mongoose.Schema({
    _id: Number,
    rate: { type: String, required: true },
    book: { type: String, ref: 'books' },
    user: { type: String, ref: 'users' },
}, { timestamps: true });

schema.plugin(AutoIncrementID, [{ field: '_id' }]);
module.exports = mongoose.model('rates', schema)

