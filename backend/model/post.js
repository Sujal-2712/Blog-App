const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
  }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
