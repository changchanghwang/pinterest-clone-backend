const express = require('express');
const router = express.Router();
const { Comment, Like, Pin } = require('../models');

router.post('/:pin', async (req, res, next) => {
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

router.patch('/:comment', async (req, res, next) => {
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

router.post('/like/:pin', async (req, res, next) => {
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

module.exports = router;
