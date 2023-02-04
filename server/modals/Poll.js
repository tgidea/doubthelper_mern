const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  user : {
    type: mongoose.Schema.Types.ObjectId,
    required:true
  },
  options: [{
    option: {
      type: String,
      required: true
    },
  }],
  votes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Userdoubthelper',
      required:true
    },
    optionId: {
      type: String,
      required:true
    },
    timestamp: {
      type: Date,
      default: Date.now()
    }
  }],
  selectedFile : {
    type: String,
  },
  comments : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Commentdoubthelper'
  }],
  createdAt : {
    type: Date,
    default : Date.now(),
  }
});

const Poll = mongoose.model('Polldoubthelper', pollSchema);

module.exports = Poll;
