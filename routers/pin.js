const express = require('express');
const router = express.Router();
require('dotenv').config();
const auth = require('../middlewares/auth');
const upload = require('../S3/s3');
const { Pin } = require('../models');

router.post('/pin/:board', auth, upload.single('image'), async (req, res) => {
  console.log(req);
  const { board } = req.params;
  const { title, desc } = req.body;
  const imgURL = req.file.location;
  const user = res.locals.user;
  await Pin.create({
    title,
    desc,
    imgURL,
    board,
    user,
  });
  res.sendStatus(200);
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
