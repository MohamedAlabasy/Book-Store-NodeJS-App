const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const schema = new mongoose.Schema({
    _id: Number,
    first_name: { type: String, required: true, trim: true, },
    last_name: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'], default: 'male' }
}, { timestamps: true });

schema.plugin(AutoIncrementID, [{ filed: '_id' }]);

module.exports = mongoose.model('Authors', schema)