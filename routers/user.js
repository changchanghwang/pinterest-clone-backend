const express = require('express');
const router = express.Router();
const { signUpSchema } = require('./joi');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const saltRound = 10;
const { signupValidation } = require('./controller/signupValidation');

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, age } = await signUpSchema.validateAsync(req.body);
    const nickname = email.substr(0, 3);
    const hashedPassword = await bcrypt.hash(password, saltRound);
    if (!signupValidation(email, password)) {
      return res.sendStatus(400);
    } else {
      await User.create({
        email,
        password: hashedPassword,
        age,
        nickname,
      });
      return res.sendStatus(200);
    }
  } catch (err) {
    //joi 벨리데이션, db검색 에러 둘중 하나가 잡힐것으로 예상됨
    console.error(err);
  }
});

module.exports = router;
