const express = require('express');
const app = express();
const Http = require('http');
const http = Http.createServer(app);
const morgan = require('morgan');
const { sequelize } = require('./models/index');

//sequelize 초기화
sequelize
  .sync({ force: false })
  .then(() => console.log('데이터베이스 연결 성공!'))
  .catch((err) => console.error(err));

//morgan
app.use(morgan('dev'));

//parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//router
const router = require('./routers/index');

//router
app.use('/', router);

module.exports = http;
