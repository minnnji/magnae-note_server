const createError = require('http-errors');
const Meeting = require('../models/Meeting');

exports.createMeeting = async (req, res, next) => {
  const { title, password, creator } = req.body;

  try {
    const newMeeting = await new Meeting({ title, password, creator }).save();
    const { _id } = newMeeting;
    res.json({ meetingId: _id });
  } catch (err) {
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
};
