const express = require('express');
const app = express();
const Http = require('http');
const http = Http.createServer(app);
const morgan = require('morgan');

//morgan
app.use(morgan('dev'));

//router
const router = require('./routers/index');

//router
app.use('/', router);

//parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

module.exports = http;
