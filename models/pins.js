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
        imgURL: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        desc: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        webSite: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Pin',
        tableName: 'pins',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    //1대 N의 관계 중 1의 관계
    db.Pin.hasMany(db.Comment, {
      foreignKey: 'pin',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
    //1대 N의 관계 중 N의 관계
    db.Pin.belongsTo(db.Board, {
      foreignKey: 'board',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    db.Pin.belongsTo(db.User, {
      foreignKey: 'user',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  }
};
