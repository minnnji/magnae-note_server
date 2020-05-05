const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email : {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  myMeetings: [{
    type: Schema.Types.ObjectId,
    ref: 'Meeting',
    required: true
  }]
}, {
  versionKey: false
});

module.exports = mongoose.model('User', UserSchema);
