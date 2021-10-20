const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (authorization === undefined) {
    return res.status(401).json({});
  }
  const [bearer, token] = authorization.split(' ');
  try {
    // 로그인된 유저
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const email = decoded.email;
    const user = await User.findOne({
      where: { email },
    });
    res.locals.user = user.id;
    next();
  } catch (err) {
    console.error(err);
  }
};
