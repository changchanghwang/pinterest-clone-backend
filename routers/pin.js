const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { title, desc, imgURL, boardId } = req.body;
});

module.exports = router;
