// models/fileModel.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  url: String,
});

module.exports = mongoose.model('File', fileSchema);
