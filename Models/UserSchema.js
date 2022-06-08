const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');


// 1- build schema with validation
const schema = new mongoose.Schema({
    _id: Number,//,mongoose.Types.object
    first_name: { type: String, required: true, trim: true, },
    last_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, },
    password: { type: String, required: true, select: false, trim: true, },
    birth_date: { type: String, required: true, trim: true },
    image: { type: String },
    is_verifications: { type: Boolean, default: false, select: false },
    country: { type: String, required: true, trim: true, },
    mobile_phone: { type: String, required: true, trim: true, },
    gender: { type: String, enum: ['male', 'female'], default: 'male' },
    token: { type: String, required: false, default: null, select: false },
}, { timestamps: true });

schema.plugin(AutoIncrementID, [{ field: '_id' }]);

// Register for schema in mongoose
module.exports = mongoose.model('users', schema);