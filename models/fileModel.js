// models/fileModel.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: [true, "File name should not be blank"],
        },
        size: {
            type: Number,
            required: [true, "File size should not be blank"]
        },
        url: {
            type: String,
            required: [true, "File URL is needed"]
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('File', fileSchema);
