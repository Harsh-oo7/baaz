
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        minLength: [3, "Your username must have at least 3 characters"],
        maxLength: [12, "Your username must not exceed 25 characters"]
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    logo: {
        type: String,
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model('Users', Users);