const express = require('express');
const router = express.Router();
require('dotenv').config();
const { Pin } = require('../models');
const { auth } = require('../middlewares/auth');
const s3 = require('../S3/s3');

router.post('/pin', s3.upload.single('image'), async (req, res) => {
  console.log(req.file);
});

// 핀등록
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
