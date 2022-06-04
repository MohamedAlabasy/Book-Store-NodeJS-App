const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

// 1- build schema with validation
const schema = new mongoose.Schema({
    _id: Number,//,mongoose.Types.object
    name: { type: String, required: true, }, //unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    gender: { type: String, enum: ['male', 'female'], default: 'male' },
}, { timestamps: true });

schema.plugin(AutoIncrementID, [{ field: '_id' }]);
// Register for schema in mongoose
module.exports = mongoose.model('users', schema);