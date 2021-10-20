const express = require('express');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const router = express.Router();
const { Board, Pin, Comment, User } = require('../models');
const auth = require('../middlewares/auth');
require('dotenv').config();

router.get('/submit', auth, async (req, res, next) => {
  const user = res.locals.user;
  try {
    const myBoard = await Board.findOne({ where: { user } });
    res.status(200).json({ myBoard });
  } catch (err) {
    next(err);
  }
});

router.get('/my', auth, async (req, res, next) => {
  const user = res.locals.user;
  try {
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

// 메인페이지
router.get('/main', auth, async (req, res) => {
  try {
    const pins = await Pin.findAll({});
    res.status(200).json({ pins });
  } catch (err) {
    res.status(400).send(err);
  }
});

//상세페이지
router.get('/detail/:pin', auth, async (req, res, next) => {
  const { pin } = req.params;
  try {
    const pinDetail = await Pin.findOne({ where: { id: pin } });
    res.status(200).json({ pinDetail });
  } catch (err) {
    next(err);
  }
});

router.get('/search', auth, async (req, res, next) => {
  const { search } = req.query;
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
