const express = require('express');
const router = express.Router();
const { signupSchema, loginSchema } = require('./joi');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/signup', async (req, res, next) => {
  const { email, password, age } = signupSchema.validateAsync(req.body);
  const nickname = email.split('@')[0].slice(0, 2);
});

////////////////////////////////////////////////////////////
//                LOGIN
////////////////////////////////////////////////////////////

router.post('/login', async (req, res) => {
  try {
    const { email, password } = await loginSchema.validateAsync(req.body);

    const user = await User.findOne({ where: { email } });
    // 검색한 회원의 이메일이 없는 경우
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: '이메일 또는 패스워드가 잘못됐습니다',
      });
    }
    // 비밀번호가 일치하지 않는 경우
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        success: false,
        msg: '이메일 또는 패스워드가 잘못됐습니다',
      });
    } else {
      // 토큰 생성
      const token = jwt.sign({ email }, process.env.SECRET_KEY);
      res.status(200).json({ token, msg: '로그인 성공' });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: '예상치 못한 에러 발생' });
  }
});

module.exports = router;
