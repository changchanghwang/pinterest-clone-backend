const express = require('express');
const router = express.Router();
const { Board, Pin } = require('../models');

router.get('/submit', async (req, res, next) => {
  const boards = await Board.findAll({});
  res.status(200).json({ boards });
});

router.get('/my', async (req, res, next) => {
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
});

router.get('/my/board/:board', async (req, res, next) => {
  const { board } = req.params;
  const pins = await Pin.findAll({ where: { board } });
  res.status(200).json({ pins });
});

module.exports = router;
