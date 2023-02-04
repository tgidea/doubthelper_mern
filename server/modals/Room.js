const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    required:true
  },
  limit : {
    type : Number,
    default : 100,
  },
  posts : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Polldoubthelper'
  }],
  createdAt : {
    type: Date,
    default : Date.now(),
  }
});

const Room = mongoose.model('Roomdoubthelper', roomSchema);

module.exports = Room;
