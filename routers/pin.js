const express = require('express');
const router = express.Router();
require('dotenv').config();
const { auth } = require('../middlewares/auth');
const s3 = require('../S3/s3');

router.post('/pin', s3.upload.single('image'), async (req, res) => {
  console.log(req.file);
});

module.exports = router;
