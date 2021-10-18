const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const commentRouter = require('./comment');
const pinRouter = require('./pin');
const viewRouter = require('./view');

router.use('/comment', commentRouter);
router.use('/', pinRouter);
router.use('/view', viewRouter);
router.use('/user', userRouter);

module.exports = router;
