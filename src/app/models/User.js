import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'


class User extends Model {
  static init(sequelize) {
    super.init({
      username: Sequelize.STRING,
      virtualPassword: Sequelize.VIRTUAL,
      password: Sequelize.STRING,
    },
      {
        sequelize,
        hooks: {
          // beforeSave: async (user) => {
          //   if (user.virtualPassword) {
          //     user.password = await bcrypt.hash(user.virtualPassword, 10);
          //   }
          // },
        },
      }
    );
    return this;
  }

  static assiciate(models) {
    this.hasMany(models.Post,
      {
        onDelete: 'CASCADE',
      })

    this.hasMany(models.Comment,
      {
        onDelete: 'CASCADE',
      })
  }

  // async checkPassword(password) {
  //   return bcrypt.compare(password, this.password);
  // }
}

export default User;