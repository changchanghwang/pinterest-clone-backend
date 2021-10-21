const express = require('express');
const router = express.Router();
const { Comment, Like } = require('../models');
const auth = require('../middlewares/auth');
require('dotenv').config();

router.get('/:pin', auth, async (req, res, next) => {
  const { pin } = req.params; // params에 pin 객체
  try {
    const comments = await Comment.findAll({ where: { pin } }); // comments table의 pin key를 찾는다. [{}]구조
    res.status(200).json({ comments });
  } catch (err) {
    next(err);
  }
});

//댓글 등록하기
router.post('/', auth, async (req, res, next) => {
  const { content, pin } = req.body; // body에 content, pin을 객체로 받아온다
  const user = res.locals.user;
  try {
    await Comment.create({
      content,
      pin,
      user,
    });
    return res.status(200).json({ user });
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

router.post('/like/:comment', auth, async (req, res, next) => {
  const { comment } = req.params;
  const user = res.locals.user;
  try {
    const likeExist = await Like.findOne({ where: { comment, user } });
    if (!likeExist) {
      await Like.create({ comment, user });
      const likeNum = await Like.count({ where: { comment } });
      await Comment.update({ likeNum }, { where: { id: comment } });
      res.sendStatus(200);
    } else {
      await Like.destroy({ where: { comment } });
      const likeNum = await Like.count({ where: { comment } });
      await Comment.update({ likeNum }, { where: { id: comment } });
      res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 댓글 삭제 */
router.delete('/:comment', auth, async (req, res, next) => {
  const { comment } = req.params;
  console.log(comment);
  const user = res.locals.user;
  try {
    await Comment.destroy({ where: { id: comment, user } });
    res.status(200).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
