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
router.post('/:board', async (req, res, next) => {
  const { board } = req.params;
  const { title, desc, image } = req.body;
  const user = res.locals.user;
  try {
    await Pin.create({ title, desc, imgURL, boardId, user });
    return res.status(200).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
