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
    console.log(email, password);
    const user = await User.findOne({ where: { email } });
    // 검색한 회원의 이메일이 없는 경우
    if (!user) {
      return res.status(400).json({});
    }
    // 비밀번호가 일치하지 않는 경우
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({});
    } else {
      // 토큰 생성
      const mail = user.email;
      const token = jwt.sign({ email: mail }, process.env.SECRET_KEY);
      const nickname = user.nickname;
      res.status(200).json({ token, nickname });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
