const express = require('express');
const app = express();
const Http = require('http');
const http = Http.createServer(app);
const morgan = require('morgan');
const { sequelize } = require('./models/index');
const cors = require('cors');

//sequelize 초기화
sequelize
  .sync({ force: false })
  .then(() => console.log('데이터베이스 연결 성공!'))
  .catch((err) => console.error(err));

//cors
app.use(
  cors({
    origin:
      'http://pinterest-clone-frontend.s3-website.ap-northeast-2.amazonaws.com',
    credentials: true,
  })
);

//morgan
app.use(morgan('dev'));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router
const router = require('./routers/index');
const { errorHandler } = require('./middlewares/errorHandler');

//rouing
app.use('/', router);

//errorHandler
app.use(errorHandler);

module.exports = http;
