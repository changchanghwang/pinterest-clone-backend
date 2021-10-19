const express = require('express');
const router = express.Router();
const Pin = require('../models/pins');

/* 로그인 페이지 불러오기 */
router.get('/login', async (req, res) => {
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
