const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === undefined) {
    return res.status(401).json({});
  }
  const [bearer, token] = authorization.split(' ');
  try {
    // 로그인된 유저
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      where: { email: decoded.email },
    });
    res.locals.user = user.id;
    next();
  } catch (err) {
    console.error(err);
  }
};
