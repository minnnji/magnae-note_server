const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
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
    next(createError(401, 'Invalid Token'));
  }
};
