const express = require('express');
const router = express.Router();
const { Board, Pin } = require('../models');
const auth = require('../middlewares/auth');
require('dotenv').config();

router.get('/submit', auth, async (req, res, next) => {
  const user = res.locals.user;
  try {
    const myBoards = await Board.findAll({ where: { user } });
    res.status(200).json({ myBoards });
  } catch (err) {
    next(err);
  }
});

router.get('/my', auth, async (req, res, next) => {
  const user = res.locals.user;
  try {
    const myBoards = await Board.findAll({
      include: [
        {
          model: Pin,
          attributes: ['imgURL'],
        },
      ],
      where: { user },
    });
    res.status(200).json({ myBoards });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/my/board/:board', auth, async (req, res, next) => {
  const { board } = req.params;
  const user = res.locals.user;
  const pins = await Pin.findAll({ where: { board, user } });
  res.status(200).json({ pins });
});

/* 로그인 페이지 불러오기 */
router.get('/login', auth, async (req, res) => {
  const { imgURL } = req.body;
  try {
    const img = await Pin.findAll({ where: { imgURL } });
    console.log(img.imgURL);

    res.status(200).json({ imgs, msg: 'ok' });
  } catch (error) {
    res.status(401).json({ msg: 'err' });
  }
});

module.exports = router;
