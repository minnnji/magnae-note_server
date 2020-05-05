const createError = require('http-errors');
const Meeting = require('../models/Meeting');

exports.createMeeting = async (req, res, next) => {
  const { title, password, creator } = req.body;

  try {
    const newMeeting = await new Meeting({ title, password, creator }).save();
    const { _id } = newMeeting;
    res.json({ meetingId: _id });
  } catch (err) {
    console.log(err);
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
};

exports.passwordValidation = async (req, res, next) => {
  const { title, password } = req.body;
  try {
    const meetingRoomList = await Meeting.find({ title }).lean();
    if (!meetingRoomList.length) next(createError(400, '해당하는 회의실이 없습니다.'));

    for (let i = 0; i < meetingRoomList.length; i++) {
      if (password === meetingRoomList[i].password) {
        res.locals.meetingId = meetingRoomList[i]._id;
        return next();
      }
    }
    next(createError(400, '비밀번호가 일치하지 않습니다.'));
  } catch (err) {
    console.log(err);
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
};

exports.getMeetingById = async (req, res, next) => {
  const roomId = res.locals.meetingId;
  try {
    const meetingInfo = await Meeting.findById(roomId).lean();
    res.json({ meetingInfo });
  } catch (err) {
    console.log(err);
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
};

exports.updateMeeting = async (req, res, next) => {
  const meeting_id = req.params.meeting_id;
  const updateInfo = req.body;
  let update = { $set: updateInfo };
  try {
    const meetingInfo = await Meeting.updateMany({ _id: meeting_id }, update);
    res.json({ meetingInfo });
  } catch (err) {
    console.log(err);
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
};
