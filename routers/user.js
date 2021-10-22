const express = require('express');
const router = express.Router();
const { User, Board } = require('../models');
const { signUpSchema, loginSchema } = require('./joi');
const bcrypt = require('bcrypt');
const saltRound = 10;
const { signupValidation } = require('./controller/signupValidation');
const jwt = require('jsonwebtoken');
require('dotenv').config();

////////////////////////////////////////////////////////////
//                SIGNUP
////////////////////////////////////////////////////////////

router.post('/signup', async (req, res, next) => {
  try {
    // joi schema, validation 체크
    const { email, password, age } = await signUpSchema.validateAsync(req.body);
    const nickname = email.substr(0, 3);
    // password hash암호화
    const hashedPassword = await bcrypt.hash(password, saltRound);
    // users table의 email 조건을 조회
    const emailExist = await User.findOne({ where: { email } });
    // 유효성 검사 통과 && email이 없는 경우
    if (signupValidation(email, password) && !emailExist) {
      // 회원 정보 생성
      await User.create({
        email,
        password: hashedPassword,
        age,
        nickname,
      });
      // 생성된 회원의 email 조회
      const createdUser = await User.findOne({ where: { email } });
      const user = createdUser.id;
      // boards table에 칼럼 생성
      await Board.create({ boardName: '나의 보드', user });
      // 토큰 부여
      const token = jwt.sign({ email }, process.env.SECRET_KEY);
      return res.status(200).json({ token, nickname });
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

router.post('/login', async (req, res, next) => {
  try {
    // body에 email,password validation
    const { email, password } = await loginSchema.validateAsync(req.body);
    // user table의 email 조건 조회
    const user = await User.findOne({ where: { email } });
    // 조회한 회원의 이메일이 없는 경우
    if (!user) {
      return res.status(400).json({});
    }
    // 비밀번호가 일치하지 않는 경우. password 비교함수
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
/* 로그인 체크 */
router.get('/login/:email', async (req, res, next) => {
  const { email } = req.params; // params에 email 객체
  try {
    // usrs table에 email 조건 조회
    const userExist = await User.findOne({ where: { email } });
    // 이메일이 존재하는 경우
    if (userExist) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
