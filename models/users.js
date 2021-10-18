const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          type: Sequelize.INTEGER,
        },
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        age: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        googleId: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    //1대 N의 관계 중 1의 관계
    db.User.hasMany(db.Pin, {
      foreignKey: 'user',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
    db.User.hasMany(db.Board, {
      foreignKey: 'user',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
    db.User.hasMany(db.Like, {
      foreignKey: 'user',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
    db.User.hasMany(db.Comment, {
      foreignKey: 'user',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
  }
};
