// models/fileModel.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: String,
    size: Number,
    url: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
});

module.exports = mongoose.model('File', fileSchema);
