const express = require('express');
const router = express.Router();
require('dotenv').config();
const { Pin } = require('../models');

router.post('/', async (req, res) => {
  const { title, desc, imgURL, boardId } = req.body;
  const user = res.locals.user;
  try {
    await Pin.create({ title, desc, imgURL, boardId, user });
    return res.status(200).send();
  } catch (err) {
    res.status(401).send(err);
  }
});

module.exports = router;
