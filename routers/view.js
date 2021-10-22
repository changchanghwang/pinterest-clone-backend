const express = require('express');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const router = express.Router();
const { Board, Pin, Comment, User } = require('../models');
const auth = require('../middlewares/auth');
require('dotenv').config();

/* 등록페이지 */
router.get('/submit', auth, async (req, res, next) => {
  const user = res.locals.user;
  try {
    // board table의 user 조회
    const myBoard = await Board.findOne({ where: { user } });
    res.status(200).json({ myBoard });
  } catch (err) {
    next(err);
  }
});

/* 마이페이지 */
router.get('/my', auth, async (req, res, next) => {
  const user = res.locals.user;
  try {
    // 로그인 한 회원. Board와 Pin관계쿼리 pins의 id, imgURL 칼럼 선택조회
    const myBoard = await Board.findOne({
      include: [
        {
          model: Pin,
          attributes: ['id', 'imgURL'],
        },
      ],
      where: { user },
    });
    res.status(200).json({ myBoard });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 로그인 페이지 불러오기 */
router.get('/login', auth, async (req, res) => {
  const { imgURL } = req.body;
});

/* 메인페이지 */
router.get('/main', auth, async (req, res) => {
  try {
    // pins table의 모든 값
    const pins = await Pin.findAll({});
    res.status(200).json({ pins });
  } catch (err) {
    next(err);
  }
});

/* 상세페이지 */
router.get('/detail/:pin', auth, async (req, res, next) => {
  const { pin } = req.params;
  try {
    // pins tabledml id=pin 조회
    const pinDetail = await Pin.findOne({ where: { id: pin } });
    res.status(200).json({ pinDetail });
  } catch (err) {
    next(err);
  }
});

/* 검색페이지 */
router.get('/search', auth, async (req, res, next) => {
  const { search } = req.query; // query에 search 객체
  const pins = await Pin.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          desc: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
  });
  res.status(200).json({ pins });
});

module.exports = router;
