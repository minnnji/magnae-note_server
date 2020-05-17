const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  const token = req.header('Authorization').split('Bearer')[1].trim();
  if (!token) {
    return res.status(401).json({
      errorMessage: 'Unauthorized user.'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.email = decoded.email;
    next();
  } catch (err) {
    console.error('authentication error', err);
    next(createError(401, '로그인이 만료되었습니다. 다시 로그인해주시기 바랍니다.'));
  }
};

module.exports = checkAuth;
