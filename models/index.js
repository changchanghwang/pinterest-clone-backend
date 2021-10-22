const Sequelize = require('sequelize');
const User = require('./users');
const Pin = require('./pins');
const Comment = require('./comments');
const Board = require('./boards');
const Like = require('./likes');

const env = process.env.NODE_ENV || 'production';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Pin = Pin;
db.Comment = Comment;
db.Board = Board;
db.Like = Like;

User.init(sequelize);
Pin.init(sequelize);
Comment.init(sequelize);
Board.init(sequelize);
Like.init(sequelize);

User.associate(db);
Pin.associate(db);
Comment.associate(db);
Like.associate(db);
Board.associate(db);

module.exports = db;
