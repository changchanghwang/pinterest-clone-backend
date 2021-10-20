const express = require('express');
const router = express.Router();
const { Comment, Like, Pin } = require('../models');
const auth = require('../middlewares/auth');
require('dotenv').config();

router.post('/:pin', auth, async (req, res, next) => {
  const { content } = req.body;
  const { pin } = req.params;
  const user = res.locals.user;
  try {
    await Comment.create({
      content,
      pin,
      user,
    });
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/:comment', auth, async (req, res, next) => {
  const { content } = req.body;
  const { comment } = req.params;
  const user = res.locals.user;
  try {
    const commentExist = await Comment.findOne({
      where: { id: comment, user },
    });
    if (!commentExist) {
      return res.sendStatus(400);
    } else {
      await Comment.update({ content }, { where: { id: comment, user } });
      return res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/like/:pin', auth, async (req, res, next) => {
  const { pin } = req.params;
  const user = res.locals.user;
  try {
    const likeExist = await Like.findOne({ where: { pin, user } });
    if (!likeExist) {
      await Like.create({ pin, user });
      const likeNum = await Like.count({ where: { pin } });
      await Pin.update({ likeNum }, { where: { id: pin } });
      res.sendStatus(200);
    } else {
      await Like.destroy({ where: { pin } });
      const likeNum = await Like.count({ where: { pin } });
      await Pin.update({ likeNum }, { where: { id: pin } });
      res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 댓글 삭제 */
router.delete('/:comment', auth, async (req, res) => {
  const { comment } = req.params;
  const user = res.locals.user;
  try {
    await Comment.destroy({ where: { id: comment, content, user } });
    res.status(200).send();
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
