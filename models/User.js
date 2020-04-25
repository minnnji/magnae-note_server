const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email : { type: String , required: true, unique: true },
  name: { type: String, required: true },
  myMeetings: { type: Array, default: [] }
}, {
  versionKey: false
});

module.exports = mongoose.model('User', UserSchema);
