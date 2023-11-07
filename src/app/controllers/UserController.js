import User from "../models/User";
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth'

class UserController {

  async store(req, res) {

    const { username, password } = req.body;

    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required().min(6),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' })
    }

    const userExists = await User.findOne({ where: { username: req.body.username } })

    if (userExists) {
      return res.status(400).json({
        type: 'error',
        message: 'Usuario ja existe'
      })
    } else {
      bcrypt.hash(password, 10).then((hash) => {
        User.create({ username: username, password: hash })
      });
      return res.json({
        type: 'success',
        message: 'Usuario criado com sucesso'
      });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } })

    if (!user) {
      return res.json({ error: 'Usuario nao encontrado' })
    }

    bcrypt.compare(password, user.password)
      .then((match) => {
        if (!match) {
          return res.json({ error: 'Senha incorreta' })
        } else {
          const accessToken = jwt.sign({ username: user.username, id: user.id }, authConfig.secret);

          return res.json({
            accessToken,
            user: {
              username: user.username,
              id: user.id,
            }
          })
        }
      })
  }

  //   async update(req, res) {
  //     const { oldPassword } = req.body;

  //     const user = await User.findByPk(req.userId);

  //     if (oldPassword && !(await user.checkPassword(oldPassword))) {
  //       return res.status(401).json({ error: 'Senha incorreta' })
  //     }

  //     const {id, username} = await user.update(req.body)

  //     return res.json({ id, username })
  //   }
}

export default new UserController();