const createError = require('http-errors');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signin = async (req, res, next) => {
  try {
    const { name, id, password } = req.body;
    let user = await User.findOne({ id });
    if (user) return next(createError(400, '이미 가입된 아이디입니다.'));

    user = new User({
      name, id
    });
    user.password = user.hashPassword(password);
    await user.save();

    res.json('ok');
  } catch (err) {
    console.log(err);
    res.status(500).json('일시적인 오류가 발생하였습니다. 다시 시도해주세요.');
  }
}

exports.login = async (req, res, next) => {
  const { id, password } = req.body;

  try {
    const userInfo = await User.findOne({ id });
    if (!userInfo) return next(createError(400, '가입되지 않은 아이디입니다.'));

    const valid = userInfo.comparePassword(password, userInfo.password);
    if (!valid) return next(createError(400, '비밀번호가 일치하지 않습니다.'));

    const payload = { id: userInfo.id, name: userInfo.name, _id: userInfo._id };
    const jwtToken = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ jwtToken, payload });
  } catch (err) {
    console.log(err);
    res.status(500).json('일시적인 오류가 발생하였습니다. 다시 시도해주세요.');
  }
};

exports.getUser = async (req, res, next) => {
  const userId = req.params.user_id;
  try {
    const userById = await User.findById(userId).populate('myMeetings').lean();
    res.json({ userById });
  } catch (err) {
    console.log(err);
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
};

exports.updateUser = async (req, res, next) => {
  const userId = req.params.user_id;
  const { meetingId } = req.body;
  try {
    const userInfo = await User.updateOne(
      { _id: userId },
      { $push: { myMeetings: meetingId } }
    );
    res.json({ userInfo });
  } catch (err) {
    console.log(err);
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
};
