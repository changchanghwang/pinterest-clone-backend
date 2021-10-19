const express = require('express');
const router = express.Router();

const { User } = require('../models');
const { signUpSchema, loginSchema } = require('./joi');
const bcrypt = require('bcrypt');
const saltRound = 10;
const { signupValidation } = require('./controller/signupValidation');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, age } = await signUpSchema.validateAsync(req.body);
    const nickname = email.substr(0, 3);
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const emailExist = await User.findOne({ where: { email } });
    if (signupValidation(email, password) && !emailExist) {
      await User.create({
        email,
        password: hashedPassword,
        age,
        nickname,
      });
      return res.sendStatus(200);
    } else {
      return res.sendStatus(400);
    }
  } catch (err) {
    //joi 벨리데이션, db검색 에러 둘중 하나가 잡힐것으로 예상됨
    next(err);
  }
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
