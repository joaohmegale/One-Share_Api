import Sequelize, {Model} from 'sequelize';

class Post extends Model{
  static init(sequelize){
    super.init({
      title: Sequelize.STRING,
      post_text: Sequelize.STRING,
    },
    {
      sequelize
    });
    return this;
  }

  static associate(models){
    this.belongsTo(models.User, {foreignKey : 'user_id', as : 'user'});

    this.hasMany(models.Comment, {
      foreignKey : 'post_id',
      as: 'comments',
      onDelete :'CASCADE',
    })
    
    this.addHook('beforeDestroy', async (post, options) => {
      await models.Comment.destroy({where: {post_id: post.id}});
    });
  
  }

}

export default Post;