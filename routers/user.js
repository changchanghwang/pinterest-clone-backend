const express = require('express');
const router = express.Router();
const { signupSchema } = require('./joi');
const { User } = require('../models');

router.post('/signup', async (req, res, next) => {
  const { email, password, age } = signupSchema.validateAsync(req.body);
  const nickname = email.split('@')[0].slice(0, 2);
});

module.exports = router;
