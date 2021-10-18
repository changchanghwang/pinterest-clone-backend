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
        content: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        likeNum: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Comment',
        tableName: 'comments',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    //1대 N의 관계 중 1의 관계
    db.Comment.hasMany(db.Like, {
      foreignKey: 'comment',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
    //1대 N의 관계 중 N의 관계
    db.Comment.belongsTo(db.User, {
      foreignKey: 'user',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    db.Comment.belongsTo(db.Pin, {
      foreignKey: 'pin',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  }
};
