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
    // 로그인 한 회원. User와 Pin관계쿼리 pins의 id, imgURL 칼럼 선택조회
    const myBoard = await User.findOne({
      include: [
        {
          model: Pin,
          attributes: ['id', 'imgURL'],
        },
      ],
      attributes: ['id', 'nickname'],
      where: { id: user },
    });
    res.status(200).json({ myBoard });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 메인페이지 */
router.get('/main', auth, async (req, res, next) => {
  const user = res.locals.user;
  try {
    const pins = await Pin.findAll({
      order: [['id', 'DESC']],
    });
    const board = await Board.findOne({ where: { user } });
    const boardId = board.id;
    res.status(200).json({ pins, boardId });
  } catch (err) {
    next(err);
  }
});

/* 상세페이지 */
router.get('/detail/:pin', auth, async (req, res, next) => {
  const { pin } = req.params;
  try {
    const pinDetail = await Pin.findOne({
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
        {
          model: Board,
          attributes: ['boardName'],
        },
      ],
      where: { id: pin },
    });
    res.status(200).json({ pinDetail });
  } catch (err) {
    next(err);
  }
});

/* 검색페이지 */
router.get('/search/:word', auth, async (req, res, next) => {
  const { word } = req.params;
  try {
    if (word === null) {
      const pins = await Pin.findAll({});
      return res.status(200).json({ pins });
    } else {
      const pins = await Pin.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${word}%`,
              },
            },
            {
              desc: {
                [Op.like]: `%${word}%`,
              },
            },
          ],
        },
      });
      res.status(200).json({ pins });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
