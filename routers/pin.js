const express = require('express');
const router = express.Router();
const { Board, Pin } = require('../models');

//핀 등록
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
