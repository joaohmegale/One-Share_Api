import Sequelize, { Model } from 'sequelize';

class Comment extends Model {
  static init(sequelize) {
    super.init({
      comment_body: Sequelize.STRING,
      post_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    },
      {
        sequelize,
      });
    return this;
  }

  static associate(models){
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post'});
  }

}

export default Comment;