const createError = require('http-errors');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) user = await new User({ email, name }).save();

    const payload = { email: user.email, name: user.name };
    const jwtToken = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ jwtToken, payload });
  } catch (err) {
    console.log(err);
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
};
