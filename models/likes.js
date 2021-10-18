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
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Like',
        tableName: 'likes',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    //1대 N의 관계 중 N의 관계
    db.Like.belongsTo(db.User, {
      foreignKey: 'user',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    db.Like.belongsTo(db.Comment, {
      foreignKey: 'comment',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  }
};
