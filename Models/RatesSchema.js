const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const schema = new mongoose.Schema({
    _id: Number,
    rate: { type: String, required: true },
    book: { type: Number, ref: 'books' },
    user: { type: Number, ref: 'users' },
}, { timestamps: true });

schema.plugin(AutoIncrementID, [{ field: '_id' }]);
module.exports = mongoose.model('rates', schema)

