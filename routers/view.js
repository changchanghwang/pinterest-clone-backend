const express = require('express');
const router = express.Router();
const { Board, Pin } = require('../models');

router.get('/submit', async (req, res, next) => {
  const user = res.locals.user;
  try {
    const myBoards = await Board.findAll({ where: user });
    res.status(200).json({ myBoards });
  } catch (err) {
    next(err);
  }
});

router.get('/my', async (req, res, next) => {
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

router.get('/my/board/:board', async (req, res, next) => {
  const { board } = req.params;
  const user = res.locals.user;
  const pins = await Pin.findAll({ where: { board, user } });
  res.status(200).json({ pins });
});

module.exports = router;
