const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true
  },
  user : {
    type: String,
    required:true
  },
  createdAt : {
    type: Date,
    default : Date.now(),
  }
});

const Comment = mongoose.model('Commentdoubthelper', commentSchema);

module.exports = Comment;
