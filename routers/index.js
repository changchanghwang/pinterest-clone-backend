const express = require('express');
const router = express.Router();

router.use('/', () => {
  console.log('hi hi');
});

module.exports = router;
