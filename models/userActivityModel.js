
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Activities = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    timestamp: {
        type: String,
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('Activities', Activities);