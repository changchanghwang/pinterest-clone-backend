const express = require('express');
const router = express.Router();
require('dotenv').config();
const auth = require('../middlewares/auth');
const upload = require('../S3/s3');
const { Pin } = require('../models');

/* 핀 등록하기 */
router.post(
  '/:board',
  auth,
  upload.single('image'), // image upload middleware
  async (req, res, next) => {
    const { board } = req.params; // params에 board 객체
    const { title, desc } = req.body; // body에 title,desc 객체
    const imgURL = req.file.location; // file.location에 저장된 객체imgURL
    const user = res.locals.user; // 로그인 회원 확인
    try {
      // pins table에 칼럼 생성
      await Pin.create({
        title,
        desc,
        imgURL,
        board,
        user,
      });
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
