const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  id : {
    type: String,
    required: true,
    unique: true
  },
  password: {
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

UserSchema.methods.hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
UserSchema.methods.comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = mongoose.model('User', UserSchema);
