const mongoose = require('mongoose');
const { Schema } = mongoose;

const MeetingSchema = new Schema({
  title : {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  memberList: {
    type: Array
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Meeting', MeetingSchema);
