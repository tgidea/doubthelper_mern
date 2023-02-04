const mongoose =  require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  discussionSpace : [{
    type: mongoose.Schema.Types.ObjectId,
    default:[],
  }],
  id: { type: String },
});

module.exports = mongoose.model("Userdoubthelper", userSchema);