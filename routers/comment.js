const express = require('express');
const router = express.Router();
const { Comment, Like, User } = require('../models');
const auth = require('../middlewares/auth');
require('dotenv').config();

/* 상세페이지 댓글 */
router.get('/:pin', auth, async (req, res, next) => {
  const { pin } = req.params; // params에 pin 객체
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
      where: { pin },
    }); // comments table의 pin 칼럼을 찾는다. [{}]구조
    res.status(200).json({ comments });
  } catch (err) {
    next(err);
  }
});

/* 댓글 등록 */
router.post('/', auth, async (req, res, next) => {
  const { content, pin } = req.body; // body에 content, pin 객체
  const user = res.locals.user; // 로그인 회원 확인
  try {
    // comments table에 content,pin,user 칼럼생성
    await Comment.create({
      content,
      pin,
      user,
    });
    const createdcomment = await Comment.findOne({
      where: { content, pin, user },
    });
    const comment = createdcomment.id;
    return res.status(200).json({ user, comment });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 댓글 수정 */
router.patch('/:comment', auth, async (req, res, next) => {
  const { content } = req.body; // body에 content 객체
  const { comment } = req.params; // params에 comment 객체
  const user = res.locals.user; // 로그인 회원 확인
  try {
    // comments table의 id=comment, user 조건 조회
    const commentExist = await Comment.findOne({
      where: { id: comment, user },
    });
    if (!commentExist) {
      return res.sendStatus(400);
    } else {
      // 조건이 있는 경우 comments table의 where조건에 따라 content를 수정
      await Comment.update({ content }, { where: { id: comment, user } });
      return res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 댓글 좋아요 */
router.post('/like/:comment', auth, async (req, res, next) => {
  const { comment } = req.params; // params에 comment 객체
  const user = res.locals.user; // 로그인 회원 확인
  try {
    // likes table의 comment, user 조건을 조회
    const likeExist = await Like.findOne({ where: { comment, user } });
    // 조건이 없는 경우
    if (!likeExist) {
      await Like.create({ comment, user }); // likes table에 comment,user 생성
    } else {
      // 조건이 있는 경우
      await Like.destroy({ where: { comment } }); // likes table에 comment 삭제
    }
    const likeNum = await Like.count({ where: { comment } }); // comment 갯수 반환
    await Comment.update({ likeNum }, { where: { id: comment } }); // where 조건에 따라 likeNum을 수정
    return res.status(200).json({ likeNum });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 댓글 삭제 */
router.delete('/:comment', auth, async (req, res, next) => {
  const { comment } = req.params; // params에 comment 객체
  const user = res.locals.user;
  try {
    const commentExist = await Comment.findOne({
      where: { id: comment, user },
    });
    if (commentExist) {
      await Comment.destroy({ where: { id: comment, user } });
      res.status(200).send();
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
