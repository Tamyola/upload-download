const mongoose = require('mongoose');

const ImagesSchema = new mongoose.Schema({
  fileName: String,
  fileSize: Number,
  fileType: String,
  s3Link: String,
});

const Images = mongoose.model('Images', ImagesSchema);

module.exports = Images;