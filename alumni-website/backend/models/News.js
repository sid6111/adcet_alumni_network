const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter news title']
  },
  content: {
    type: String,
    required: [true, 'Please enter news content']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('News', newsSchema);