const express = require('express');
const router = express.Router();
const { Comment, Like, Pin } = require('../models');

router.post('/:pin', async (req, res, next) => {
  const { content } = req.body;
  const { pin } = req.params;
  try {
    await Comment.create({
      content,
      pin,
      user,
    });
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

router.patch('/:comment', async (req, res, next) => {
  const { content } = req.body;
  const { comment } = req.params;
  try {
    const commentExist = await Comment.findOne({ where: { id: comment } });
    if (!commentExist) {
      return res.sendStatus(400);
    } else {
      await Comment.update({ content }, { where: { id: comment } });
      return res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
  }
});

router.post('/like/:pin', async (req, res, next) => {
  const { pin } = req.params;
  try {
    const likeExist = await Like.findOne({ where: { pin } });
    if (!likeExist) {
      await Like.create({ pin });
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
  }
});

module.exports = router;
