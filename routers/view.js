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
    const myBoard = await User.findOne({
      include: [
        {
          model: Pin,
          attributes: ['id', 'imgURL'],
        },
      ],
      attributes: ['id'],
      where: { id: user },
    });
    console.log(myBoard);
    res.status(200).json({ myBoard });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 메인페이지
router.get('/main', auth, async (req, res) => {
  const user = res.locals.user;
  try {
    const pins = await Pin.findAll({});
    const board = await Board.findOne({ where: { user } });
    const boardId = board.id;
    console.log(boardId);
    console.log(pins.length);
    res.status(200).json({ pins, boardId });
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
